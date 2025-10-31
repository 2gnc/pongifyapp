'use client'

import { type FC } from 'react';
import { NavButton } from './NavButton';

export const Navigation: FC = () => {
    return (
        <NavButton handleClick={console.log} />
    );
}
