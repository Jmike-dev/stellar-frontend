import { api } from "./axois.config";

export interface Worker {
    id: string; // Changed from number to string to match UUID
    phone_number: string;
    first_name: string;
    last_name: string;
    location: string;
    is_employed: boolean;
    // tribe field removed since API doesn't provide it
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

    // Extract the nested data object
    return response.data.data;
}
