import { Chat } from "@/components/chat";
import { auth } from "../(auth)/auth";
import Link from "next/link";
import Image from "next/image";

export default async function Page() {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="">
      {user?.userId ? (
        <Chat userId={user.userId} />
      ) : (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)] sm:w-2/3 mx-auto p-4">
          <Image
            className="rounded-full mb-8"
            src="/turso-vector-search.webp"
            alt="Logo"
            width={200}
            height={200}
          />
          <h1 className="text-4xl font-bold mb-4">You are not logged in.</h1>
          <p className="text-lg">Please log in to Chat with AI.</p>

          <span className="text-center text-lg mt-4">
            <p>If you find any issue while login or Any suggestions please</p>
            <Link
              href="https://github.com/patelvivekdev/turso-vector-search/issues"
              target="_blank"
              className="text-blue-500 hover:underline text-lg "
            >
              📝 Open an Issue
            </Link>
          </span>
        </div>
      )}
    </div>
  );
}
