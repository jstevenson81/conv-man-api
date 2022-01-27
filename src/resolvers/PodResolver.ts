import { ApolloError } from "apollo-server-express";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { UxPod } from "../models/data/Impl/UxPod";
import { IApiResponse } from "../models/data/Interfaces/IApiResponse";
import { IUxPod } from "../models/data/Interfaces/IUxPod";
import { PodInput } from "../models/GraphQl/InputTypes/PodInput";
import { Pod } from "../models/GraphQl/OutputTypes/Pod";
import { DataMapper } from "../models/mappers/DataMapper";
import { PodService } from "../services/data/PodService";
import { ConvManResolver } from "./base/ConvManResolver";

@Service()
@Resolver(Pod)
export class PodResolver extends ConvManResolver {
  constructor(private podSvc: PodService, private mapper: DataMapper) {
    super();
  }

  @Query(() => [Pod], { description: "Gets all pods from the autonomous database rest services" })
  async getAllPods(): Promise<Array<Pod>> {
    const response = await this.podSvc.getAllPods();
    this.validateApiResponse(response);
    const pods: Pod[] = [];

    response.collection.items.forEach((p: UxPod) => {
      pods.push(this.mapper.mapUxPodToPod(p));
    });
    return pods;
  }

  @Query(() => Pod, { description: "Gets one pod from the autonomous database rest services" })
  async getOnePod(@Arg("id") id: number): Promise<Pod> {
    const response = await this.podSvc.getOnePod(id);
    this.validateApiResponse(response);
    return this.mapper.mapUxPodToPod(response.item);
  }

  @Mutation(() => Pod, { description: "Adds a new pod to the autonomous database via the rest services" })
  async upsertPod(@Arg("data", { description: "The body of the request" }) data: PodInput): Promise<Pod> {
    if (!data.podEmailDomainId || data.podEmailDomainId <= 0)
      throw new ApolloError("The podEmailDomainId must be a valid podEmailDomain object's primary key", "FK_VIOLATION");
    const uxPod = this.mapper.mapPodToUxPod(data);
    let response: IApiResponse<UxPod>;
    if (data.podId > 0) {
      uxPod.ux_pod_id = null;
      response = await this.podSvc.add(uxPod);
    } else {
      // update
      throw new ApolloError("Not Implemented...yet.");
    }
    this.validateApiResponse(response);
    return this.mapper.mapUxPodToPod(response.item);
  }
}
