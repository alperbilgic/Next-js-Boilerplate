import { getTranslations } from 'next-intl/server';
import { headers } from 'next/headers';
import { auth } from '@/libs/Auth';

export const Hello = async () => {
  const t = await getTranslations('Dashboard');
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <>
      <h2 className="text-2xl font-bold">
        {`👋 `}
        {session?.user?.email
          ? t('hello_message', { email: session.user.email })
          : t('hello_guest')}
      </h2>
    </>
  );
};
