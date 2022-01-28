import chai, { assert } from "chai";
import _ from "lodash";
import { IUxPod } from "../src/models/data/Interfaces/IUxPod";
import { PodService } from "../src/services/data/PodService";
import { v4 as uuidv4 } from "uuid";
import { ServerConfig } from "../src/http/ServerConfig";

describe("Pod Service Tests", () => {
  chai.should();

  it("Should get all pods", (done) => {
    const svc = new PodService({
      baseUrl: ServerConfig.ords.url,
      entity: "uxpods/",
    });
    svc.getAllPods().then((response) => {
      response.should.not.be.undefined;
      response.error.code.should.equal("");
      response.collection.items.should.not.be.empty;
      response.collection.count.should.be.greaterThan(0);
      done();
    });
  }).timeout(4000);

  it("Should get one pod", (done) => {
    const svc = new PodService({
      baseUrl: ServerConfig.ords.url,
      entity: ServerConfig.ords.pod,
    });
    svc.getAllPods().then((res) => {
      svc.getOnePod(res.collection.items[0].ux_pod_id).then((response) => {
        response.item.should.not.be.undefined;
        response.item.should.haveOwnProperty("ux_pod_id");
        response.item.ux_pod_id.should.equal(res.collection.items[0].ux_pod_id);
        done();
      });
    });
  }).timeout(4000);

  it("Should add a pod", async () => {
    const uniqueId = uuidv4();
    const svc = new PodService({
      baseUrl: ServerConfig.ords.url,
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
      baseUrl: ServerConfig.ords.url,
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
  });
});
