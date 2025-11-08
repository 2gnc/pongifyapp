'use client'

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { EventTabEnum } from '@/widgets/eventsList';

export type NavigateMethods = {
  // Базовые методы
  goBack: () => void;
  goToHome: () => void;
  goToClubList: () => void;
  goToClubCreate: () => void;
  goToSuperAdmin: () => void;
  
  // Методы для работы с клубами
  goToClubDetail: (clubId: string) => void;
  goToClubMembers: (clubId: string, tab?: 'admins' | 'members' | 'bans') => void;
  goToClubEvents: (clubId: string, tab?: EventTabEnum) => void;
  goToCreateEvent: (clubId: string) => void;
};

/**
 * Хук для инкапсуляции логики навигации в приложении
 * @returns объект с методами для переходов между страницами
 */
export const useNavigate = (): NavigateMethods => {
  const router = useRouter();

  // Базовые методы навигации
  const goBack = useCallback(() => {
    router.back();
  }, [router]);

  const goToHome = useCallback(() => {
    router.push('/');
  }, [router]);

  const goToClubList = useCallback(() => {
    router.push('/clubs');
  }, [router]);

  const goToClubCreate = useCallback(() => {
    router.push('/clubs/create');
  }, [router]);

  const goToSuperAdmin = useCallback(() => {
    router.push('/superadmin');
  }, [router]);

  // Методы для работы с клубами
  const goToClubDetail = useCallback((clubId: string) => {
    router.push(`/clubs/${clubId}`);
  }, [router]);

  const goToClubMembers = useCallback((clubId: string, tab: 'admins' | 'members' | 'bans' = 'members') => {
    router.push(`/clubs/${clubId}/members?tab=${tab}`);
  }, [router]);

  const goToClubEvents = useCallback((clubId: string, tab: EventTabEnum = EventTabEnum.FUTURE) => {
    router.push(`/clubs/${clubId}/members?tab=${tab}`);
  }, [router]);

  const goToCreateEvent = useCallback((clubId: string) => {
    router.push(`/clubs/${clubId}/events/create`);
  }, [router]);

  return {
    goBack,
    goToHome,
    goToClubList,
    goToClubCreate,
    goToSuperAdmin,
    goToClubDetail,
    goToClubMembers,
    goToClubEvents,
    goToCreateEvent,
  };
};