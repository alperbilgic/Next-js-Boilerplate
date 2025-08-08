import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ResetPasswordForm } from '@/components/ResetPasswordForm';

type IResetPasswordPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: IResetPasswordPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'ResetPassword',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function ResetPasswordPage(props: IResetPasswordPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return <ResetPasswordForm locale={locale} />;
};
