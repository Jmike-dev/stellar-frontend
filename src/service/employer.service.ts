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

export async function createEmployer(data: CreateEmployer) {
    const response = await api.post("/v1/auth/employer/register", data);
    console.log("Employer created:", response.data);
    return response.data;
}

export async function employerLogin(data: Login) {
    const response = await api.post("/v1/auth/employer/login", data);
    console.log("Employer created:", response.data);
    return response.data;
}
