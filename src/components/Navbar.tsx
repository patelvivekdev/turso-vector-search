import { auth } from "@/app/(auth)/auth";
import Link from "next/link";
import { GithubSignIn, GoogleSignIn, SignOut } from "./AuthButton";
import Image from "next/image";

export default async function Navbar() {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="flex flex-col">
      <div className="text-sm text-center border border-red-400 bg-red-200 py-2 px-4">
        <p className="line-clamp-2">
          ⚠️ This is a demo application using Turso as vector DB and Google
          generative 🤖 AI model.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between border-b p-4 gap-4">
        <Link
          href="/"
          className="text-lg font-medium text-foreground text-center sm:text-left"
        >
          🤖 Chatbot With Turso Vector Search
        </Link>
        {session ? (
          <div className="flex items-center gap-2">
            <Image
              src={user?.image || ""}
              alt={user?.name || ""}
              width={32}
              height={32}
              className="rounded-full"
            />
            <h2 className="text-center">{user?.name}</h2>
            <div>
              <SignOut />
            </div>
          </div>
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
