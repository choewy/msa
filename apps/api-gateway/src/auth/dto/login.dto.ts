import { createZodDto } from 'nestjs-zod';
import z from 'zod';

const LoginRequestSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export class LoginRequestDTO extends createZodDto(LoginRequestSchema) {}
