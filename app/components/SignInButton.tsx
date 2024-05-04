import { SignedIn, SignedOut, UserButton } from "@/lib/clerk";

const SignInButton = () => {
  return (
    <>
      <SignedOut>
        <button onClick={() => (window.location.href = "/sign-in")}>
          Sign In
        </button>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
};

export default SignInButton;
