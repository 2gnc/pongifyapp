
import { type FC, type PropsWithChildren } from 'react';
import { Text, Flex } from '@gravity-ui/uikit';

type Props = {
    title: string;
    color?: 'accent' | 'blue-light' | 'blue-med';
    className?: string;
};

const colorMap = {
    'accent': {
        bg: 'bg-pong-accent',
        text: 'text-white'
    },
    'blue-light': {
        bg: 'bg-pong-blue-light',
        text: 'text-pong-text'
    },
    'blue-med': {
        bg: 'bg-pong-blue-med',
        text: 'text-pong-text'
    }
} as const;

export const Card: FC<PropsWithChildren<Props>> = ({ title, children, color = 'accent', className = '' }) => {
    const bgClass = colorMap[color].bg;
    const textColorClass = colorMap[color].text;

    return (
        <Flex direction='column' className={`${bgClass} ${className} ${textColorClass} shadow-md rounded-xl p-2`} gap={2}>
            <Text variant='subheader-3'>{title}</Text>
            {children}
        </Flex>
    );
};