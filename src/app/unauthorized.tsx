import Image from 'next/image';
import Link from 'next/link';

export default function Unauthorized() {
  return (
    <div className="mx-auto flex h-[calc(100vh-12rem)] flex-col items-center justify-center p-4 sm:w-2/3">
      <Image
        priority
        className="mb-8 rounded-full"
        src="/turso-vector-search.webp"
        alt="Logo"
        width={200}
        height={200}
      />
      <h1 className="mb-4 text-4xl font-bold">You are not logged in.</h1>
      <p className="text-lg">Please log in to Chat with AI.</p>

      <span className="mt-4 text-center text-lg">
        <p>If you find any issue while login or Any suggestions please</p>
        <Link
          href="https://github.com/patelvivekdev/turso-vector-search/issues"
          target="_blank"
          className="text-lg text-blue-500 hover:underline"
        >
          📝 Open an Issue
        </Link>
      </span>
    </div>
  );
}
