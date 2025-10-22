
import { InitDataProvider } from "@/components/InitDataprovider";
import { verifyTelegramInitData } from "@/entities/user/model/telegram-init-data";
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import ErrorPage from './error';
import { getUserWithOwnedClub, createUser, UserFront } from '@/entities/user';


export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const cookieData = (await cookies()).get('user')?.value;

  if (cookieData) {

    const userData: UserFront = JSON.parse(cookieData)

    if (!userData.canCreateClub) {
      redirect('/clubs');
    }

    const club = userData.ownedClub?.id;

    redirect(club ? `/clubs/${club}` : '/clubs/create');
  }

  const params = await searchParams;
  const initData = params.initData;

  if (!initData) {
    return <InitDataProvider />;
  }

  redirect(`/api/init-user?initData=${encodeURIComponent(initData)}`);
}
