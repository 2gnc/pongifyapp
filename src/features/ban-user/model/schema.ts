import { z } from 'zod';

export const banUserSchema = z.object({
    userId: z.string(),
    userName: z.string(),
    clubId: z.string(),
    reason: z.string().max(200).optional(),
    bannedById: z.string().optional(), // id администратора/владельца, который банит
});

export const banUserFormSchema = z.object({
    reason: z.string().min(1, "Причина бана обязательна").max(200),
});

export type BanUserT = z.infer<typeof banUserSchema>;
export type BanUserFormT = z.infer<typeof banUserFormSchema>;
