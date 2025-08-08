'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { sendVerificationEmail, signIn, signUp } from '@/libs/AuthClient';

const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const signUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type SignInFormData = z.infer<typeof signInSchema>;
type SignUpFormData = z.infer<typeof signUpSchema>;

type AuthFormProps = {
  mode: 'signin' | 'signup';
  locale: string;
};

export function AuthForm({ mode, locale }: AuthFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const isSignUp = mode === 'signup';

  const signInForm = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
  });

  const signUpForm = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });

  const onSignInSubmit = async (data: SignInFormData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await signIn.email({
        email: data.email,
        password: data.password,
      });

      if (result.error) {
        setError(result.error.message || 'An error occurred');
        return;
      }

      if (!result.data?.user.emailVerified) {
        setError('Please verify your email address before signing in.');
        return;
      }

      // Only redirect on successful login
      const dashboardUrl = locale === 'en' ? '/dashboard' : `/${locale}/dashboard`;
      router.push(dashboardUrl);
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onSignUpSubmit = async (data: SignUpFormData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
      });

      if (result.error) {
        setError(result.error.message || 'An error occurred');
        return;
      }

      setEmailSent(true);
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendEmail = async () => {
    const email = isSignUp ? signUpForm.getValues().email : signInForm.getValues().email;
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    try {
      await sendVerificationEmail({ email });
      setEmailSent(true);
    } catch {
      setError('Failed to send verification email. Please try again.');
    }
  };

  if (emailSent && isSignUp) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
            <CardDescription>
              We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button
              variant="link"
              onClick={handleResendEmail}
              className="text-blue-600 hover:text-blue-800"
            >
              Resend verification email
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-[500px] items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            {isSignUp ? 'Create your account' : 'Sign in to your account'}
          </CardTitle>
          <CardDescription>
            {isSignUp
              ? 'Enter your information to create a new account'
              : 'Enter your credentials to access your account'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {isSignUp
            ? (
                <Form {...signUpForm}>
                  <form onSubmit={signUpForm.handleSubmit(onSignUpSubmit)} className="space-y-4">
                    <FormField
                      control={signUpForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={signUpForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Enter your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={signUpForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Enter your password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={signUpForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Confirm your password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Please wait...' : 'Create Account'}
                    </Button>
                  </form>
                </Form>
              )
            : (
                <Form {...signInForm}>
                  <form onSubmit={signInForm.handleSubmit(onSignInSubmit)} className="space-y-4">
                    <FormField
                      control={signInForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Enter your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={signInForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Enter your password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Please wait...' : 'Sign In'}
                    </Button>
                  </form>
                </Form>
              )}

          <div className="mt-6 text-center text-sm">
            {isSignUp
              ? (
                  <p className="text-muted-foreground">
                    Already have an account?
                    {' '}
                    <Link
                      href={locale === 'en' ? '/sign-in' : `/${locale}/sign-in`}
                      className="font-medium text-primary hover:underline"
                    >
                      Sign in here
                    </Link>
                  </p>
                )
              : (
                  <>
                    <p className="text-muted-foreground">
                      Don't have an account?
                      {' '}
                      <Link
                        href={locale === 'en' ? '/sign-up' : `/${locale}/sign-up`}
                        className="font-medium text-primary hover:underline"
                      >
                        Sign up here
                      </Link>
                    </p>
                    <p className="mt-2 text-muted-foreground">
                      <Link
                        href={locale === 'en' ? '/reset-password' : `/${locale}/reset-password`}
                        className="font-medium text-primary hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    </p>
                  </>
                )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
