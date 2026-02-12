import { api } from "./axois.config";

export interface Worker {
    id: number;
    name: string;
    tribe: string;
    location: string;
}

export interface WorkersResponse {
    workers: Worker[];
    total_workers: number;
    page: number;
    page_size: number;
    total_pages: number;
}

export async function getWorkers(): Promise<WorkersResponse> {
    const response = await api.get("/v1/workers");

    return response.data.data;
}
