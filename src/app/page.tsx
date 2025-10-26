
import { InitDataProvider } from "@/components/InitDataprovider";
import { verifyTelegramInitData } from "@/entities/user/model/telegram-init-data";
import { redirect } from 'next/navigation';
import ErrorPage from './error';
import { createUser, getUserFromCookies } from '@/entities/user';
import { type UserFront } from '@/shared/model'


export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const userData = await getUserFromCookies();

  if (userData) {
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
