import { signIn, signOut } from '@/app/(auth)/auth';
import { GitHub, Google } from './Icon';
import { Button } from './ui/button';
import { unstable_noStore } from 'next/cache';

export function GithubSignIn() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('github', {
          redirectTo: '/',
          redirect: true,
          callbackUrl: '/',
        });
      }}
    >
      <Button className="w-full" variant="outline">
        <GitHub className="mr-2 h-4 w-4" />
        GitHub
      </Button>
    </form>
  );
}

export function GoogleSignIn() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('google', {
          redirectTo: '/',
          redirect: true,
          callbackUrl: '/',
        });
      }}
    >
      <Button className="w-full" variant="outline">
        <Google className="mr-2 h-4 w-4" />
        Google
      </Button>
    </form>
  );
}

export function SignOut() {
  unstable_noStore();
  return (
    <form
      action={async () => {
        'use server';
        await signOut({
          redirectTo: '/',
          redirect: true,
        });
      }}
      className="w-full"
    >
      <Button size="sm" variant="destructive">
        Logout
      </Button>
    </form>
  );
}
