'use client';

import { useActionState, startTransition, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { demoteMemberFromAdminAction } from '../api/demoteFromAdmin.action';

export function useDemoteMemberFromAdmin(clubId: string, userId: string) {
    const router = useRouter();

    const [demoteState, demoteAction, demotePending] = useActionState<
        { success: boolean } | null,
        { clubId: string; userId: string }
    >(
        async (_, { clubId, userId }: { clubId: string; userId: string }) =>
            demoteMemberFromAdminAction(clubId, userId),
        null
    );

    useEffect(() => {
        if (!demoteState) return;

        if (demoteState.success) {
            toast.success('Роль администратора снята');
            router.refresh();
        } else {
            toast.error('Ошибка при снятии роли администратора');
        }
    }, [demoteState, router]);

    return {
        action: () => startTransition(() => demoteAction({ clubId, userId })),
        isPending: demotePending,
    };
}
