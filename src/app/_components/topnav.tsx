import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { SpinnerBlock } from "~/components/svgs";
import { SimpleUploadButton } from "./simple-upload-button";

export function TopNav() {
  return (
    <nav className="flex w-full shrink items-center justify-between border-b p-4 text-xl font-semibold">
      <div className="bg-gradient-to-r from-emerald-400 from-20% to-yellow-300 bg-clip-text text-3xl font-bold leading-none text-transparent transition">
        <Link href="/">
          T3G<span className="">allery</span>
        </Link>
      </div>
      <div className="flex flex-row items-center gap-4 ">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <SimpleUploadButton />
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-emerald-400 ">
            <div className="absolute flex h-7 w-7 items-center justify-center rounded-full bg-emerald-800">
              <SpinnerBlock />
            </div>
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
}
