import { LongRunningOperation } from "@azure/core-lro";
import { SpanStatusCode } from "@azure/core-tracing";
import { createSerializer, FullOperationResponse, OperationOptions, OperationSpec } from "@azure/core-client";
import { PagedAnalyzeHealthcareEntitiesResult } from "./analyzeHealthcareEntitiesResult";
import { GeneratedClient, TextDocumentInput } from "./generated";
import { createSpan } from "./tracing";
import { addStrEncodingParam, handleInvalidDocumentBatch, StringIndexType } from "./util";
import * as Mappers from "./generated/models/mappers";
import {
  accept,
  apiVersion,
  endpoint,
  includeStatistics,
  skip,
  top
} from "./generated/models/parameters";

/**
 * @internal
 */
interface BeginAnalyzeHealthcareInitialOptions {
  /**
   * This value indicates which model will be used for scoring. If a model-version is
   * not specified, the API should default to the latest, non-preview version.
   * For supported model versions, see operation-specific documentation, for example:
   * https://docs.microsoft.com/azure/cognitive-services/text-analytics/how-tos/text-analytics-how-to-sentiment-analysis#model-versioning
   */
  modelVersion?: string;
  /**
   * Specifies the measurement unit used to calculate the offset and length properties.
   * Possible units are "TextElements_v8", "UnicodeCodePoint", and "Utf16CodeUnit".
   * The default is the JavaScript's default which is "Utf16CodeUnit".
   */
  stringIndexType?: StringIndexType;
  /**
   * If set to false, you opt-in to have your text input logged for troubleshooting. By default, Text Analytics
   * will not log your input text for healthcare entities analysis. Setting this parameter to false,
   * enables input logging.
   */
  loggingOptOut?: boolean;
}

interface BeginAnalyzeHealthcarePollOptions {
  /** (Optional) if set to true, response will contain request and document level statistics. */
  includeStatistics?: boolean;
  /** (Optional) Set the maximum number of results per task. When both $top and $skip are specified, $skip is applied first. */
  top?: number;
  /** (Optional) Set the number of elements to offset in the response. When both $top and $skip are specified, $skip is applied first. */
  skip?: number;
}

const serializer = createSerializer(Mappers, /* isXml */ false);

const healthStatusOperationSpec: OperationSpec = {
  path: "/entities/health/jobs/{jobId}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.HealthcareJobState
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [includeStatistics, top, skip],
  urlParameters: [endpoint, apiVersion],
  headerParameters: [accept],
  serializer
};

export class HealthLro implements LongRunningOperation<PagedAnalyzeHealthcareEntitiesResult> {
  public requestMethod = "POST";
  public requestPath = "/entities/health/jobs";
  constructor(
    private client: GeneratedClient,
    private baseOptions: OperationOptions,
    private initOptions: BeginAnalyzeHealthcareInitialOptions,
    private pollOptions: BeginAnalyzeHealthcarePollOptions,
    private documents: TextDocumentInput[]
  ) {}
  async sendInitialRequest() {
    const { span, updatedOptions: finalOptions } = createSpan(
      "TextAnalyticsClient-beginAnalyzeHealthcare",
      {
        ...this.baseOptions,
        ...addStrEncodingParam(this.initOptions)
      }
    );
    try {
      let rawResponse: FullOperationResponse | undefined = undefined;
      const flatResponse = await this.client.health(
        { documents: this.documents },
        {
          ...finalOptions,
          onResponse: (response) => {
            rawResponse = response;
          }
        }
      );
      return {
        flatResponse: flatResponse as any,
        rawResponse: {
          statusCode: rawResponse!.status,
          headers: rawResponse!.headers.toJSON(),
          body: rawResponse!.parsedBody
        }
      };
    } catch (e) {
      const exception = handleInvalidDocumentBatch(e);
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: exception.message
      });
      throw exception;
    } finally {
      span.end();
    }
  }
  async sendPollRequest(path: string) {
    const { span, updatedOptions: finalOptions } = createSpan(
      "TextAnalyticsClient-getHealthStatus",
      { ...this.baseOptions, ...this.pollOptions }
    );
    try {
      let rawResponse: FullOperationResponse | undefined = undefined;
      const flatResponse = await this.client.sendOperationRequest(
        {
          options: {
            ...finalOptions,
            onResponse: (response) => {
              rawResponse = response;
            }
          }
        },
        {
          ...healthStatusOperationSpec,
          path,
          httpMethod: "GET"
        }
      );
      return {
        flatResponse: flatResponse as any,
        rawResponse: {
          statusCode: rawResponse!.status,
          headers: rawResponse!.headers.toJSON(),
          body: rawResponse!.parsedBody
        }
      };
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }
}
