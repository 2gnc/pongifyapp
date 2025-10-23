import { type FC, type PropsWithChildren } from 'react';

export const PageWrapper: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className='p-4 '>{children}</div>
    )
}
