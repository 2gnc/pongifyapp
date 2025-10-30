import { useEffect, type FC } from 'react';
import { TextArea, Text } from '@gravity-ui/uikit';
import { useForm, Controller, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BanUserFormT, banUserFormSchema } from '../model/schema';

type Props = {
    isPending: boolean;
    // userName: string;
    onSubmit: () => void;
    // formMethods: UseFormReturn<BanUserFormT>;
}

export const BanUserForm: FC<Props> = ({ isPending, onSubmit }) => {
    const formMethods = useForm<BanUserFormT>({
        resolver: zodResolver(banUserFormSchema),
        defaultValues: { reason: '' },
    });

    const { control, handleSubmit, reset } = formMethods;

    useEffect(() => {
        return () => reset();
    }, [reset])

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            // className='p-4'
            onKeyDown={(e) => e.stopPropagation()}
        >
            {/* <Text color="primary" variant="subheader-3">{`Забанить участника ${userName} в клубе?`}</Text> */}
            <Text className="block mt-1 mb-2" color="secondary" variant="caption-2">Он не сможет участвовать в событиях клуба и просматривать информацию о нем. Если передумаете - можно разбанить.</Text>
            <Controller
                name="reason"
                control={control}
                render={({ field }) => (
                    <TextArea
                        {...field}
                        className='mb-8 mt-2'
                        hasClear
                        placeholder="Причина бана"
                        minRows={2}
                        disabled={isPending}
                        autoFocus
                    />
                )}
            />
        </form>
    );
};
