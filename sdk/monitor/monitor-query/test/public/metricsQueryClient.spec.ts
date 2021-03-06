// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";
import { Durations, MetricsQueryClient } from "../../src";

import { createTestClientSecretCredential, getMetricsArmResourceId } from "./shared/testShared";

describe("MetricsClient live tests", function() {
  let metricsArmResourceId: string;
  let metricsQueryClient: MetricsQueryClient;

  beforeEach(function(this: Context) {
    metricsArmResourceId = getMetricsArmResourceId(this);
    metricsQueryClient = new MetricsQueryClient(createTestClientSecretCredential());
  });

  it("queryMetrics", async () => {
    const metricDefinitions = await metricsQueryClient.getMetricDefinitions(metricsArmResourceId);
    assert.isNotEmpty(metricDefinitions.definitions);

    for (const definition of metricDefinitions.definitions) {
      const result = await metricsQueryClient.queryMetrics(
        metricsArmResourceId,
        Durations.last24Hours,
        {
          metricNames: [definition.name || ""]
        }
      );

      assert.ok(result);
      assert.ok(result.interval);
      assert.isNotEmpty(result.metrics);
    }

    const newResults = await metricsQueryClient.queryMetrics(
      metricsArmResourceId,
      Durations.last24Hours,
      {
        metricNames: metricDefinitions.definitions.map((def) => def.name || "")
      }
    );

    assert.ok(newResults);
    assert.isNotEmpty(newResults.metrics);

    // {
    //   "id": "/subscriptions/faa080af-c1d8-40ad-9cce-e1a450ca5b57/resourceGroups/ripark/providers/Microsoft.ServiceBus/namespaces/riparkdev2/providers/Microsoft.Insights/metrics/SuccessfulRequests",
    //   "type": "Microsoft.Insights/metrics",
    //   "name": {
    //     "value": "SuccessfulRequests",
    //     "localizedValue": "Successful Requests"
    //   },
    //   "unit": "Count",
    //   "timeseries": [
    //     {
    //       "metadatavalues": [],
    //       "data": [
    //         {
    //           "timeStamp": "2021-05-03T18:06:00.000Z",
    //           "total": 180
    //         },
    //         {
    //           "timeStamp": "2021-05-03T19:05:00.000Z",
    //           "total": 193
    //         }
    //       ]
    //     }
    //   ],
    // }
    // "displayDescription": "Total successful requests for a namespace",
    // "errorCode": "Success"
  });

  it("listNamespaces", async () => {
    const result = await metricsQueryClient.getMetricNamespaces(metricsArmResourceId);
    assert.ok(result);
  });
  it("listDefinitions", async () => {
    const result = await metricsQueryClient.getMetricDefinitions(metricsArmResourceId);
    assert.ok(result);
  });
});
