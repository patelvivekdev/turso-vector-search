import { auth } from '@/app/(auth)/auth';
import Link from 'next/link';
import { GithubSignIn, GoogleSignIn, SignOut } from './AuthButton';
import Image from 'next/image';
import { ModelSelection } from './ModelSelection';

export default async function Navbar() {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="flex flex-col">
      <div className="border border-red-400 bg-red-200 px-4 py-2 text-center text-sm">
        <p className="line-clamp-2">
          ⚠️ This is a demo application using Turso as vector DB, Mistral Large | Google generative
          🤖 AI model.
        </p>
      </div>
      <div className="flex flex-col items-center justify-between gap-4 border-b p-4 sm:flex-row">
        <Link href="/" className="text-center text-lg font-medium text-foreground sm:text-left">
          🤖 Chatbot With Turso Vector Search
        </Link>
        {session ? (
          <>
            <ModelSelection />
            <div className="flex items-center gap-2">
              <Image
                src={user?.image || ''}
                alt={user?.name || ''}
                width={32}
                height={32}
                className="rounded-full"
              />
              <h2 className="text-center">{user?.name}</h2>
              <div>
                <SignOut />
              </div>
            </div>
          </>
        ) : (
          <div className="flex gap-2">
            <GithubSignIn />
            <GoogleSignIn />
          </div>
        )}
      </div>
    </header>
  );
}
