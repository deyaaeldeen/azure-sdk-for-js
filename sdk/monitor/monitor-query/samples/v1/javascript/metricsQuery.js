// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Demonstrates how to query metrics using the MetricsClient.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { Durations, MetricsQueryClient } = require("@azure/monitor-query");
const dotenv = require("dotenv");

dotenv.config();

const monitorWorkspaceId = process.env.METRICS_RESOURCE_ID_TO_QUERY;

async function main() {
  const tokenCredential = new DefaultAzureCredential();
  const metricsQueryClient = new MetricsQueryClient(tokenCredential);

  if (!monitorWorkspaceId) {
    throw new Error("METRICS_RESOURCE_ID_TO_QUERY must be set in the environment for this sample");
  }

  const metricsResponse = await metricsQueryClient.queryMetrics(
    monitorWorkspaceId,
    Durations.lastDay,
    {
      metricNames: ["SuccessfulRequests"],
      interval: "P1D"
    }
  );

  console.log(
    `Query cost: ${metricsResponse.cost}, interval: ${metricsResponse.interval}, time span: ${metricsResponse.timespan}`
  );

  const metrics = metricsResponse.metrics;
  console.log(`Metrics:`, JSON.stringify(metrics, undefined, 2));
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
  process.exit(1);
});
