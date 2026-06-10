import { AuthUserStatus } from '@libs/common/enums';

export type JwtAccessPayload = {
  sub: string;
  email: string;
  status: AuthUserStatus;
};
