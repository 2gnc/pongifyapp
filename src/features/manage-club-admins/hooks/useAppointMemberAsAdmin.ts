'use client'

import toast from 'react-hot-toast';
import { useActionState, startTransition, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { appointMemberAsAdminAction } from '../api/appointAsAdmin.action';

export function useAppointMemberAsAdmin(clubId: string, userId: string) {
    const router = useRouter();

    const [appointAdminState, appointAdminAction, appointAdminPending] = useActionState<
        { success: boolean } | null,
        { clubId: string; userId: string }
    >(
        async (_, { clubId, userId }: { clubId: string; userId: string }) =>
        appointMemberAsAdminAction(clubId, userId),
        null
    );

    useEffect(() => {
        if (!appointAdminState) return;

        if (appointAdminState.success) {
            toast.success('Пользователь назначен админом');
            router.refresh();
        } else {
            toast.error('Ошибка при назначении админом');
        }
    }, [appointAdminState, router]);

    return {
        action: () => startTransition(() => appointAdminAction({ clubId, userId })),
        isPending: appointAdminPending,
    }
}
