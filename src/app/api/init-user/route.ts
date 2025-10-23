import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyTelegramInitData } from '@/entities/user/model/telegram-init-data';
import { getUserWithClubs, createUser } from '@/entities/user';

export async function GET(req: Request) {
    const cookieStore = await cookies();
    cookieStore.set('user', '', { expires: new Date(0), path: '/' });

    const { searchParams, origin } = new URL(req.url);
    const initData = searchParams.get('initData');

    if (!initData) return NextResponse.redirect('/');

    const tgData = verifyTelegramInitData(initData);
    const tgUserData = JSON.parse(tgData.user);
    const telegramId = tgUserData.id?.toString();

    const userWithClub = await getUserWithClubs(telegramId);
    let user = userWithClub;

    if (!userWithClub) {
        const newUser = await createUser({
        telegramId,
        userName: tgUserData.username,
        firstName: tgUserData.first_name,
        });
        user = { ...newUser, ownedClub: null };
  }

  // Сохраняем юзера в куку
  const response = NextResponse.redirect(
    user?.ownedClub ? `${origin}/clubs/${user.ownedClub.id}` : `${origin}/clubs/create`
  );

  response.cookies.set({
    name: 'user',
    value: JSON.stringify(user),
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // неделя
  });

  return response;
}
