'use client'

import { type FC, useTransition } from 'react';
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormRow } from '@gravity-ui/components';
import { TextInput, TextArea, Switch, Button, Text } from '@gravity-ui/uikit';
import { useTranslations } from 'next-intl';
import { clubCreateSchema, ClubCreateSchemaT, createClubFormDefaultValues } from '@/entities/club';
import { clubCreateAction } from '@/features/club-create';

type Props = {}

export const ClubCreateForm: FC<Props> = ({ }) => {
    const t = useTranslations('i18n');
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const { register, handleSubmit, formState: { errors }, reset, control } = useForm<ClubCreateSchemaT>({
        resolver: zodResolver(clubCreateSchema),
        defaultValues: createClubFormDefaultValues,
    });

    const onSubmit = (data: ClubCreateSchemaT) => {
        startTransition(async () => {
            const result = await clubCreateAction(data);
            if (result.success && result.data) {
                toast.success(t('club-create.successMsg', { club: result.data?.name}));

                router.push(`/clubs/${result.data.id}`);
            } else {
                toast.error(t('club-create.errorMsg'));
            }
            reset();
        });
    };

    return (
        <form className='mt-4' onSubmit={handleSubmit(onSubmit)}>
            <FormRow label={t('club-create.name')} direction="column" required>
                <TextInput
                    {...register('name')}
                    validationState={errors.name && 'invalid'}
                    placeholder={t('club-create.namePlaceholder')}
                    errorMessage={errors.name?.message}
                    errorPlacement="outside"
                />
            </FormRow>
            <FormRow label={t('club-create.description')} direction="column">
                <TextArea
                    {...register('description')}
                    validationState={errors.name && 'invalid'}
                    errorMessage={errors.name?.message}
                    errorPlacement="outside"
                    minRows={2}
                    placeholder={t('club-create.descriptionPlaceholder')}
                />
            </FormRow>
            <FormRow label={t('club-create.isOpen')}>
                <Controller
                    name="isOpen"
                    control={control}
                    render={({ field }) => (
                        <Switch
                            size="l"
                            checked={field.value}
                            onChange={(event) => field.onChange(event.target.checked)}
                        />
                    )}
                />
            </FormRow>
            <Button type="submit" size="l" view="action" disabled={isPending} loading={isPending}>{t('club-create.submitButton')}</Button>
        </form>
    )
}
