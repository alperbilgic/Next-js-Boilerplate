'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { verifyEmail } from '@/libs/AuthClient';

type EmailVerificationProps = {
  locale: string;
};

export function EmailVerification({ locale }: EmailVerificationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get('token');
    let timeoutId: NodeJS.Timeout;

    if (!token) {
      // Use a separate effect to avoid direct setState in useEffect
      Promise.resolve().then(() => {
        setStatus('error');
        setError('Verification token is missing.');
      });
      return;
    }

    const verify = async () => {
      try {
        const result = await verifyEmail({ query: { token } });

        if (result.error) {
          setStatus('error');
          setError(result.error.message || 'Verification failed');
          return;
        }

        setStatus('success');

        // Redirect to dashboard after 3 seconds
        timeoutId = setTimeout(() => {
          const dashboardUrl = locale === 'en' ? '/dashboard' : `/${locale}/dashboard`;
          router.push(dashboardUrl);
        }, 3000);
      } catch {
        setStatus('error');
        setError('An unexpected error occurred during verification.');
      }
    };

    verify();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [searchParams, router, locale]);

  if (status === 'loading') {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Verifying your email...</CardTitle>
            <CardDescription>
              Please wait while we verify your email address.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-red-600">Verification Failed</CardTitle>
            <CardDescription>
              {error || 'Unable to verify your email address.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p className="text-sm text-muted-foreground">
              The verification link may have expired or is invalid.
            </p>
            <div className="space-y-2">
              <Button asChild className="w-full">
                <Link href={locale === 'en' ? '/sign-up' : `/${locale}/sign-up`}>
                  Sign Up Again
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link href={locale === 'en' ? '/sign-in' : `/${locale}/sign-in`}>
                  Back to Sign In
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-green-600">Email Verified!</CardTitle>
          <CardDescription>
            Your email has been successfully verified. You can now access your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-sm text-muted-foreground">
            Redirecting you to your dashboard in a few seconds...
          </p>
          <Button asChild className="w-full">
            <Link href={locale === 'en' ? '/dashboard' : `/${locale}/dashboard`}>
              Go to Dashboard
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
