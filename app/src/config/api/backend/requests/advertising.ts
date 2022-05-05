import { backend } from '../instance';
import { ApiResponse } from './models/ApiResponse';

export const getAdvertisements = async () => {
  const response = await backend.get<ApiResponse<[]>>('advertising/list');

  const {
    data: {
      headerResponse: { code },
      payload,
    },
  } = response;

  if (code !== 200) {
    throw code;
  }

  return payload;
};
