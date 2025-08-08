import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { headers } from 'next/headers';
import { SignOutButton } from '@/components/SignOutButton';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
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
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>{t('meta_title')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label>Name</Label>
            <p className="text-sm">{session.user.name}</p>
          </div>
          <div className="space-y-1">
            <Label>Email</Label>
            <p className="text-sm">{session.user.email}</p>
          </div>
          <div className="space-y-1">
            <Label>Email Verified</Label>
            <p className="text-sm">{session.user.emailVerified ? 'Yes' : 'No'}</p>
          </div>
          <div className="space-y-1">
            <Label>Member Since</Label>
            <p className="text-sm">{new Date(session.user.createdAt).toLocaleDateString()}</p>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-6">
          <SignOutButton locale={locale}>Sign Out</SignOutButton>
        </CardFooter>
      </Card>
    </div>
  );
};
