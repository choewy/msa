import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const RegisterRequestSchema = z
  .object({
    email: z.email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(1),
    name: z.string().trim().min(1),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: '비밀번호가 같지 않습니다',
  });

export class RegisterRequestDTO extends createZodDto(RegisterRequestSchema) {}
