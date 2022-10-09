import axios, { AxiosInstance } from "axios";
import InfoAdapter from "../../adapter/mnvAdapterInfo/mnvAPI_NetInfo";
import { InfoResult } from "../../adapter/mnvAdapterInfo/types";
import NetContainerAdapter from "../../adapter/mnvLoadNet/mnvAPI_NetContainer";
import { NetworkContainer } from "../../adapter/mnvLoadNet/types";
import { SubLayer } from "../../adapter/mnvLoadNextLayer/types";

import NetworkContainerResult from "../../domain/entity/Network/structures/NetworkContainerResult";
import NetworkRepository from "../../domain/repository/Network/NetworkRepository";

interface NetworkInfoResultResponse {
  data: InfoResult;
}

interface ListNetworkResponse {
  data: {
    filenames: string[];
  };
}

interface NetworkContainerResultResponse {
  data: NetworkContainer;
}

interface NetworkMnvResultResponde {
  data: SubLayer;
}

type InfoMethods = "averageBetweenness" | "averageDegree" | "averageCloseness";
/**
 * Network repository implementation
 */
export default class NetworkApi implements NetworkRepository {
  private readonly API_URL = "http://localhost:5000";
  private client: AxiosInstance;

  public constructor() {
    this.client = axios.create({
      baseURL: this.API_URL,
    });
  }

  /**
   * Calculates network info algorithms (average degree, betweeness and closeness)
   * @param {NetworkContainerResult} networkResult The network structure param
   * @returns {Promise<number>} The value calculated
   */
  private async calculateInfo(
    networkResult: NetworkContainerResult,
    method: InfoMethods
  ): Promise<number> {
    const { data }: NetworkInfoResultResponse = await this.client.post(
      "/compute_network_information",
      {
        method: method,
        graph: InfoAdapter.NetworkToMnvAPI(networkResult),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return InfoAdapter.mnvAPIToNetwork(data);
  }

  /** 
   * Calculates network average betweenness
    @param {NetworkContainerResult} networkResult Network structure
    @returns {Promise<number>} The value calculated
    */
  public async calculateAvgBetweenness(
    networkResult: NetworkContainerResult
  ): Promise<number> {
    const infoParams: InfoMethods = "averageBetweenness";

    return this.calculateInfo(networkResult, infoParams);
  }

  /** 
   * Calculates network average degree
    @param {NetworkContainerResult} networkResult Network structure
    @returns {Promise<number>} The value calculated
    */
  public async calculateAvgDegree(
    networkResult: NetworkContainerResult
  ): Promise<number> {
    const infoParams: InfoMethods = "averageDegree";

    return this.calculateInfo(networkResult, infoParams);
  }
  /** 
   * Calculates network average closeness
    @param {NetworkContainerResult} networkResult Network structure
    @returns {Promise<number>} The value calculated
    */
  public async calculateAvgCloseness(
    networkResult: NetworkContainerResult
  ): Promise<number> {
    const infoParams: InfoMethods = "averageCloseness";

    return this.calculateInfo(networkResult, infoParams);
  }

  /**
   * List default network names to load
   * @returns {Promise<string>[]} Network list names
   */
  public async listDefaultNetworks(): Promise<string[]> {
    const { data }: ListNetworkResponse = await this.client.get(
      "/list_default_networks"
    );

    return data.filenames;
  }

  /**
   * Get Network structure by name
   * @param {string} filename
   * @return {Promise<NetworkContainerResult>}
   */
  public async loadDefaultNetwork(
    filename: string
  ): Promise<NetworkContainerResult> {
    const { data }: NetworkContainerResultResponse = await this.client.get(
      "/load_default_network",
      {
        params: {
          filename,
        },
      }
    );

    return NetContainerAdapter.mnvAPIToNetwork(data);
  }

  /**
   * Not implemented
   * @param {string} filename
   * @return {Promise<NetworkContainerResult>}
   */
  public async uploadJsonNetwork(
    filename: string
  ): Promise<NetworkContainerResult> {
    const { data }: NetworkContainerResultResponse = await this.client.get(
      "/load_default_network",
      {
        data: {
          filename,
        },
      }
    );

    return NetContainerAdapter.mnvAPIToNetwork(data);
  }

  /**
   * Not implemented
   * @param {string} filename
   * @return {Promise<NetworkContainerResult>}
   */
  public async uploadNcolNetwork(
    filename: string
  ): Promise<NetworkContainerResult> {
    const { data }: NetworkContainerResultResponse = await this.client.get(
      "/load_default_network",
      {
        data: {
          filename,
        },
      }
    );

    return NetContainerAdapter.mnvAPIToNetwork(data);
  }

  /**
   * Get Network child structure from parent name
   * @param {string} filename Parent name
   * @return {Promise<SubLayer>} Sublayer structure
   */
  public async loadDefaultNetworkChild(filename: string): Promise<SubLayer> {
    const { data }: NetworkMnvResultResponde = await this.client.get(
      "/generate_mnv",
      {
        params: {
          filename,
        },
      }
    );

    return data;
  }
}
