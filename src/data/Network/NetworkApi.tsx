import axios, { AxiosInstance } from 'axios'

import NetworkContainerResult from "../../domain/entity/Network/structures/NetworkContainerResult";
import NetworkInfoResult from "../../domain/entity/Network/structures/NetworkInfoResult";
import NetworkRepository from "../../domain/repository/Network/NetworkRepository";

interface NetworkInfoResultResponse {
    data: NetworkInfoResult;
}

interface ListNetworkResponse {
    data: {
        filenames: String[]
    }
}

interface NetworkContainerResultResponse {
    data: NetworkContainerResult
}

export default class NetworkApi implements NetworkRepository {
    private API_URL = 'https://mnv-backend.herokuapp.com'
    private client: AxiosInstance

    public constructor() {
        this.client = axios.create({
            baseURL: this.API_URL,
        })
    }

    async calculateAvgBetweenness(networkResult: NetworkContainerResult): Promise<NetworkInfoResult> {
        const { data }: NetworkInfoResultResponse = await this.client.get('/load_default_network', {
            data: {
                'filename': ''
            }
        });

        return data
    }

    async calculateAvgDegree(networkResult: NetworkContainerResult): Promise<NetworkInfoResult> {
        const { data }: NetworkInfoResultResponse = await this.client.get('/load_default_network', {
            data: {
                'filename': ''
            }
        });

        return data
    }

    async calculateAvgCloseness(networkResult: NetworkContainerResult): Promise<NetworkInfoResult> {
        const { data }: NetworkInfoResultResponse = await this.client.get('/load_default_network', {
            data: {
                'filename': ''
            }
        });

        return data
    }

    async listDefaultNetworks(): Promise<String[]> {
        const { data }: ListNetworkResponse = await this.client.get('/list_default_networks');

        return data.filenames
    }

    async loadDefaultNetwork(filename: string): Promise<NetworkContainerResult> {
        const { data }: NetworkContainerResultResponse = await this.client.get('/load_default_network', {
            data: {
                filename
            }
        });

        return data
    }

    async uploadJsonNetwork(filename: string): Promise<NetworkContainerResult> {
        const { data }: NetworkContainerResultResponse = await this.client.get('/load_default_network', {
            data: {
                filename
            }
        });

        return data
    }

    async uploadNcolNetwork(filename: string): Promise<NetworkContainerResult> {
        const { data }: NetworkContainerResultResponse = await this.client.get('/load_default_network', {
            data: {
                filename
            }
        });

        return data
    }
}