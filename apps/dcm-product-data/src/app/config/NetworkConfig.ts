import axios from 'axios';

const baseUrl = import.meta.env.VITE_CAPI_BASE_URL;

export class NetworkConfig {

    private static apiClient = axios.create({
        baseURL: baseUrl,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    public static getApiClient() {
        return this.apiClient;
    }
}
