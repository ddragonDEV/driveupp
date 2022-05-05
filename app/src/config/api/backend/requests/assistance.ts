import { Location } from 'providers/Location/models/Location';
import { Assistance } from 'providers/UserAssistance/models/Assistance';
import { backend } from '../instance';
import { ApiResponse } from './models/ApiResponse';

type GetCurrentAssistanceResponse = {
  _id: string;
  createdAt: string;
  destination: { lat: number; lng: number };
  mechanicId: string;
  score: { mechanic: number; user: number };
  status: 'InProcess' | 'Aborted' | 'Cancelled' | 'Completed';
  updatedAt: string;
  userId: string;
};

export const getCurrentAssistance = async (): Promise<
  (Assistance & { userLocation: Location }) | void
> => {
  const response = await backend.get<ApiResponse<GetCurrentAssistanceResponse>>(
    'assistance/current',
  );

  const {
    data: {
      headerResponse: { code },
      payload,
    },
  } = response;

  if (code !== 200) {
    throw code;
  }

  if (payload.status !== 'InProcess') {
    return;
  }

  return {
    idAssistance: payload._id,
    idMechanic: payload.mechanicId,
    idUser: payload.userId,
    userLocation: {
      latitude: payload.destination.lat,
      longitude: payload.destination.lng,
    },
  };
};

type RateAssistanceResponse = {
  destination: {
    lat: number;
    lng: number;
  };
  destinationAddress: {
    city: string;
    postcode: string;
    country: string;
    country_code: string;
  };
  score: {
    user: number;
    mechanic: number;
  };
  _id: string;
  userId: string;
  mechanicId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export const rateAssistance = async ({
  data: { assistanceId, punctuation },
}: {
  data: { assistanceId: string; punctuation: number };
}) => {
  const response = await backend.post<ApiResponse<RateAssistanceResponse>>(
    'assistance/rate',
    {
      score: punctuation,
      id_assistance: assistanceId,
    },
  );

  const {
    data: {
      headerResponse: { code, message },
    },
  } = response;

  if (code !== 200) {
    console.log('rate assistance error', code, message);
    throw code;
  }

  return true;
};

export const sendLocation = async ({ data }: { data: Location }) => {
  const response = await backend.post<ApiResponse<{}>>(
    'user/current-assistance/send-location',
    data,
  );

  const {
    data: {
      headerResponse: { code, message },
    },
  } = response;

  if (code !== 200) {
    console.log('send location error', code, message);
    throw code;
  }

  return true;
};
