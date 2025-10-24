import { z } from 'zod';

export const clubCreateRawSchema = z.object({
    name: z.string().min(3, 'Минимум 3 символа'),
    description: z.string().max(300).optional(),
    isOpen: z.boolean(),
    adminsRaw: z.string().optional(),
});

export const clubCreateSchema = z.object({
    name: z.string().min(3, 'Минимум 3 символа'),
    description: z.string().max(300).optional(),
    isOpen: z.boolean(),
    admins: z.array(z.string()),
});

export type ClubCreateRawSchemaT = z.infer<typeof clubCreateRawSchema>;
export type ClubCreateSchemaT = z.infer<typeof clubCreateSchema>;

export const createClubFormDefaultValues = {
    name: "",
    description: "",
    isOpen: false,
    adminsRaw: "",
};

