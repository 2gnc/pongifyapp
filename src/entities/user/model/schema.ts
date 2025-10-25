import { z } from 'zod';

import { ClubFront, ClubSchema } from '@/entities/club';


export const UserFrontSchema = z.object({
    id: z.string(),
    telegramId: z.string(),
    userName: z.string().nullable(),
    firstName: z.string().nullable(),
    canCreateClub: z.boolean(),
    ownedClub: ClubSchema.nullable(),
    memberships: z.object({
        admin: z.array(ClubSchema),
        member: z.array(ClubSchema),
    })
});

export type UserFront = z.infer<typeof UserFrontSchema>;
