const BASE_URL = process.env.NEXT_PUBLIC_MOS_API_URL || 'https://apidata.mos.ru/v1';
const API_KEY = process.env.NEXT_PUBLIC_MOS_API_KEY || '';

export const apiConfig = {
  BASE_URL,
  API_KEY,
};
