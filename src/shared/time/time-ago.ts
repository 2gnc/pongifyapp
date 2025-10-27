import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

export function timeAgo(isoString: string) {
  return formatDistanceToNow(new Date(isoString), {
    addSuffix: true,
    locale: ru,
  });
}
