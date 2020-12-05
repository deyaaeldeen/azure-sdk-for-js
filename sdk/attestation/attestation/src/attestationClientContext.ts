/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";
import { AttestationClientOptionalParams } from "./models";

const packageName = "@azure/attestation";
const packageVersion = "1.0.0-beta.1";

export class AttestationClientContext extends coreHttp.ServiceClient {
  instanceUrl: string;
  apiVersion: string;

  /**
   * Initializes a new instance of the AttestationClientContext class.
   * @param instanceUrl The attestation instance base URI, for example https://mytenant.attest.azure.net.
   * @param options The parameter options
   */
  constructor(instanceUrl: string, options?: AttestationClientOptionalParams) {
    if (instanceUrl === undefined) {
      throw new Error("'instanceUrl' cannot be null");
    }

    // Initializing default values for options
    if (!options) {
      options = {};
    }

    if (!options.userAgent) {
      const defaultUserAgent = coreHttp.getDefaultUserAgentValue();
      options.userAgent = `${packageName}/${packageVersion} ${defaultUserAgent}`;
    }

    super(undefined, options);

    this.requestContentType = "application/json; charset=utf-8";

    this.baseUri = options.endpoint || "{instanceUrl}";

    // Parameter assignments
    this.instanceUrl = instanceUrl;

    // Assigning values to Constant parameters
    this.apiVersion = options.apiVersion || "2020-10-01";
  }
}
