import { AuthUserStatus } from '@libs/common/enums';

export type AuthRegisterRequest = {
  email: string;
  password: string;
  userAgent?: string;
  ipAddress?: string;
};

export type AuthUserResponse = {
  id: string;
  email: string;
  status: AuthUserStatus;
};

export type AuthTokenResponse = {
  accessToken: string;
  refreshToken: string;
  user: AuthUserResponse;
};
