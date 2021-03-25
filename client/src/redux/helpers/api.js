import axios from 'axios';

export const UNEXPECTED_ERROR = {
  message: 'Unexpected error occured',
  status: 500,
};

export const extractErrorPayload = (error) => {
  const { data } = error.response;
  // Checks if the recieved error follows the API format, otherwise fall back to Unexpected error.
  return typeof data === 'object' && data.message ? data : UNEXPECTED_ERROR;
};

export const baseURL = ''; // Example baseURL would be /api/v1

export const api = axios.create({
  baseURL,
});
