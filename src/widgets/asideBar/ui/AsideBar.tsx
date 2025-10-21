'use client';

import { UserFront } from '@/entities/user';
import type { FC } from 'react';

type Props = {
    user: UserFront;
}

export const AsideBar: FC<Props> = ({ user }) => {
    return (
        <>
            <h1>aside</h1>
            <p>{user.userName}</p>
        </>
    )
}
