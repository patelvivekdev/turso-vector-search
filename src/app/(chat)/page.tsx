import { Chat } from '@/components/chat';
import { auth } from '../(auth)/auth';
import { unauthorized } from 'next/navigation';

export default async function Page() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    unauthorized();
  }

  return (
    <>
      <Chat />
    </>
  );
}
