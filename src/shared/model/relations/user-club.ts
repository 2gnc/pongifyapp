import { z } from 'zod';
import { UserBaseSchema } from '@/entities/user';
import { ClubBaseSchema } from '@/entities/club';

// Ленивые версии
export const UserFrontSchema: z.ZodType<any> = UserBaseSchema.extend({
    ownedClub: z.lazy(() => ClubFrontSchema.nullable()),
    memberships: z.object({
        admin: z.array(z.lazy(() => ClubFrontSchema)),
        member: z.array(z.lazy(() => ClubFrontSchema)),
    }),
});

export const ClubFrontSchema: z.ZodType<any> = ClubBaseSchema.extend({
    admins: z.array(z.lazy(() => UserFrontSchema)).optional(),
    members: z.array(z.lazy(() => UserFrontSchema)).optional(),
    bans: z.array(z.lazy(() => UserFrontSchema)).optional(),
});

export type UserFront = z.infer<typeof UserFrontSchema>;
export type ClubFront = z.infer<typeof ClubFrontSchema>;
