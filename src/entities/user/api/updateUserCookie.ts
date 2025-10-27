import { cookies } from 'next/headers';
import { UserFrontT } from '@/entities/user';

export async function updateUserCookie(user: UserFrontT | null) {
    const cookieStore = await cookies();

    if (!user) {
        cookieStore.set('user', '', { expires: new Date(0), path: '/' });
    };

    cookieStore.set('user', JSON.stringify(user), { httpOnly: true, maxAge: 60 * 60 * 24 * 7, path: '/' });
}
