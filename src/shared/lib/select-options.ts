import { useTranslations } from 'next-intl';
import { EventType } from '@/generated/prisma';

export interface SelectOption {
  value: string;
  content: string;
}

/**
 * Хук для получения опций селекта для типов событий с переводами
 */
export function useEventTypeOptions(): SelectOption[] {
  const t = useTranslations('i18n.eventTypes');

  return [
    { value: EventType.DRAFT, content: t('DRAFT') },
    { value: EventType.SEALED, content: t('SEALED') },
    { value: EventType.TWO_PICKS_DRAFT, content: t('TWO_PICKS_DRAFT') },
    { value: EventType.PRERELEASE, content: t('PRERELEASE') },
    { value: EventType.COMMANDER_DRAFT, content: t('COMMANDER_DRAFT') },
    { value: EventType.BUNDLE_SEALED, content: t('BUNDLE_SEALED') },
    { value: EventType.DISPLAY_SEALED, content: t('DISPLAY_SEALED') },
    { value: EventType.COMMANDER_PARTY, content: t('COMMANDER_PARTY') },
    { value: EventType.CUBE_DRAFT, content: t('CUBE_DRAFT') },
    { value: EventType.RAINBOW_DRAFT, content: t('RAINBOW_DRAFT') },
  ];
}