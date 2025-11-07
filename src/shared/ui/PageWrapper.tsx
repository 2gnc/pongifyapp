import { type FC, type PropsWithChildren } from 'react';

export const PageWrapper: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className='bg-pong-bg-dark text-pong-text h-screen pl-4 pr-4'>{children}</div>
    )
}
