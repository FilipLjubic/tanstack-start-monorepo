import { Button } from '@starter/ui/components/shadcn/button';
import { cn } from '@starter/ui/utils';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { signInWithGoogle } from '@/lib/auth-client';

type GoogleSignInButtonProps = {
  callbackURL?: string;
  newUserCallbackURL?: string;
  errorCallbackURL?: string;
  className?: string;
  fullWidth?: boolean;
};

export const GoogleSignInButton = ({
  callbackURL = '/dashboard',
  newUserCallbackURL = '/dashboard',
  errorCallbackURL = '/auth/login?error=oauth',
  className,
  fullWidth = false,
}: GoogleSignInButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle({
        callbackURL,
        newUserCallbackURL,
        errorCallbackURL,
      });
    } catch (error) {
      console.error('Failed to start Google sign-in flow', error);
      setIsLoading(false);
    }
  };

  return (
    <Button
      className={cn(
        'flex items-center gap-3 rounded-lg border bg-white px-4 py-2 font-medium text-base text-slate-900 shadow-sm transition hover:bg-slate-50',
        fullWidth ? 'w-full justify-center' : '',
        className
      )}
      disabled={isLoading}
      onClick={handleClick}
      type="button"
      variant="outline"
    >
      <FcGoogle className="h-5 w-5" />
      <span>{isLoading ? 'Signing in...' : 'Continue with Google'}</span>
    </Button>
  );
};
