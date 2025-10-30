'use client'

import { useActionState, startTransition, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { unbanUserAction, UnbanUserResult} from '../api/unbanUser.action';
import { UnbanUserT } from '../model/schema';

export function useUnbanUser(data: UnbanUserT, onSuccess?: () => void) {
    const router = useRouter();

    const [unbanState, unbanMemberAction, unbanPending] = useActionState<
        UnbanUserResult | null,
        UnbanUserT
    >(
        async (_, data: UnbanUserT) =>
            unbanUserAction(data),
        null
    );

    useEffect(() => {
        if (!unbanState) return;

        if (unbanState.success) {
            toast.success('Пользователь разбанен');
            onSuccess?.();
            router.refresh();
        } else {
            toast.error(`Ошибка при разбане: ${unbanState.error}`);
        }
    }, [unbanState, router, onSuccess]);

    const unbanUser = useCallback(() => {
        startTransition(() => unbanMemberAction({ ...data }));
    }, [unbanMemberAction, data]);

    return { action: unbanUser, isPending: unbanPending };
}
