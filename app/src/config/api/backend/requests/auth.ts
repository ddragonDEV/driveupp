import { removeItem, setItem } from 'helpers/localStorage';
import { EditProfileData } from 'providers/Auth/models/EditProfileData';
import { LoginData } from 'providers/Auth/models/LoginData';
import { RecoveryPasswordData } from 'providers/Auth/models/RecoveryPasswordData';
import { ResetPasswordData } from 'providers/Auth/models/ResetPasswordData';
import { SignUpData } from 'providers/Auth/models/SignUpData';
import { User } from 'providers/Auth/models/User';
import { backend } from '../instance';
import { ApiResponse } from './models/ApiResponse';

export const refreshToken = async () => {
  const response = await backend.post<
    ApiResponse<{ user: User; token: string }>
  >('auth/refresh-token');

  const {
    data: {
      headerResponse: { code },
      payload: { token, user },
    },
  } = response;

  if (code !== 200) {
    throw code;
  }

  setItem('token', token);

  return user;
};

export const login = async ({ data }: { data: LoginData }) => {
  const response = await backend.post<
    ApiResponse<{ user: User; token: string }>
  >('auth/login', data);

  const {
    data: {
      headerResponse: { code },
      payload: { token, user },
    },
  } = response;

  if (code !== 200) {
    throw code;
  }

  setItem('token', token);

  return user;
};

export const logout = async () => {
  const response = await backend.post<ApiResponse<{}>>('auth/logout');

  const {
    data: {
      headerResponse: { code },
    },
  } = response;

  if (code !== 200) {
    throw code;
  }

  removeItem('token');
};

export const signUp = async ({ data }: { data: SignUpData }) => {
  const response = await backend.post<
    ApiResponse<{ emailSentSuccesfully: boolean }>
  >('auth/register', data);

  const {
    data: {
      headerResponse: { code },
      payload: { emailSentSuccesfully },
    },
  } = response;

  if (code !== 200) {
    throw code;
  }

  return emailSentSuccesfully;
};

export const recoveryPassword = async ({
  data,
}: {
  data: RecoveryPasswordData;
}) => {
  const response = await backend.post<
    ApiResponse<{ emailSentSuccesfully: boolean }>
  >('auth/recoveryPassword/email', data);

  const {
    data: {
      headerResponse: { code },
      payload: { emailSentSuccesfully },
    },
  } = response;

  if (code !== 200) {
    throw code;
  }

  return emailSentSuccesfully;
};

export const resetPassword = async ({ data }: { data: ResetPasswordData }) => {
  const response = await backend.post<ApiResponse<{}>>(
    'auth/recoveryPassword/reset',
    data,
  );

  const {
    data: {
      headerResponse: { code },
    },
  } = response;

  if (code !== 200) {
    throw code;
  }

  return true;
};

export const editProfile = async ({ data }: { data: EditProfileData }) => {
  const response = await backend.post<ApiResponse<{}>>('user/update', data);

  const {
    data: {
      headerResponse: { code },
    },
  } = response;

  if (code !== 200) {
    throw code;
  }

  return true;
};
