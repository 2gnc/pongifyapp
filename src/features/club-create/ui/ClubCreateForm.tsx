'use client'

import { type FC, startTransition, useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormRow } from '@gravity-ui/components';
import { TextInput, TextArea, Switch, Button } from '@gravity-ui/uikit';
import { useTranslations } from 'next-intl';
import { clubCreateSchema, ClubCreateSchemaT, createClubFormDefaultValues } from '@/entities/club'

type Props = {}

export const ClubCreateForm: FC<Props> = ({ }) => {
    const t = useTranslations('i18n');
    const [isPending, startTransition] = useTransition();

    const { register, handleSubmit, formState: { errors }, reset, control } = useForm<ClubCreateSchemaT>({
        resolver: zodResolver(clubCreateSchema),
        defaultValues: createClubFormDefaultValues,
    });

    const onSubmit = (data: ClubCreateSchemaT) => {
        startTransition(async () => {
            console.log('✅✅✅ ', data);
            // await createClubAction(data); // ✅ formData типизировано
            reset();
        });
    };

    console.log(errors.name)

    return (
        <form className='mt-8' onSubmit={handleSubmit(onSubmit)}>
            <FormRow label={t('club-create.name')} direction="column" required>
                <TextInput
                    {...register('name')}
                    validationState={errors.name && 'invalid'}
                    placeholder={t('club-create.namePlaceholder')}
                    errorMessage={errors.name?.message}
                    errorPlacement="outside"
                />
            </FormRow>
            <FormRow label={t('club-create.description')} direction="column" required>
                <TextArea minRows={2} {...register('description')} placeholder={t('club-create.descriptionPlaceholder')} />
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
            <Button type="submit" size="l" view="action" disabled={isPending} loading={isPending}>Создать</Button>
        </form>
    )
}
