'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { signOut } from '@/libs/AuthClient';

type SignOutButtonProps = {
  children: React.ReactNode;
  locale: string;
};

export function SignOutButton({ children, locale }: SignOutButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);

    try {
      await signOut();
      const homeUrl = locale === 'en' ? '/' : `/${locale}`;
      router.push(homeUrl);
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={handleSignOut}
      disabled={loading}
      className="border-none p-0 text-gray-700 hover:text-gray-900"
    >
      {children}
    </Button>
  );
}
