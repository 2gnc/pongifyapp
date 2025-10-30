'use client'

import { useActionState, startTransition, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { banUserAction, BanUserResult } from '../api/banUser.action';
import { BanUserT } from '../model/schema';

export function useBanUser(data: BanUserT, onSuccess?: () => void) {
    const router = useRouter();

    const [banState, banMemberAction, banPending] = useActionState<
        BanUserResult | null,
        BanUserT
    >(
        async (_, data: BanUserT) =>
            banUserAction(data),
        null
    );

    useEffect(() => {
        if (!banState) return;

        if (banState.success) {
            toast.success('Пользователь забанен');
            onSuccess?.();
            router.refresh();
        } else {
            toast.error(`Ошибка при бане: ${banState.error}`);
        }
    }, [banState, router, onSuccess]);

    const banUser = useCallback((reason: string) => {
        startTransition(() => banMemberAction({ ...data, reason }));
    }, [banMemberAction, data]);

    return { action: banUser, isPending: banPending };
}
