import { SignedIn, SignedOut, UserButton } from "@/lib/clerk";
import Link from "next/link";

const SignInButton = () => {
  return (
    <>
      <SignedOut>
        <button>
          <Link href="/sign-in">Login</Link>
        </button>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
};

export default SignInButton;
