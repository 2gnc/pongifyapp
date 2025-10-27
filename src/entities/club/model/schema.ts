import { z } from 'zod';

export const clubCreateSchema = z.object({
    name: z.string().min(3, 'Минимум 3 символа'),
    description: z.string().max(300).optional(),
    isOpen: z.boolean(),
});

export type ClubCreateSchemaT = z.infer<typeof clubCreateSchema>;

export const createClubFormDefaultValues = {
    name: "",
    description: "",
    isOpen: false,
    adminsRaw: "",
};

const clubMemberSchema = z.object({
    id: z.string(),
    telegramId: z.string(),
    userName: z.string().nullable(),
    firstName: z.string().nullable(),
    joinedAt: z.union([
        z.date(),
        z.iso.datetime({ offset: true }),
    ]).transform(val => val instanceof Date ? val : new Date(val)),
});

export const ClubFrontSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().nullable(),
    createdAt: z.union([
        z.date(),
        z.iso.datetime({ offset: true }),
    ]).transform(val => val instanceof Date ? val : new Date(val)),
    isOpen: z.boolean(),
    ownerId: z.string(),
    admins: z.array(clubMemberSchema),
    members: z.array(clubMemberSchema),
});

export type ClubFrontT = z.infer<typeof ClubFrontSchema>;
export type ClubMemberFrontT = z.infer<typeof clubMemberSchema>;
