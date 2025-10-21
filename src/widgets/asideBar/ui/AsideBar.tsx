'use client';

import { UserFront } from '@/entities/user';
import { useEffect, type FC } from 'react';
import { ClientDevTools } from '@/shared/devtools';

type Props = {
    user: UserFront;
}

export const AsideBar: FC<Props> = ({ user }) => {
    console.log({ user })
    return (
        <>
            <ClientDevTools />
            <h1>aside</h1>
            <p>{JSON.stringify(user)}</p>
        </>
    )
}
