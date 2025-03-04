import { apiConfig } from './config';
import {
  GetFilteredMarkersParams,
  GetFilteredMarkersResponse,
  GetMarkersResponse
} from './data-contracts';

export class ApiClient {
  private async request<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    const url = new URL(`${apiConfig.BASE_URL}/${endpoint}`);
    
    url.searchParams.set('api_key', apiConfig.API_KEY);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, value);
      });
    }

    try {
      const response = await fetch(url.toString());
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async getFoodMarkers(): Promise<GetMarkersResponse> {
    return this.request(
      "features/1903"
    );
  }

  async getFilteredFoodMarkers({ filters }: GetFilteredMarkersParams): Promise<GetFilteredMarkersResponse> {
    const queryParams: Record<string, string> = {};
    const filterConditions = [];

    if (filters.isNetObject !== undefined) {
      filterConditions.push(`IsNetObject eq ${filters.isNetObject}`);
    }

    if (filters.typeObject) {
      filterConditions.push(`TypeObject eq '${filters.typeObject}'`);
    }

    if (filters.operatingCompany) {
      filterConditions.push(`OperatingCompany eq '${filters.operatingCompany}'`);
    }

    if (filterConditions.length > 0) {
      queryParams['$filter'] = filterConditions.join(' and ');
    }

    return this.request(
      "datasets/1903/rows",
      queryParams
    );
  }
}

export const apiClient = new ApiClient();
