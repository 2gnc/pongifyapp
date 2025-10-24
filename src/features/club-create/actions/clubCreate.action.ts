'use server';

import { clubCreateSchema, ClubCreateSchemaT } from '@/entities/club/model/schema';
import { revalidatePath } from 'next/cache';

export async function createClubAction(formData: ClubCreateSchemaT) {
  const parsed = clubCreateSchema.safeParse(formData);

  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((e) => e.message).join(', '));
  }

  const data = parsed.data;

  // 💾 Пример сохранения в БД
  // const newClub = await db.club.create({ data });

  console.log('✅ Created club:', data);

  revalidatePath('/clubs');
  return { success: true, data };
}
