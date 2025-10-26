import { cookies } from 'next/headers';
import { UserFront, UserFrontSchema } from '@/entities/user';

export async function getUserFromCookies(): Promise<UserFront | null> {
    const cookieData = (await cookies()).get('user')?.value;
    if (!cookieData) return null;

    try {
        return UserFrontSchema.parse(JSON.parse(cookieData));
    } catch (_e) {
        return null;
    }
}
