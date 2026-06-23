import axiosInstance from "./axiosInstance";
import { ApiResponse, ProblemDetails } from "../../types/common.types";
import axios from "axios";

class ApiService {
  async get<T>(url: string, params?: Record<string, unknown>): Promise<T> {
    const response = await axiosInstance.get<ApiResponse<T>>(url, { params });
    return response.data.data;
  }

  async post<T>(url: string, data: unknown): Promise<T> {
    const response = await axiosInstance.post<ApiResponse<T>>(url, data);
    return response.data.data;
  }

  async put<T>(url: string, data: unknown): Promise<T> {
    const response = await axiosInstance.put<ApiResponse<T>>(url, data);
    return response.data.data;
  }

  async patch<T>(url: string, data: unknown): Promise<T> {
    const response = await axiosInstance.patch<ApiResponse<T>>(url, data);
    return response.data.data;
  }

  async delete<T>(url: string): Promise<T> {
    const response = await axiosInstance.delete<ApiResponse<T>>(url);
    return response.data.data;
  }

  handleError(error: unknown): ProblemDetails {
    if (axios.isAxiosError(error)) {
      const problemDetails: ProblemDetails = error.response?.data || {
        type: "unknown",
        title: "Unknown Error",
        status: 500,
        detail: "An unknown error occurred",
        instance: "",
      };
      return problemDetails;
    }
    return {
      type: "client-error",
      title: "Client Error",
      status: 500,
      detail: "A client-side error occurred",
      instance: "",
    };
  }
}

export const apiService = new ApiService();
