import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { headers } from 'next/headers';
import { SignOutButton } from '@/components/SignOutButton';
import { auth } from '@/libs/Auth';

type IUserProfilePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: IUserProfilePageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'UserProfile',
  });

  return {
    title: t('meta_title'),
  };
}

export default async function UserProfilePage(props: IUserProfilePageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations('UserProfile');

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return <div>Not authenticated</div>;
  }

  return (
    <div className="my-6">
      <h1 className="mb-6 text-2xl font-bold">{t('meta_title')}</h1>

      <div className="max-w-md rounded-lg bg-white p-6 shadow">
        <div className="space-y-4">
          <div>
            <div className="block text-sm font-medium text-gray-700">Name</div>
            <p className="mt-1 text-sm text-gray-900">{session.user.name}</p>
          </div>

          <div>
            <div className="block text-sm font-medium text-gray-700">Email</div>
            <p className="mt-1 text-sm text-gray-900">{session.user.email}</p>
          </div>

          <div>
            <div className="block text-sm font-medium text-gray-700">Email Verified</div>
            <p className="mt-1 text-sm text-gray-900">
              {session.user.emailVerified ? 'Yes' : 'No'}
            </p>
          </div>

          <div>
            <div className="block text-sm font-medium text-gray-700">Member Since</div>
            <p className="mt-1 text-sm text-gray-900">
              {new Date(session.user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-6">
          <SignOutButton locale={locale}>
            Sign Out
          </SignOutButton>
        </div>
      </div>
    </div>
  );
};
