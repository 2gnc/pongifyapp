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
};
