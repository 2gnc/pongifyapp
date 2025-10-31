'use client'

import { useActionState, startTransition, useEffect, useCallback } from 'react';
import { judgeAllows } from './judge.server';
import type { JudgeRulingRequest } from '../model/rulings';

export function useJudge(request: JudgeRulingRequest) {
    const [permission, judgeAction, isPending] = useActionState(
        async (_: unknown, request: JudgeRulingRequest) => {
            try {
                return await judgeAllows(request);
            } catch (error) {
                console.error('Judge ruling error:', error);
                return false;
            }
        },
        false
    );

    // Стабильная ссылка на функцию judgeAction
    const stableJudgeAction = useCallback(
        (req: JudgeRulingRequest) => judgeAction(req),
        []
    );

    // Автоматический запуск при изменении параметров
    useEffect(() => {
        startTransition(() => {
            stableJudgeAction(request);
        });
    }, [request, stableJudgeAction]);

    return {
        loading: isPending,
        permission,
        checkPermission: stableJudgeAction
    };
}
