/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as msRest from "@azure/ms-rest-js";
import * as msRestAzure from "@azure/ms-rest-azure-js";
import * as Models from "./models";
import * as Mappers from "./models/mappers";
import * as operations from "./operations";
import { BatchServiceClientContext } from "./batchServiceClientContext";

class BatchServiceClient extends BatchServiceClientContext {
  // Operation groups
  application: operations.Application;
  pool: operations.Pool;
  account: operations.Account;
  job: operations.Job;
  certificate: operations.CertificateOperations;
  file: operations.File;
  jobSchedule: operations.JobSchedule;
  task: operations.Task;
  computeNode: operations.ComputeNodeOperations;

  /**
   * Initializes a new instance of the BatchServiceClient class.
   * @param credentials Credentials needed for the client to connect to Azure.
   * @param batchUrl The base URL for all Azure Batch service requests.
   * @param [options] The parameter options
   */
  constructor(
    credentials: msRest.ServiceClientCredentials,
    batchUrl: string,
    options?: msRestAzure.AzureServiceClientOptions
  ) {
    super(credentials, batchUrl, options);
    this.application = new operations.Application(this);
    this.pool = new operations.Pool(this);
    this.account = new operations.Account(this);
    this.job = new operations.Job(this);
    this.certificate = new operations.CertificateOperations(this);
    this.file = new operations.File(this);
    this.jobSchedule = new operations.JobSchedule(this);
    this.task = new operations.Task(this);
    this.computeNode = new operations.ComputeNodeOperations(this);
  }
}

// Operation Specifications

export {
  BatchServiceClient,
  BatchServiceClientContext,
  Models as BatchServiceModels,
  Mappers as BatchServiceMappers
};
export * from "./operations";
