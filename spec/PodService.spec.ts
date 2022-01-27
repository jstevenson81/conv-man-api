import chai, { assert } from "chai";
import _ from "lodash";
import { IUxPod } from "../src/models/data/Interfaces/IUxPod";
import { PodService } from "../src/services/data/PodService";
import { v4 as uuidv4 } from "uuid";
import { ServerConfig } from "../src/http/ServerConfig";

describe("Pod Service Tests", () => {
  chai.should();

  it("Should get all pods", async () => {
    const svc = new PodService({
      baseUrl: "https://etvwbwij8jdtzoz-hcmconversion1.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/",
      entity: "uxpods/",
    });
    const response = await svc.getAllPods();
    response.should.not.be.undefined;
    response.error.code.should.equal("");
    response.collection.items.should.not.be.empty;
    response.collection.count.should.be.greaterThan(0);
  });

  it("Should get one pod", async () => {
    const svc = new PodService({
      baseUrl: "https://etvwbwij8jdtzoz-hcmconversion1.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/",
      entity: ServerConfig.ords.pod,
    });
    const allPods = await svc.getAllPods();
    const response = await svc.getOnePod(allPods.collection.items[0].ux_pod_id);
    response.item.should.not.be.undefined;
    response.item.should.haveOwnProperty("ux_pod_id");
    response.item.ux_pod_id.should.equal(allPods.collection.items[0].ux_pod_id);
  });

  it("Should add a pod", async () => {
    const uniqueId = uuidv4();
    const svc = new PodService({
      baseUrl: "https://etvwbwij8jdtzoz-hcmconversion1.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/",
      entity: "uxpods/",
    });
    const response = await svc.add<IUxPod>({
      ux_pod_id: null,
      pod_name: uniqueId,
      pod_url: `https://www.oracle.com/${uniqueId}`,
      uxp_ux_pod_email_id: 2,
    });
    assert.isNotNull(response);
    assert.isTrue(response.item !== undefined);
  });

  it("Should error when a pod url exists", async () => {
    const svc = new PodService({
      baseUrl: "https://etvwbwij8jdtzoz-hcmconversion1.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/",
      entity: "uxpods/",
    });
    const response = await svc.add<IUxPod>({
      ux_pod_id: null,
      pod_name: "TEST5",
      pod_url: "https://www.oracle.com/test3",
      uxp_ux_pod_email_id: 2,
    });
    assert.isNotNull(response);
    assert.isNotEmpty(response.error);
    console.log(response);
  });
});
