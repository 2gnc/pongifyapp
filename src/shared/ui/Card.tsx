
import { type FC, type PropsWithChildren, memo, useCallback } from 'react';
import { Text, Flex } from '@gravity-ui/uikit';

type Props = {
    title: string;
    color?: 'accent' | 'blue-light' | 'blue-med';
    className?: string;
    onClick?: () => void;
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

export const Card: FC<PropsWithChildren<Props>> = memo(({ title, children, color = 'accent', className = '', onClick }) => {
    const bgClass = colorMap[color].bg;
    const textColorClass = colorMap[color].text;
    const animationClass = onClick ? 'transition-all duration-75 cursor-pointer active:scale-95 active:shadow-sm' : ''

    const handleClick = useCallback((event: React.MouseEvent<'div'>) => {
        event.preventDefault();
        onClick?.();
    }, [onClick]);

    return (
        <Flex
            direction='column'
            className={`${bgClass} ${className} ${textColorClass} shadow-md rounded-xl p-2 pt-4 pb-4 ${animationClass}`}
            gap={2}
            onClick={handleClick}
        >
            <Text variant='subheader-3' style={{ lineHeight: '110%' }}>{title}</Text>
            {children}
        </Flex>
    );
});

Card.displayName = 'Card';