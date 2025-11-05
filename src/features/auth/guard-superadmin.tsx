'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { getUserFromCookies } from '@/entities/user/api/getUserFromCookies';
import { check } from 'zod';

export async function guardSuperAdmin() {
  const user = await getUserFromCookies();
  const superAdminId = process.env.SUPERADMIN;
  
  if (!user || !superAdminId || user.id !== superAdminId) {
    redirect('/');
  }
  
  return true;
}

export async function checkIsSuperAdmin() {
  const user = await getUserFromCookies();
  return user?.id === process.env.SUPERADMIN;
}
