import { AuthUserStatus } from '@libs/common';

export type JwtAccessPayload = {
  sub: string;
  email: string;
  status: AuthUserStatus;
};
