/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as msRest from "@azure/ms-rest-js";
import * as Models from "../models";
import * as Mappers from "../models/deletedWebAppsMappers";
import * as Parameters from "../models/parameters";
import { WebSiteManagementClientContext } from "../webSiteManagementClientContext";

/** Class representing a DeletedWebApps. */
export class DeletedWebApps {
  private readonly client: WebSiteManagementClientContext;

  /**
   * Create a DeletedWebApps.
   * @param {WebSiteManagementClientContext} client Reference to the service client.
   */
  constructor(client: WebSiteManagementClientContext) {
    this.client = client;
  }

  /**
   * Description for Get all deleted apps for a subscription.
   * @summary Get all deleted apps for a subscription.
   * @param [options] The optional parameters
   * @returns Promise<Models.DeletedWebAppsListResponse>
   */
  list(options?: msRest.RequestOptionsBase): Promise<Models.DeletedWebAppsListResponse>;
  /**
   * @param callback The callback
   */
  list(callback: msRest.ServiceCallback<Models.DeletedWebAppCollection>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  list(options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.DeletedWebAppCollection>): void;
  list(options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.DeletedWebAppCollection>, callback?: msRest.ServiceCallback<Models.DeletedWebAppCollection>): Promise<Models.DeletedWebAppsListResponse> {
    return this.client.sendOperationRequest(
      {
        options
      },
      listOperationSpec,
      callback) as Promise<Models.DeletedWebAppsListResponse>;
  }

  /**
   * Description for Get all deleted apps for a subscription at location
   * @summary Get all deleted apps for a subscription at location
   * @param location
   * @param [options] The optional parameters
   * @returns Promise<Models.DeletedWebAppsListByLocationResponse>
   */
  listByLocation(location: string, options?: msRest.RequestOptionsBase): Promise<Models.DeletedWebAppsListByLocationResponse>;
  /**
   * @param location
   * @param callback The callback
   */
  listByLocation(location: string, callback: msRest.ServiceCallback<Models.DeletedWebAppCollection>): void;
  /**
   * @param location
   * @param options The optional parameters
   * @param callback The callback
   */
  listByLocation(location: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.DeletedWebAppCollection>): void;
  listByLocation(location: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.DeletedWebAppCollection>, callback?: msRest.ServiceCallback<Models.DeletedWebAppCollection>): Promise<Models.DeletedWebAppsListByLocationResponse> {
    return this.client.sendOperationRequest(
      {
        location,
        options
      },
      listByLocationOperationSpec,
      callback) as Promise<Models.DeletedWebAppsListByLocationResponse>;
  }

  /**
   * Description for Get deleted app for a subscription at location.
   * @summary Get deleted app for a subscription at location.
   * @param location
   * @param deletedSiteId The numeric ID of the deleted app, e.g. 12345
   * @param [options] The optional parameters
   * @returns Promise<Models.DeletedWebAppsGetDeletedWebAppByLocationResponse>
   */
  getDeletedWebAppByLocation(location: string, deletedSiteId: string, options?: msRest.RequestOptionsBase): Promise<Models.DeletedWebAppsGetDeletedWebAppByLocationResponse>;
  /**
   * @param location
   * @param deletedSiteId The numeric ID of the deleted app, e.g. 12345
   * @param callback The callback
   */
  getDeletedWebAppByLocation(location: string, deletedSiteId: string, callback: msRest.ServiceCallback<Models.DeletedSite>): void;
  /**
   * @param location
   * @param deletedSiteId The numeric ID of the deleted app, e.g. 12345
   * @param options The optional parameters
   * @param callback The callback
   */
  getDeletedWebAppByLocation(location: string, deletedSiteId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.DeletedSite>): void;
  getDeletedWebAppByLocation(location: string, deletedSiteId: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.DeletedSite>, callback?: msRest.ServiceCallback<Models.DeletedSite>): Promise<Models.DeletedWebAppsGetDeletedWebAppByLocationResponse> {
    return this.client.sendOperationRequest(
      {
        location,
        deletedSiteId,
        options
      },
      getDeletedWebAppByLocationOperationSpec,
      callback) as Promise<Models.DeletedWebAppsGetDeletedWebAppByLocationResponse>;
  }

  /**
   * Description for Get all deleted apps for a subscription.
   * @summary Get all deleted apps for a subscription.
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param [options] The optional parameters
   * @returns Promise<Models.DeletedWebAppsListNextResponse>
   */
  listNext(nextPageLink: string, options?: msRest.RequestOptionsBase): Promise<Models.DeletedWebAppsListNextResponse>;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param callback The callback
   */
  listNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.DeletedWebAppCollection>): void;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param options The optional parameters
   * @param callback The callback
   */
  listNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.DeletedWebAppCollection>): void;
  listNext(nextPageLink: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.DeletedWebAppCollection>, callback?: msRest.ServiceCallback<Models.DeletedWebAppCollection>): Promise<Models.DeletedWebAppsListNextResponse> {
    return this.client.sendOperationRequest(
      {
        nextPageLink,
        options
      },
      listNextOperationSpec,
      callback) as Promise<Models.DeletedWebAppsListNextResponse>;
  }

  /**
   * Description for Get all deleted apps for a subscription at location
   * @summary Get all deleted apps for a subscription at location
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param [options] The optional parameters
   * @returns Promise<Models.DeletedWebAppsListByLocationNextResponse>
   */
  listByLocationNext(nextPageLink: string, options?: msRest.RequestOptionsBase): Promise<Models.DeletedWebAppsListByLocationNextResponse>;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param callback The callback
   */
  listByLocationNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.DeletedWebAppCollection>): void;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param options The optional parameters
   * @param callback The callback
   */
  listByLocationNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.DeletedWebAppCollection>): void;
  listByLocationNext(nextPageLink: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.DeletedWebAppCollection>, callback?: msRest.ServiceCallback<Models.DeletedWebAppCollection>): Promise<Models.DeletedWebAppsListByLocationNextResponse> {
    return this.client.sendOperationRequest(
      {
        nextPageLink,
        options
      },
      listByLocationNextOperationSpec,
      callback) as Promise<Models.DeletedWebAppsListByLocationNextResponse>;
  }
}

// Operation Specifications
const serializer = new msRest.Serializer(Mappers);
const listOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "subscriptions/{subscriptionId}/providers/Microsoft.Web/deletedSites",
  urlParameters: [
    Parameters.subscriptionId
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.DeletedWebAppCollection
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  serializer
};

const listByLocationOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "subscriptions/{subscriptionId}/providers/Microsoft.Web/locations/{location}/deletedSites",
  urlParameters: [
    Parameters.location,
    Parameters.subscriptionId
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.DeletedWebAppCollection
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  serializer
};

const getDeletedWebAppByLocationOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "subscriptions/{subscriptionId}/providers/Microsoft.Web/locations/{location}/deletedSites/{deletedSiteId}",
  urlParameters: [
    Parameters.location,
    Parameters.deletedSiteId,
    Parameters.subscriptionId
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.DeletedSite
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  serializer
};

const listNextOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  baseUrl: "https://management.azure.com",
  path: "{nextLink}",
  urlParameters: [
    Parameters.nextPageLink
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.DeletedWebAppCollection
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  serializer
};

const listByLocationNextOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  baseUrl: "https://management.azure.com",
  path: "{nextLink}",
  urlParameters: [
    Parameters.nextPageLink
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.DeletedWebAppCollection
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  serializer
};
