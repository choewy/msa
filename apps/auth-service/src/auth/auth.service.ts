import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { compare, hash } from 'bcrypt';
import { Repository } from 'typeorm';

import { AuthLoginRequest, AuthLogoutRequest, AuthRefreshRequest, AuthRegisterRequest, AuthUserStatus, JwtAccessPayload, JwtRefreshPayload } from '@libs/common';

import { AuthSessionEntity } from './entities/auth-session.entity';
import { AuthUserEntity } from './entities/auth-user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthUserEntity)
    private readonly authUserRepository: Repository<AuthUserEntity>,
    @InjectRepository(AuthSessionEntity)
    private readonly authSessionRepository: Repository<AuthSessionEntity>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(req: AuthRegisterRequest) {
    const exists = await this.authUserRepository.findOne({
      where: { email: req.email },
    });

    if (exists) {
      throw new ConflictException('이미 가입된 이메일입니다.');
    }

    const passwordHash = await hash(req.password, 12);
    const authUser = await this.authUserRepository.save(
      this.authUserRepository.create({
        email: req.email,
        passwordHash,
        status: AuthUserStatus.PENDING_PROFILE,
      }),
    );

    return this.createSessionAndIssueTokens(authUser, {
      userAgent: req.userAgent,
      ipAddress: req.ipAddress,
    });
  }

  async login(req: AuthLoginRequest) {
    const authUser = await this.authUserRepository.findOne({
      where: { email: req.email },
    });

    if (!authUser) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다.');
    }

    const isPasswordValid = await compare(req.password, authUser.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다.');
    }

    return this.createSessionAndIssueTokens(authUser, {
      userAgent: req.userAgent,
      ipAddress: req.ipAddress,
    });
  }

  async refresh(req: AuthRefreshRequest) {
    let payload: JwtRefreshPayload;

    try {
      payload = await this.jwtService.verifyAsync<JwtRefreshPayload>(req.refreshToken, {
        secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
      });
    } catch {
      throw new UnauthorizedException('refresh token이 유효하지 않습니다.');
    }

    const session = await this.authSessionRepository.findOne({
      where: { id: payload.sid, authUserId: payload.sub },
      relations: { authUser: true },
    });

    if (!session) {
      throw new UnauthorizedException('세션을 찾을 수 없습니다.');
    }

    if (session.revokedAt) {
      throw new UnauthorizedException('폐기된 세션입니다.');
    }

    if (session.expiresAt.getTime() < Date.now()) {
      throw new UnauthorizedException('만료된 세션입니다.');
    }

    const isRefreshTokenValid = await compare(req.refreshToken, session.refreshTokenHash);

    if (!isRefreshTokenValid) {
      throw new UnauthorizedException('refresh token이 일치하지 않습니다.');
    }

    return this.rotateRefreshToken(session);
  }

  async logout(req: AuthLogoutRequest) {
    let payload: JwtRefreshPayload;

    try {
      payload = await this.jwtService.verifyAsync<JwtRefreshPayload>(req.refreshToken, {
        secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
      });
    } catch {
      return { success: true };
    }

    await this.authSessionRepository.update(
      {
        id: payload.sid,
        authUserId: payload.sub,
      },
      { revokedAt: () => 'NOW()' },
    );

    return { success: true };
  }

  async completeProfile(authUserId: string) {
    await this.authUserRepository.update({ id: authUserId }, { status: AuthUserStatus.ACTIVE });

    return { success: true };
  }

  private async createSessionAndIssueTokens(authUser: AuthUserEntity, meta: { userAgent?: string; ipAddress?: string }) {
    const expiresAt = this.getRefreshTokenExpiresAt();

    const session = await this.authSessionRepository.save(
      this.authSessionRepository.create({
        authUserId: authUser.id,
        refreshTokenHash: '',
        userAgent: meta.userAgent ?? null,
        ipAddress: meta.ipAddress ?? null,
        expiresAt,
        revokedAt: null,
      }),
    );

    const tokens = await this.issueTokens(authUser, session.id);
    session.refreshTokenHash = await hash(tokens.refreshToken, 12);
    await this.authSessionRepository.save(session);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: this.toAuthUserResponse(authUser),
    };
  }

  private async rotateRefreshToken(session: AuthSessionEntity) {
    const authUser = session.authUser;

    const tokens = await this.issueTokens(authUser, session.id);

    session.refreshTokenHash = await hash(tokens.refreshToken, 12);
    session.expiresAt = this.getRefreshTokenExpiresAt();

    await this.authSessionRepository.save(session);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: this.toAuthUserResponse(authUser),
    };
  }

  private async issueTokens(authUser: AuthUserEntity, sessionId: string) {
    const accessPayload: JwtAccessPayload = {
      sub: authUser.id,
      email: authUser.email,
      status: authUser.status,
    };

    const refreshPayload: JwtRefreshPayload = {
      sub: authUser.id,
      sid: sessionId,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(accessPayload, {
        secret: this.configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
        expiresIn: `${this.configService.get<number>('JWT_ACCESS_EXPIRES_IN_MINUTES') ?? '15'}m`,
      }),
      this.jwtService.signAsync(refreshPayload, {
        secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
        expiresIn: `${this.configService.get<number>('JWT_REFRESH_EXPIRES_IN_DAYS') ?? '7'}d`,
      }),
    ]);

    return { accessToken, refreshToken };
  }

  private getRefreshTokenExpiresAt() {
    const days = Number(this.configService.get<string>('JWT_REFRESH_EXPIRES_IN_DAYS') ?? 7);
    const expiresAt = new Date();

    expiresAt.setDate(expiresAt.getDate() + days);

    return expiresAt;
  }

  private toAuthUserResponse(authUser: AuthUserEntity) {
    return {
      id: authUser.id,
      email: authUser.email,
      status: authUser.status,
    };
  }
}
