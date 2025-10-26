import { cookies } from 'next/headers';
import { UserFront } from '../model/schema';

export async function updateUserCookie(user: UserFront | null) {
    const cookieStore = await cookies();

    if (!user) {
        cookieStore.set('user', '', { expires: new Date(0), path: '/' });
    };

    cookieStore.set('user', JSON.stringify(user), { httpOnly: true, maxAge: 60 * 60 * 24 * 7, path: '/' });
}
