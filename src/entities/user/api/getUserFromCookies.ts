import { cookies } from 'next/headers';
import { UserFrontT, UserFrontSchema } from '@/entities/user';

export async function getUserFromCookies(): Promise<UserFrontT | null> {
    const cookieData = (await cookies()).get('user')?.value;
    if (!cookieData) return null;

    try {
        return UserFrontSchema.parse(JSON.parse(cookieData));
    } catch (_e) {
        return null;
    }
}
