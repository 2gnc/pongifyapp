'use client'

import { type FC, startTransition, useEffect, useRef, useTransition } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormRow } from '@gravity-ui/components';
import { TextInput, TextArea, Switch, Button, Text } from '@gravity-ui/uikit';
import { useTranslations } from 'next-intl';
import { clubCreateRawSchema, ClubCreateRawSchemaT, createClubFormDefaultValues } from '@/entities/club'

type Props = {}

export const ClubCreateForm: FC<Props> = ({ }) => {
    const t = useTranslations('i18n');
    const [isPending, startTransition] = useTransition();
    const rawRef = useRef<HTMLSpanElement | null>(null);

     useEffect(() => {
        const el = rawRef.current;
        if (!el) return;
        // HTML attributes (lowercase names are safer)
        el.setAttribute('autocapitalize', 'off');
        el.setAttribute('autocorrect', 'off'); // iOS
        el.spellcheck = false;
    }, []);

    const { register, handleSubmit, formState: { errors }, reset, control } = useForm<ClubCreateRawSchemaT>({
        resolver: zodResolver(clubCreateRawSchema),
        defaultValues: createClubFormDefaultValues,
    });

    const onSubmit = (data: ClubCreateRawSchemaT) => {
        const admins = data.adminsRaw
            ? data.adminsRaw
                .split(',')
                .map((s) => s.trim().replace(/^@/, ''))
                .filter(Boolean)
            : [];

        delete data.adminsRaw;

        startTransition(async () => {
            console.log('✅✅✅ ', {...data, admins });
            setTimeout(() => {
                toast.success('🤡 done!');
            }, 1000);
            // await createClubAction(data); // ✅ formData типизировано
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
            <Text className="block mt-4 mb-4" color="secondary" variant="caption-2">{t('club-create.adminsText')}</Text>
            <FormRow label={t('club-create.adminsLabel')} direction="column">
                <TextArea
                    {...register('adminsRaw')}
                    validationState={errors.name && 'invalid'}
                    errorMessage={errors.name?.message}
                    errorPlacement="outside"
                    minRows={2}
                    placeholder="tgUsername1, tgUsername2"
                    ref={(el) => {
                        register('adminsRaw').ref?.(el);
                        rawRef.current = el;
                    }}
                />
            </FormRow>
            <Button type="submit" size="l" view="action" disabled={isPending} loading={isPending}>{t('club-create.submitButton')}</Button>
        </form>
    )
}
