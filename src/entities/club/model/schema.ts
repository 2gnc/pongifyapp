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

// export const ClubSchema = z.object({
//     id: z.string(),
//     name: z.string(),
//     description: z.string(),
//     createdAt: z.union([
//         z.date(),
//         z.iso.datetime({ offset: true }),
//     ]).transform(val => val instanceof Date ? val : new Date(val)),
//     isOpen: z.boolean(),
//     ownerId: z.string(),
// });

// export type ClubFront = z.infer<typeof ClubSchema>;

export const ClubBaseSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  createdAt: z.union([
    z.date(),
    z.string().datetime({ offset: true }),
  ]).transform(val => val instanceof Date ? val : new Date(val)),
  isOpen: z.boolean(),
  ownerId: z.string(),
});

export type ClubBase = z.infer<typeof ClubBaseSchema>;
