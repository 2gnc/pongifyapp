
import { InitDataProvider } from "@/components/InitDataprovider";
import { verifyTelegramInitData } from "@/entities/user/model/telegram-init-data";
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import ErrorPage from './error';
import { getUserWithOwnedClub, createUser } from '@/entities/user';


export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const params = await searchParams;
  const initData = params.initData;
  const cookiesData = await cookies();
  const user = cookiesData.get('user')?.value;

  if (!initData || !user) {
    return <InitDataProvider />;
  }

  try {
      const tgData = verifyTelegramInitData(initData);
      const tgUserData = JSON.parse(tgData.user);
      const telegramId = tgUserData.id?.toString();
  
      const userWithClub = await getUserWithOwnedClub(telegramId);
  
      if (!userWithClub) {
        await createUser({
          telegramId,
          userName: tgUserData?.username,
          firstName: tgUserData?.first_name,
        });
        redirect('/clubs');
      }

      const club = userWithClub.ownedClub?.id;

      if (club) {
        redirect(`/clubs/${club}`);
      } else {
        redirect(`/clubs/create`);
      }
    } catch (err) {
      if (err?.digest?.startsWith('NEXT_REDIRECT')) throw err;
      return <ErrorPage error={{ message: JSON.stringify(err), name: ''}} />
    }
}
