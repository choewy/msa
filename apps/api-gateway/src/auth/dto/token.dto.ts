import { ApiProperty } from '@nestjs/swagger';

import { AuthTokenResponse, AuthUserResponse } from '@libs/common';
import { AuthUserStatus } from '@libs/common/enums';

export class AuthUserResponseDTO implements AuthUserResponse {
  @ApiProperty({ type: String })
  id!: string;

  @ApiProperty({ type: String })
  email!: string;

  @ApiProperty({ enum: AuthUserStatus })
  status!: AuthUserStatus;
}

export class AuthTokenResponseDTO implements AuthTokenResponse {
  @ApiProperty({ type: String })
  accessToken!: string;

  @ApiProperty({ type: String })
  refreshToken!: string;

  @ApiProperty({ type: AuthUserResponseDTO })
  user!: AuthUserResponseDTO;
}
