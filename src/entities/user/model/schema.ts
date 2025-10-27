import { z } from 'zod';

export const userRoleSchema = z.enum(['ADMIN', 'MEMBER', 'OWNER']);

const userClubMembershipSchema = z.object({
    clubId: z.string(),
    clubName: z.string(),
});

export const UserFrontSchema = z.object({
  id: z.string(),
  telegramId: z.string(),
  userName: z.string().nullable(),
  firstName: z.string().nullable(),
  canCreateClub: z.boolean(),
  ownedClub: userClubMembershipSchema.nullable(),
  admin: z.array(userClubMembershipSchema),
  member: z.array(userClubMembershipSchema),
});

export type UserFrontT = z.infer<typeof UserFrontSchema>;
