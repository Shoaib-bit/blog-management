import { APIError } from "@/http/api.error";
import { http } from "@/http/http";
import { User } from "@/types/types";
import axios from "axios";

export interface LoginRequest {
    email: string;
    password: string;
}
export interface LoginResponse {
    data : {
        token : string
        user : User
    } | null
    message : string
}


export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

export interface RegisterResponse {
    data : null
    message : string
}

export const registerApi = async (data : RegisterRequest): Promise<RegisterResponse> => {
  if (!data || !data.name || !data.email || !data.password) {
    throw new APIError('Name, email and password are required')
  }
    try {
    const response = await http.post<RegisterResponse>('/auth/register', data)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw APIError.fromAxiosError(error, 'Failed to register')
    }
    throw new APIError('An unexpected error occurred while registering')
  }
}

export const loginApi = async (data : LoginRequest): Promise<LoginResponse> => {
  if (!data || !data.email || !data.password) {
    throw new APIError('Email and password are required')
  }

  try {
    const response = await http.post<LoginResponse>('/auth/login', data)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw APIError.fromAxiosError(error, 'Failed to login')
    }
    throw new APIError('An unexpected error occurred while logging in')
  }
}