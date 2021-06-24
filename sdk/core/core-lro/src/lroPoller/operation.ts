// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import { PollOperation, PollOperationState } from "../";
import { PollerConfig, ResumablePollOperationState, LRO, LROStatus } from "./models";
import { getPollingURL } from "./requestUtils";
import { createInitializeState, createPollForLROStatus } from "./stateMachine";

export class GenericPollOperation<TResult, TState extends PollOperationState<TResult>>
  implements PollOperation<TState, TResult> {
  private GetLROStatusFromResponse?: (
    pollingURL: string,
    pollerConfig: PollerConfig
  ) => Promise<LROStatus<TResult>>;
  private pollerConfig?: PollerConfig;
  constructor(
    public state: TState & ResumablePollOperationState<TResult>,
    private lro: LRO<TResult>
  ) {}

  public setPollerConfig(pollerConfig: PollerConfig): void {
    this.pollerConfig = pollerConfig;
  }

  /**
   * General update function for LROPoller, the general process is as follows
   * 1. Check initial operation result to determine the strategy to use
   *  - Strategies: Location, Azure-AsyncOperation, Original Uri
   * 2. Check if the operation result has a terminal state
   *  - Terminal state will be determined by each strategy
   *  2.1 If it is terminal state Check if a final GET request is required, if so
   *      send final GET request and return result from operation. If no final GET
   *      is required, just return the result from operation.
   *      - Determining what to call for final request is responsibility of each strategy
   *  2.2 If it is not terminal state, call the polling operation and go to step 1
   *      - Determining what to call for polling is responsibility of each strategy
   *      - Strategies will always use the latest URI for polling if provided otherwise
   *        the last known one
   */
  async update(options?: {
    abortSignal?: AbortSignalLike | undefined;
    fireProgress?: ((state: TState) => void) | undefined;
  }): Promise<PollOperation<TState, TResult>> {
    const state = this.state;
    if (!state.isStarted) {
      const initializeState = createInitializeState(
        state,
        this.lro.requestPath,
        this.lro.requestMethod
      );
      await this.lro.sendInitialRequest(initializeState);
    }

    if (!state.isCompleted) {
      if (this.GetLROStatusFromResponse === undefined) {
        if (state.config === undefined) {
          throw new Error("Bad state: LRO mode is undefined");
        }
        this.GetLROStatusFromResponse = createPollForLROStatus(this.lro, state.config);
      }
      if (state.pollingURL === undefined) {
        throw new Error("Bad state: polling URL is undefined");
      }
      const currentState = await this.GetLROStatusFromResponse(
        state.pollingURL,
        this.pollerConfig!
      );
      if (currentState.done) {
        state.result = currentState.flatResponse;
        state.isCompleted = true;
      } else {
        this.GetLROStatusFromResponse = currentState.next ?? this.GetLROStatusFromResponse;
        state.pollingURL = getPollingURL(currentState.rawResponse, state.pollingURL);
      }
    }
    if (options?.fireProgress !== undefined) {
      options.fireProgress(state);
    }
    return this;
  }

  async cancel(): Promise<PollOperation<TState, TResult>> {
    this.state.isCancelled = true;
    return this;
  }

  /**
   * Serializes the Poller operation.
   */
  public toString(): string {
    return JSON.stringify({
      state: this.state
    });
  }
}
