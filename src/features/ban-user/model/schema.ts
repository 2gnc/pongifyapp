import { z } from 'zod';

export const banUserSchema = z.object({
  userId: z.string(),
  clubId: z.string(),
  reason: z.string().max(200).optional(),
  bannedById: z.string(), // id администратора/владельца, который банит
});

export type BanUserT = z.infer<typeof banUserSchema>;
