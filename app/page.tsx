import { SignedIn, SignedOut } from "@clerk/nextjs";
import Expenses from "./components/Dashboard/Expenses";
import Hero from "./components/Hero";

const HomePage = async () => {
  return (
    <div className="container mx-auto p-4">
      <SignedOut>
        <Hero />
      </SignedOut>
      <SignedIn>
        <Expenses />
      </SignedIn>
    </div>
  );
};

export default HomePage;
