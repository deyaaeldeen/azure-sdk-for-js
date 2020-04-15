import {
  BatchServiceClient,
  BatchSharedKeyCredentials,
  BatchServiceModels
} from "../src/batchIndex";
import { describe, beforeEach } from "mocha";
import { assert } from "chai";
import { v4 as uuid } from "uuid";
import * as dotenv from "dotenv";
import { duration } from "moment";
import { AuthenticationContext, TokenResponse } from "adal-node";
import { TokenCredentials } from "@azure/ms-rest-js";

dotenv.config();
const wait = (timeout = 1000) => new Promise((resolve) => setTimeout(() => resolve(), timeout));

describe("Batch Service", () => {
  let client: BatchServiceClient;
  let batchAccountName: string;
  let batchAccountKey: string;
  let batchEndpoint: string;
  let clientId: string;
  let secret: string;
  let domain: string;
  let certThumb: string;
  let nonAdminPoolUser: string;
  let compute_nodes: string[];

  const readStreamToBuffer = function(
    strm: NodeJS.ReadableStream,
    callback: (_a: any, buf: Buffer) => void
  ) {
    const bufs = [];
    strm.on("data", function(d) {
      bufs.push(d);
    });
    strm.on("end", function() {
      callback(null, Buffer.concat(bufs));
    });
  };

  beforeEach(() => {
    batchAccountName = process.env["AZURE_BATCH_ACCOUNT_NAME"] || "";
    batchAccountKey = process.env["AZURE_BATCH_ACCOUNT_KEY"] || "";
    batchEndpoint = process.env["AZURE_BATCH_ENDPOINT"] || "";
    clientId = process.env["CLIENT_ID"];
    secret =
      process.env["APPLICATION_SECRET"] ||
      "HA/CsxpkaqET9B6O4pRI6kMirlP00GoQZwVpsEZVDPJXgrRiZOJIeOsltXJGlDvBoSm5ZdNpL1FfFbOGA1zb7A==";
    domain = "microsoft.onmicrosoft.com";
    certThumb = "cff2ab63c8c955aaf71989efa641b906558d9fb7";
    nonAdminPoolUser = "nonAdminUser";
    const creds = new BatchSharedKeyCredentials(batchAccountName, batchAccountKey);

    client = new BatchServiceClient(creds, batchEndpoint);
  });

  describe("operations", () => {
    it("should list supported images successfully", async () => {
      const result = await client.account.listSupportedImages();
      assert.isAtLeast(result.length, 1);
      const supportedImage = result[0];
      assert.equal(supportedImage.nodeAgentSKUId, "batch.node.centos 7");
      assert.equal(supportedImage.osType, "linux");
      assert.equal(result._response.status, 200);
    });

    it("should perform AAD authentication successfully", (done) => {
      const verifyAadAuth = function(token, callback) {
        const tokenCreds = new TokenCredentials(token, "Bearer");
        const aadClient = new BatchServiceClient(tokenCreds, process.env["AZURE_BATCH_ENDPOINT"]);
        aadClient.account.listSupportedImages(function(err, result, request, response) {
          assert.isUndefined(err);
          assert.isDefined(result);
          assert.isAtLeast(result.length, 1);
          assert.equal(response.status, 200);
          assert.isDefined(request.headers.get("authorization"));
          assert.equal(request.headers.get("authorization"), "Bearer " + token);
          callback();
        });
      };

      // if (!suite.isPlayback) {
      var authContext = new AuthenticationContext(
        "https://login.microsoftonline.com/microsoft.onmicrosoft.com"
      );

      authContext.acquireTokenWithClientCredentials(
        "https://batch.core.windows.net/",
        process.env["CLIENT_ID"],
        process.env["APPLICATION_SECRET"],
        function(err, tokenResponse) {
          assert.isUndefined(err);
          assert.isDefined(tokenResponse);
          assert.isDefined((tokenResponse as TokenResponse).accessToken);
          verifyAadAuth((tokenResponse as TokenResponse).accessToken, done);
        }
      );
      // } else {
      //   verifyAadAuth("dummy token", done);
      // }
    });

    // Disabled since the same cert can only be created once.
    // Should reenable when recording is setup
    it("should add new certificate successfully", async () => {
      const cert: BatchServiceModels.CertificateAddParameter = {
        thumbprint: certThumb,
        thumbprintAlgorithm: "sha1",
        password: "nodesdk",
        certificateFormat: "pfx",
        data:
          "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"
      };

      const result = await client.certificate.add(cert);
      assert.equal(result._response.status, 201);
    });

    it("should list certificates successfully", async () => {
      const result = await client.certificate.list();
      assert.isAtLeast(result.length, 1);
      assert.equal(result[0].thumbprint, certThumb);
      assert.equal(result[0].thumbprintAlgorithm, "sha1");
      assert.equal(result._response.status, 200);
    });

    it("should get certificate reference successfully", async () => {
      const result = await client.certificate.get("sha1", certThumb);
      assert.equal(result.thumbprint, certThumb);
      assert.equal(result.thumbprintAlgorithm, "sha1");
      assert.equal(result._response.status, 200);
    });

    it("should create a new pool successfully", async () => {
      const pool: BatchServiceModels.PoolAddParameter = {
        id: "nodesdktestpool1",
        vmSize: "small",
        cloudServiceConfiguration: { osFamily: "4" },
        targetDedicatedNodes: 3,
        certificateReferences: [{ thumbprint: certThumb, thumbprintAlgorithm: "sha1" }],
        // Ensures there's a compute node file we can reference later
        startTask: { commandLine: "cmd /c echo hello > hello.txt" },
        // Sets up pool user we can reference later
        userAccounts: [
          {
            name: nonAdminPoolUser,
            password: uuid(),
            elevationLevel: "nonadmin"
          }
        ]
      };

      const result = await client.pool.add(pool);
      assert.equal(result._response.status, 201);

      await wait();
    });

    it("should update pool parameters successfully", async () => {
      const options: BatchServiceModels.PoolUpdatePropertiesParameter = {
        metadata: [{ name: "foo", value: "bar" }],
        certificateReferences: [],
        applicationPackageReferences: [],
        // Ensures the start task isn't cleared
        startTask: { commandLine: "cmd /c echo hello > hello.txt" }
      };

      const result = await client.pool.updateProperties("nodesdktestpool1", options);
      assert.equal(result._response.status, 204);
    });

    it("should patch pool parameters successfully", async () => {
      const options: BatchServiceModels.PoolPatchParameter = {
        metadata: [
          {
            name: "foo2",
            value: "bar2"
          }
        ]
      };

      const result = await client.pool.patch("nodesdktestpool1", options);
      assert.equal(result._response.status, 200);
      await wait();
    });

    it("should get a pool reference successfully", async () => {
      const result = await client.pool.get("nodesdktestpool1");
      const metadata = result.metadata![0];

      assert.equal(result.id, "nodesdktestpool1");
      assert.equal(result.state, "active");
      assert.equal(result.allocationState, "steady");
      assert.isDefined(result.cloudServiceConfiguration);
      assert.equal(result.cloudServiceConfiguration!.osFamily, "4");
      assert.equal(result.vmSize, "small");

      assert.equal(metadata.name, "foo2");
      assert.equal(metadata.value, "bar2");

      assert.isDefined(result.startTask);
      assert.equal(result.startTask!.commandLine, "cmd /c echo hello > hello.txt");

      assert.lengthOf(result.userAccounts, 1);
      assert.equal(result.userAccounts![0].name, nonAdminPoolUser);
      assert.equal(result.userAccounts![0].elevationLevel, "nonadmin");
      assert.equal(result._response.status, 200);
    });

    it("should get a pool reference with odata successfully", async () => {
      const options: BatchServiceModels.PoolGetOptionalParams = {
        poolGetOptions: { select: "id,state", expand: "stats" }
      };

      const result = await client.pool.get("nodesdktestpool1", options);
      assert.equal(result.id, "nodesdktestpool1");
      assert.equal(result.state, "active");
      assert.isUndefined(result.allocationState);
      assert.isUndefined(result.vmSize);
      assert.equal(result._response.status, 200);
    });

    it("should add a pool with vnet and get expected error", async () => {
      const pool: BatchServiceModels.PoolAddParameter = {
        id: "nodesdkvnetpool",
        vmSize: "small",
        cloudServiceConfiguration: { osFamily: "4" },
        targetDedicatedNodes: 0,
        networkConfiguration: {
          subnetId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test/providers/Microsoft.Network/virtualNetworks/vnet1/subnets/subnet1"
        }
      };

      try {
        await client.pool.add(pool);
        assert.fail("Expected error to be thrown");
      } catch (error) {
        assert.equal(error.statusCode, 403);
        assert.equal(error.body.code, "Forbidden");
      }
    });

    it("should add a pool with a custom image and get expected error", async () => {
      const pool: BatchServiceModels.PoolAddParameter = {
        id: "nodesdkimagepool",
        vmSize: "Standard_A1",
        virtualMachineConfiguration: {
          imageReference: {
            virtualMachineImageId:
              "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test/providers/Microsoft.Compute/images/FakeImage"
          },
          nodeAgentSKUId: "batch.node.ubuntu 16.04"
        },
        targetDedicatedNodes: 0
      };

      try {
        await client.pool.add(pool);
        assert.fail("Expected error to be thrown");
      } catch (error) {
        assert.equal(error.statusCode, 400);
        assert.equal(error.body.code, "InvalidPropertyValue");
        assert.equal(error.body.values[0].value, "virtualMachineImageId");
      }
    });

    it("should add a pool with a Data Disk", async () => {
      const pool: BatchServiceModels.PoolAddParameter = {
        id: "nodesdkdatadiskpool",
        vmSize: "Standard_A1",
        virtualMachineConfiguration: {
          imageReference: {
            publisher: "Canonical",
            offer: "UbuntuServer",
            sku: "16.04-LTS"
          },
          nodeAgentSKUId: "batch.node.ubuntu 16.04",
          dataDisks: [
            {
              lun: 1,
              diskSizeGB: 50
            }
          ]
        },
        targetDedicatedNodes: 0
      };

      const resultAdd = await client.pool.add(pool);
      assert.equal(resultAdd._response.status, 201);

      await wait(5000);

      const retultGet = await client.pool.get(pool.id);
      assert.equal(retultGet.virtualMachineConfiguration.dataDisks![0].lun, 1);
      assert.equal(retultGet.virtualMachineConfiguration.dataDisks![0].diskSizeGB, 50);

      const resultDelete = await client.pool.deleteMethod(pool.id);
      assert.equal(resultDelete._response.status, 202);
    });

    it("should add a pool with inbound endpoint configuration successfully", async () => {
      const pool: BatchServiceModels.PoolAddParameter = {
        id: "nodesdkinboundendpointpool",
        vmSize: "Standard_A1",
        networkConfiguration: {
          endpointConfiguration: {
            inboundNATPools: [
              {
                name: "TestEndpointConfig",
                protocol: "udp",
                backendPort: 64444,
                frontendPortRangeStart: 60000,
                frontendPortRangeEnd: 61000,
                networkSecurityGroupRules: [
                  {
                    priority: 150,
                    access: "allow",
                    sourceAddressPrefix: "*"
                  }
                ]
              }
            ]
          }
        },
        virtualMachineConfiguration: {
          nodeAgentSKUId: "batch.node.ubuntu 16.04",
          imageReference: {
            publisher: "Canonical",
            offer: "UbuntuServer",
            sku: "16.04-LTS"
          }
        },
        targetDedicatedNodes: 1
      };

      const result = await client.pool.add(pool);

      assert.equal(result._response.status, 201);

      await wait(5000);
    });

    it("should get the details of a pool with endpoint configuration successfully", async () => {
      const result = await client.computeNode.list("nodesdkinboundendpointpool");
      assert.lengthOf(result, 1);
      assert.isDefined(result[0].endpointConfiguration);
      assert.lengthOf(result[0].endpointConfiguration.inboundEndpoints, 2);
      assert.equal(
        result[0].endpointConfiguration.inboundEndpoints[0].name,
        "TestEndpointConfig.0"
      );
      assert.equal(result[0].endpointConfiguration.inboundEndpoints[0].protocol, "udp");
    });

    it("should get pool node counts successfully", async () => {
      const result = await client.account.listPoolNodeCounts();

      assert.lengthOf(result, 2);
      assert.equal(result[0].poolId, "nodesdkinboundendpointpool");
      assert.equal(result[0].dedicated.idle, 1);
      assert.equal(result[0].lowPriority.total, 0);
      assert.equal(result._response.status, 200);
    });

    it("should list compute nodes successfully", async () => {
      const result = await client.computeNode.list("nodesdktestpool1");
      assert.isAtLeast(result.length, 1);
      assert.equal(result[0].state, "idle");
      assert.equal(result[0].schedulingState, "enabled");
      assert.isTrue(result[0].isDedicated);
      assert.equal(result._response.status, 200);
      compute_nodes = result.map(function(x) {
        return x.id;
      });
    });

    it("should get a compute node reference", async () => {
      const result = await client.computeNode.get("nodesdktestpool1", compute_nodes[0]);
      assert.equal(result.id, compute_nodes[0]);
      assert.equal(result.state, "idle");
      assert.equal(result.schedulingState, "enabled");
      assert.equal(result._response.status, 200);
    });

    it("should get a compute node reference", async () => {
      const result = await client.computeNode.get("nodesdktestpool1", compute_nodes[0]);

      assert.equal(result.id, compute_nodes[0]);
      assert.equal(result.state, "idle");
      assert.equal(result.schedulingState, "enabled");
      assert.equal(result._response.status, 200);
    });

    it("should add a user to a compute node successfully", async () => {
      const options = { name: "NodeSDKTestUser", isAdmin: false, password: "kt#_gahr!@aGERDXA" };
      const result = await client.computeNode.addUser(
        "nodesdktestpool1",
        compute_nodes[0],
        options
      );

      assert.equal(result._response.status, 201);
    });

    it("should update a compute node user successfully", async () => {
      const options = { password: "liilef#$DdRGSa_ewkjh" };
      const result = await client.computeNode.updateUser(
        "nodesdktestpool1",
        compute_nodes[0],
        "NodeSDKTestUser",
        options
      );

      assert.equal(result._response.status, 200);
    });

    it("should get a remote desktop file successfully", (done) => {
      client.computeNode
        .getRemoteDesktop("nodesdktestpool1", compute_nodes[0])
        .then((result) => {
          assert.equal(result._response.status, 200);
          readStreamToBuffer(result.readableStreamBody!, function(_err, buff) {
            assert.isAtLeast(buff.length, 1);
            done();
          });
        })
        .catch((error) => {
          assert.fail(error);
        });
    });

    it("should delete a compute node user successfully", async () => {
      const result = await client.computeNode.deleteUser(
        "nodesdktestpool1",
        compute_nodes[0],
        "NodeSDKTestUser"
      );

      assert.equal(result._response.status, 200);
    });

    it("should disable scheduling on a compute node successfully", async () => {
      const result = await client.computeNode.disableScheduling(
        "nodesdktestpool1",
        compute_nodes[1]
      );

      assert.equal(result._response.status, 200);
    });

    it("should enable scheduling on a compute node successfully", async () => {
      const result = await client.computeNode.enableScheduling(
        "nodesdktestpool1",
        compute_nodes[1]
      );

      assert.equal(result._response.status, 200);
    });

    it("should reboot a compute node successfully", async () => {
      const result = await client.computeNode.reboot("nodesdktestpool1", compute_nodes[0]);

      assert.equal(result._response.status, 202);
    });

    it("should reimage a compute node successfully", async () => {
      const result = await client.computeNode.reimage("nodesdktestpool1", compute_nodes[1]);

      assert.equal(result._response.status, 202);
    });

    it("should upload pool node logs at paas pool", async () => {
      const container = "https://teststorage.blob.core.windows.net/fakecontainer";
      const config: BatchServiceModels.UploadBatchServiceLogsConfiguration = {
        containerUrl: container,
        startTime: new Date("2018-02-25T00:00:00.00")
      };
      const result = await client.computeNode.uploadBatchServiceLogs(
        "nodesdktestpool1",
        compute_nodes[2],
        config
      );

      assert.equal(result._response.status, 200);
      assert.isAtLeast(result.numberOfFilesUploaded, 1);
    });

    it("should enable autoscale successfully", async () => {
      const model: BatchServiceModels.PoolEnableAutoScaleParameter = {
        autoScaleFormula: "$TargetDedicatedNodes=2",
        autoScaleEvaluationInterval: duration({ minutes: 6 }).toISOString()
      };

      const result = await client.pool.enableAutoScale("nodesdktestpool1", model);

      assert.equal(result._response.status, 200);
    });

    it("should evaluate pool autoscale successfully", async () => {
      const result = await client.pool.evaluateAutoScale("nodesdktestpool1", {
        autoScaleFormula: "$TargetDedicatedNodes=3"
      });

      assert.equal(
        result.results,
        "$TargetDedicatedNodes=3;$TargetLowPriorityNodes=0;$NodeDeallocationOption=requeue"
      );
      assert.equal(result._response.status, 200);
    });

    it("should fail to evaluate invalid autoscale formula", async () => {
      const result = await client.pool.evaluateAutoScale("nodesdktestpool1", {
        autoScaleFormula: "something_useless"
      });

      assert.equal(
        result.results,
        "$TargetDedicatedNodes=2;$TargetLowPriorityNodes=0;$NodeDeallocationOption=requeue"
      );
      assert.equal(result._response.status, 200);
    });

    it("should disable autoscale successfully", async () => {
      const result = await client.pool.disableAutoScale("nodesdktestpool1");

      assert.equal(result._response.status, 200);
    });

    it("should create a second pool successfully", async () => {
      const pool = {
        id: "nodesdktestpool2",
        vmSize: "small",
        cloudServiceConfiguration: { osFamily: "4" }
      };
      const result = await client.pool.add(pool);

      assert.equal(result._response.status, 201);
    });

    it("should list pools without filters", async () => {
      const result = await client.pool.list();

      assert.isAtLeast(result.length, 2);
      assert.equal(result._response.status, 200);
    });

    it("should list a maximum number of pools", async () => {
      const options = { poolListOptions: { maxResults: 1 } };
      let result = await client.pool.list(options);

      assert.lengthOf(result, 1);
      assert.equal(result._response.status, 200);
      result = await client.pool.listNext(result.odatanextLink);

      assert.lengthOf(result, 1);
      assert.equal(result._response.status, 200);
    });

    it("should fail to list pools with invalid max", async () => {
      const options = { poolListOptions: { maxResults: -5 } };
      try {
        await client.pool.list(options);
        assert.fail();
      } catch (error) {
        assert.equal(error.code, "InvalidQueryParameterValue");
      }
    });

    it("should list pools according to filter", async () => {
      const options = {
        poolListOptions: {
          filter: "startswith(id,'nodesdktestpool1')",
          select: "id,state",
          expand: "stats"
        }
      };
      const result = await client.pool.list(options);

      assert.lengthOf(result, 1);
      assert.equal(result[0].id, "nodesdktestpool1");
      assert.equal(result[0].state, "active");
      assert.isUndefined(result[0].allocationState);
      assert.isUndefined(result[0].vmSize);
      assert.equal(result._response.status, 200);
    });

    it("should check that pool exists successfully", async () => {
      const result = await client.pool.exists("nodesdktestpool1");

      assert.isTrue(result);
      assert.equal(result._response.status, 200);
    });

    it("should start pool resizing successfully", async () => {
      const options = { targetDedicatedNodes: 3, targetLowPriorityNodes: 2 };
      const result = await client.pool.resize("nodesdktestpool2", options);

      assert.equal(result._response.status, 202);
    });

    it("should stop pool resizing successfully", async () => {
      const result = await client.pool.stopResize("nodesdktestpool2");

      assert.equal(result._response.status, 202);
    });

    it("should get pool lifetime statistics", async () => {
      const result = await client.pool.getAllLifetimeStatistics();

      assert.isDefined(result.usageStats);
      assert.isDefined(result.resourceStats);
      assert.equal(result._response.status, 200);
    });

    it("should list pools usage metrics", async () => {
      const result = await client.pool.listUsageMetrics();

      assert.isAtLeast(result.length, 1);
      assert.equal(result._response.status, 200);
    });

    it("should create a job successfully", async () => {
      const options = { id: "HelloWorldJobNodeSDKTest", poolInfo: { poolId: "nodesdktestpool1" } };
      const result = await client.job.add(options);

      assert.equal(result._response.status, 201);
    });

    it("should update a job successfully", async () => {
      const options = {
        priority: 500,
        constraints: { maxTaskRetryCount: 3 },
        poolInfo: { poolId: "nodesdktestpool1" }
      };
      const result = await client.job.update("HelloWorldJobNodeSDKTest", options);

      assert.equal(result._response.status, 200);
    });

    it("should patch a job successfully", async () => {
      const options = {
        priority: 500,
        constraints: { maxTaskRetryCount: 3 },
        poolInfo: { poolId: "nodesdktestpool1" }
      };
      const result = await client.job.update("HelloWorldJobNodeSDKTest", options);

      assert.equal(result._response.status, 200);
    });

    it("should create a task successfully", async () => {
      const task = {
        id: "HelloWorldNodeSDKTestTask",
        commandLine: "ping 127.0.0.1 -n 20"
      };
      const result = await client.task.add("HelloWorldJobNodeSDKTest", task);

      assert.equal(result._response.status, 201);
    });

    it("should create a task with container settings successfully", async () => {
      const options = {
        id: "ContainerJobNodeSDKTest",
        poolInfo: { poolId: "nodesdkinboundendpointpool" }
      };
      const result1 = await client.job.add(options);
      assert.equal(result1._response.status, 201);
      const task = {
        id: "ContainerNodeSDKTestTask",
        commandLine: "cat /etc/centos-release",
        containerSettings: { imageName: "centos" }
      };
      const result2 = await client.task.add("ContainerJobNodeSDKTest", task);
      assert.equal(result2._response.status, 201);

      await client.job.deleteMethod("ContainerJobNodeSDKTest");
    });

    it("should create a task with exit conditions successfully", async () => {
      const jobId = "JobWithAutoComplete";
      const taskId = "TaskWithAutoComplete";
      const job: BatchServiceModels.JobAddParameter = {
        id: jobId,
        poolInfo: {
          poolId: "dummypool"
        },
        onAllTasksComplete: "noaction",
        onTaskFailure: "performexitoptionsjobaction",
        usesTaskDependencies: true
      };

      const result1 = await client.job.add(job);

      assert.equal(result1._response.status, 201);

      const task: BatchServiceModels.TaskAddParameter = {
        id: taskId,
        commandLine: "echo Hello World",
        exitConditions: {
          default: {
            jobAction: "terminate",
            dependencyAction: "satisfy"
          },
          exitCodes: [
            {
              code: 1,
              exitOptions: {
                jobAction: "none",
                dependencyAction: "block"
              }
            }
          ]
        }
      };

      const result2 = await client.task.add(jobId, task);

      assert.equal(result2._response.status, 201);

      const result3 = await client.task.get(jobId, taskId);

      assert.equal(result3.exitConditions.default.jobAction, "terminate");
      assert.equal(result3.exitConditions.default.dependencyAction, "satisfy");
      assert.equal(result3.exitConditions.exitCodes[0].code, 1);
      assert.equal(result3.exitConditions.exitCodes[0].exitOptions.jobAction, "none");
      assert.equal(result3.exitConditions.exitCodes[0].exitOptions.dependencyAction, "block");

      await client.job.deleteMethod(jobId);
    });

    it("should terminate a task successfully", async () => {
      const result = await client.task.terminate(
        "HelloWorldJobNodeSDKTest",
        "HelloWorldNodeSDKTestTask"
      );

      assert.equal(result._response.status, 204);
    });

    it("should create a second task with output files successfully", async () => {
      const container =
        "https://teststorage.blob.core.windows.net/batch-sdk-test?se=2017-05-05T23%3A48%3A11Z&sv=2016-05-31&sig=fwsWniANVb/KSQQdok%2BbT7gR79iiZSG%2BGkw9Rsd5efY";
      const outputs = [
        {
          filePattern: "../stdout.txt",
          destination: {
            container: { containerUrl: container, path: "taskLogs/output.txt" }
          },
          uploadOptions: { uploadCondition: "taskCompletion" }
        },
        {
          file_pattern: "../stderr.txt",
          destination: {
            container: { containerUrl: container, path: "taskLogs/error.txt" }
          },
          uploadOptions: { uploadCondition: "taskFailure" }
        }
      ];
      const options = {
        id: "HelloWorldNodeSDKTestTask2",
        commandLine: "cmd /c echo hello world",
        output_files: outputs
      };
      const result = await client.task.add("HelloWorldJobNodeSDKTest", options);

      assert.equal(result._response.status, 201);
    });

    it("should reactivate a task successfully", async () => {
      const result = await client.task.reactivate(
        "HelloWorldJobNodeSDKTest",
        "HelloWorldNodeSDKTestTask"
      );

      assert.equal(result._response.status, 204);
    });

    it("should update a task successfully", async () => {
      const options = { constraints: { maxTaskRetryCount: 3 } };
      const result = await client.task.update(
        "HelloWorldJobNodeSDKTest",
        "HelloWorldNodeSDKTestTask2",
        options
      );

      assert.equal(result._response.status, 200);
    });

    it("should list all tasks successfully", async () => {
      const result = await client.task.list("HelloWorldJobNodeSDKTest");

      assert.lengthOf(result, 2);
      assert.equal(result[0].constraints.maxTaskRetryCount, 3);
      assert.equal(result._response.status, 200);
    });

    it("should get task reference successfully", async () => {
      const result = await client.task.get("HelloWorldJobNodeSDKTest", "HelloWorldNodeSDKTestTask");

      assert.equal(result.id, "HelloWorldNodeSDKTestTask");
      assert.equal(result._response.status, 200);

      wait(100000);

      // if (!suite.isPlayback) {
      //   console.log("Waiting for task to complete...");
      //   setTimeout(function() {
      //     done();
      //   }, 100000);
      // } else {
      //   done();
      // }
    });

    //TODO: Need to test with actual subtasks
    it("should list sub tasks successfully", async () => {
      const result = await client.task.listSubtasks(
        "HelloWorldJobNodeSDKTest",
        "HelloWorldNodeSDKTestTask"
      );

      assert.equal(result._response.status, 200);
    });

    it("should create a task with authentication token settings successfully", async () => {
      const jobId = "HelloWorldJobNodeSDKTest";
      const taskId = "TaskWithAuthTokenSettings";
      const task: BatchServiceModels.TaskAddParameter = {
        id: taskId,
        commandLine: "cmd /c echo Hello World",
        authenticationTokenSettings: {
          access: ["job"]
        }
      };

      const result = await client.task.add(jobId, task);

      assert.equal(result._response.status, 201);

      const result2 = await client.task.get(jobId, taskId);

      assert.isDefined(result2.authenticationTokenSettings);
      assert.isDefined(result2.authenticationTokenSettings.access);
      assert.lengthOf(result2.authenticationTokenSettings.access, 1);
      assert.equal(result2.authenticationTokenSettings.access[0], "job");
    });

    it("should create a task with a user identity successfully", async () => {
      const jobId = "HelloWorldJobNodeSDKTest";
      const taskId = "TaskWithUserIdentity";
      const task = {
        id: taskId,
        // This command should return a non-zero exit code for a non-admin user
        commandLine: "cmd /c net session >nul 2>&1",
        userIdentity: {
          userName: nonAdminPoolUser
        }
      };

      const result = await client.task.add(jobId, task);

      assert.equal(result._response.status, 201);

      wait(15000);
      const result2 = await client.task.get(jobId, taskId);

      assert.isDefined(result2.userIdentity);
      assert.equal(result2.userIdentity.userName, nonAdminPoolUser);
      assert.isDefined(result2.executionInfo);
      assert.equal(result2.executionInfo.result, "failure");
      assert.notEqual(result2.executionInfo.exitCode, 0);
    });

    it("should count tasks sucessfully", async () => {
      const jobId = "HelloWorldJobNodeSDKTest";
      const result = await client.job.getTaskCounts(jobId);

      assert.isDefined(result.active);
      assert.isDefined(result.completed);
    });

    it("should list files from task successfully", async () => {
      const result = await client.file.listFromTask(
        "HelloWorldJobNodeSDKTest",
        "HelloWorldNodeSDKTestTask2"
      );

      assert.isAtLeast(result.length, 1);
      assert.equal(result._response.status, 200);
    });

    it("should get file properties from task successfully", async () => {
      const result = await client.file.getPropertiesFromTask(
        "HelloWorldJobNodeSDKTest",
        "HelloWorldNodeSDKTestTask2",
        "stderr.txt"
      );

      assert.equal(result._response.status, 200);
    });

    it("should get file from task successfully", (done) => {
      client.file
        .getFromTask("HelloWorldJobNodeSDKTest", "HelloWorldNodeSDKTestTask2", "stdout.txt")
        .then((result) => {
          assert.equal(result._response.status, 200);
          readStreamToBuffer(result.readableStreamBody!, function(_err, buff) {
            assert.isAtLeast(buff.length, 1);
            done();
          });
        })
        .catch((error) => {
          assert.fail(error);
        });
    });

    it("should delete file from task successfully", async () => {
      const result = await client.file.deleteFromTask(
        "HelloWorldJobNodeSDKTest",
        "HelloWorldNodeSDKTestTask2",
        "stderr.txt"
      );

      assert.equal(result._response.status, 200);
    });

    it("should re-list compute nodes successfully", async () => {
      const result = await client.computeNode.list("nodesdktestpool1");

      assert.isAtLeast(result.length, 1);
      compute_nodes = result.map(function(x) {
        return x.id;
      });
      wait(100000);
      // if (!suite.isPlayback) {
      //   console.log('Waiting for nodes to be ready...')
      //   setTimeout(function () {
      //     done();
      //   }, 100000);
      // } else {
      //   done();
      // }
    });

    it("should list files from compute node successfully", async () => {
      const result = await client.file.listFromComputeNode("nodesdktestpool1", compute_nodes[2]);

      assert.isAtLeast(result.length, 1);
      assert.equal(result._response.status, 200);
    });

    it("should get file properties from node successfully", async () => {
      const result = await client.file.getPropertiesFromComputeNode(
        "nodesdktestpool1",
        compute_nodes[2],
        "startup/wd/hello.txt"
      );

      assert.equal(result._response.status, 200);
    });

    it("should get file from node successfully", (done) => {
      client.file
        .getFromComputeNode("nodesdktestpool1", compute_nodes[2], "startup/wd/hello.txt")
        .then((result) => {
          assert.equal(result._response.status, 200);
          readStreamToBuffer(result.readableStreamBody!, function(_err, buff) {
            assert.isAtLeast(buff.length, 1);
            done();
          });
        })
        .catch((error) => {
          assert.fail(error);
        });
    });

    it("should delete file from node successfully", async () => {
      const result = await client.file.deleteFromComputeNode(
        "nodesdktestpool1",
        compute_nodes[2],
        "startup/wd/hello.txt"
      );

      assert.equal(result._response.status, 200);
    });

    it("should list applications successfully", async () => {
      const result = await client.application.list();

      assert.isAtLeast(result.length, 1);
      assert.equal(result._response.status, 200);
    });

    it("should get application reference successfully", async () => {
      await client.application.get("my_application_id");
    });

    it("should delete a task successfully", async () => {
      const result = await client.task.deleteMethod(
        "HelloWorldJobNodeSDKTest",
        "HelloWorldNodeSDKTestTask"
      );

      assert.equal(result._response.status, 200);
    });

    it("should add a task with an application package reference successfully", async () => {
      const taskId = "ApplicationPacakgeReferenceTask";
      const task = {
        id: taskId,
        commandLine: "cmd /c echo hello world",
        applicationPackageReferences: [
          {
            applicationId: "my_application_id"
          }
        ]
      };
      const result1 = await client.task.add("HelloWorldJobNodeSDKTest", task);
      assert.equal(result1._response.status, 201);

      const result2 = await client.task.get("HelloWorldJobNodeSDKTest", taskId);
      assert.isDefined(result2.applicationPackageReferences);
    });

    it("should delete a second task successfully", async () => {
      const result = await client.task.deleteMethod(
        "HelloWorldJobNodeSDKTest",
        "HelloWorldNodeSDKTestTask2"
      );

      assert.equal(result._response.status, 200);
    });

    it("should get a job reference successfully", async () => {
      const result = await client.job.get("HelloWorldJobNodeSDKTest");

      assert.equal(result.id, "HelloWorldJobNodeSDKTest");
      assert.equal(result.state, "active");
      assert.equal(result.poolInfo.poolId, "nodesdktestpool1");
      assert.equal(result._response.status, 200);
    });

    it("should list jobs successfully", async () => {
      const result = await client.job.list();

      assert.isAtLeast(result.length, 1);
      assert.equal(result._response.status, 200);
    });

    it("should fail to job prep+release status", async () => {
      try {
        await client.job.listPreparationAndReleaseTaskStatus("HelloWorldJobNodeSDKTest");
      } catch (error) {
        assert.equal(error.code, "JobPreparationTaskOrReleaseTaskNotSpecified");
      }
    });

    it("should disable a job successfully", async () => {
      const result = await client.job.disable("HelloWorldJobNodeSDKTest", {
        disableTasks: "requeue"
      });

      assert.equal(result._response.status, 202);
    });

    it("should enable a job successfully", async () => {
      const result = await client.job.enable("HelloWorldJobNodeSDKTest");

      assert.equal(result._response.status, 202);
    });

    it("should terminate a job successfully", async () => {
      const result = await client.job.terminate("HelloWorldJobNodeSDKTest");

      assert.equal(result._response.status, 202);
    });

    it("should delete a job successfully", async () => {
      const result = await client.job.deleteMethod("HelloWorldJobNodeSDKTest");

      assert.equal(result._response.status, 202);
    });

    it("should get all job statistics successfully", async () => {
      const result = await client.job.getAllLifetimeStatistics();

      assert.isDefined(result.userCPUTime);
      assert.isDefined(result.kernelCPUTime);
      assert.equal(result._response.status, 200);
    });

    it("should create a job schdule successfully", async () => {
      const options: BatchServiceModels.JobScheduleAddParameter = {
        id: "NodeSDKTestSchedule",
        jobSpecification: {
          displayName: "HelloWorldJobNodeSDKTest",
          poolInfo: { poolId: "nodesdktestpool1" }
        },
        schedule: {
          doNotRunUntil: new Date("2020-12-25T00:00:00.00"),
          startWindow: duration({ minutes: 6 }).toISOString()
        }
      };

      const result = await client.jobSchedule.add(options);

      assert.equal(result._response.status, 201);
    });

    it("should list job schedules successfully", async () => {
      const result = await client.jobSchedule.list();

      assert.isAtLeast(result.length, 1);
      assert.equal(result._response.status, 200);
    });

    //TODO: Have the job schedule perform jobs
    it("should list jobs from job schedule successfully", async () => {
      const result = await client.job.listFromJobSchedule("NodeSDKTestSchedule");

      assert.lengthOf(result, 0);
      assert.equal(result._response.status, 200);
    });

    it("should check if a job schedule exists successfully", async () => {
      const result = await client.jobSchedule.exists("NodeSDKTestSchedule");

      assert.isTrue(result);
      assert.equal(result._response.status, 200);
    });

    it("should get a job schedule reference successfully", async () => {
      const result = await client.jobSchedule.get("NodeSDKTestSchedule");

      assert.equal(result.id, "NodeSDKTestSchedule");
      assert.equal(result.state, "active");
      assert.equal(result._response.status, 200);
    });

    it("should update a job schedule successfully", async () => {
      const options: BatchServiceModels.JobScheduleUpdateParameter = {
        schedule: { recurrenceInterval: duration({ hours: 6 }).toISOString() },
        jobSpecification: { poolInfo: { poolId: "nodesdktestpool2" } }
      };

      const result = await client.jobSchedule.update("NodeSDKTestSchedule", options);

      assert.equal(result._response.status, 200);
    });

    it("should patch a job schedule successfully", async () => {
      const options = {
        schedule: {
          recurrenceInterval: duration({ hours: 3 }).toISOString(),
          startWindow: duration({ hours: 1 }).toISOString()
        }
      };

      const result = await client.jobSchedule.patch("NodeSDKTestSchedule", options);

      assert.equal(result._response.status, 200);
    });

    it("should disable a job schedule successfully", async () => {
      const result = await client.jobSchedule.disable("NodeSDKTestSchedule");

      assert.equal(result._response.status, 204);
    });

    it("should enable a job schedule successfully", async () => {
      const result = await client.jobSchedule.enable("NodeSDKTestSchedule");

      assert.equal(result._response.status, 204);
    });

    it("should terminate a job schedule successfully", async () => {
      const result = await client.jobSchedule.terminate("NodeSDKTestSchedule");

      assert.equal(result._response.status, 202);
    });

    it("should delete a job schedule successfully", async () => {
      const result = await client.jobSchedule.deleteMethod("NodeSDKTestSchedule");

      assert.equal(result._response.status, 202);
    });

    it("should remove nodes in pool successfully", async () => {
      const options: BatchServiceModels.NodeRemoveParameter = {
        nodeList: compute_nodes,
        nodeDeallocationOption: "terminate"
      };
      const result = await client.pool.removeNodes("nodesdktestpool1", options);

      assert.equal(result._response.status, 202);
    });

    it("should delete a pool successfully", async () => {
      const result = await client.pool.deleteMethod("nodesdktestpool1");

      assert.equal(result._response.status, 202);
    });

    it("should delete a second pool successfully", async () => {
      const result = await client.pool.deleteMethod("nodesdktestpool2");

      assert.equal(result._response.status, 202);
    });

    it("should fail to delete a non-existant pool", async () => {
      try {
        await client.pool.deleteMethod("nodesdktestpool1");
      } catch (error) {
        assert.equal(error.code, "PoolBeingDeleted");
      }
    });

    it("should delete a certificate successfully", async () => {
      const result = await client.certificate.deleteMethod("sha1", certThumb);

      assert.equal(result._response.status, 202);
    });

    it("should fail to cancel deleting a certificate", async () => {
      try {
        await client.certificate.cancelDeletion("sha1", certThumb);
      } catch (error) {
        assert.equal(error.code, "CertificateBeingDeleted");
      }
    });
  });
});
