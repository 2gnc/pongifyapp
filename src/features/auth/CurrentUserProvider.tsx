'use client'

import { createContext, useContext } from 'react';
import { UserFrontT } from '@/entities/user';

const UserContext = createContext<UserFrontT | null>(null);

export const useCurrentUser = () => useContext(UserContext);

export function CurrentUserProvider({ value, children }: { value: UserFrontT | null, children: React.ReactNode }) {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
