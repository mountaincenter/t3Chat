import { HydrateClient } from "@/trpc/server";
import TimeDisplay from "./_components/TimeDisplay/TimeDisplay";
import SignIn from "./SignIn";

export default function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <>
          <TimeDisplay />
          <SignIn />
        </>
      </main>
    </HydrateClient>
  );
}
