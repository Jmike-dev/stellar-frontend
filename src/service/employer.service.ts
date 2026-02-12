import { toast } from "sonner";
import { api } from "./axois.config";

export interface CreateEmployer {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    location: string;
    tribe: string;
    role: "employer";
    religion: string;
}

export interface Login {
    email: string;
    password: string;
}
export interface JobCreation {
    title: string;
    description: string;
    location: string;
    salary: number;
    work_type: string;
}

export async function createEmployer(data: CreateEmployer) {
    const response = await api.post("/v1/auth/employer/register", data);
    toast.success("Employer created");
    return response.data;
}

export async function employerLogin(data: Login) {
    const response = await api.post("/v1/auth/employer/login", data);
    toast.success("Employer created");

    // Store access token in session storage
    if (response.data?.access_token) {
        sessionStorage.setItem("access_token", response.data.access_token);
    }

    return response.data;
}
export async function createJob(data: JobCreation) {
    const response = await api.post("/v1/jobs/", data);
    toast.success("Employer created:");
    return response.data;
}

export async function getMyJobs(): Promise<JobCreation[]> {
    const response = await api.get("/v1/jobs/my-jobs");

    return response.data;
}
