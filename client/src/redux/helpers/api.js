import axios from 'axios';

export const UNEXPECTED_ERROR = {
  message: 'Unexpected error occured',
  status: 500,
};

export const extractErrorPayload = (error) =>
  typeof error.response.data === 'string' ? UNEXPECTED_ERROR : error.response.data;

export const baseURL = ''; // Example baseURL would be /api/v1

export const api = axios.create({
  baseURL,
});
