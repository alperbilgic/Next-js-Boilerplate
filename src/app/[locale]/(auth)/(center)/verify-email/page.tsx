import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { EmailVerification } from '@/components/EmailVerification';

type IVerifyEmailPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: IVerifyEmailPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'VerifyEmail',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function VerifyEmailPage(props: IVerifyEmailPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return <EmailVerification locale={locale} />;
};
