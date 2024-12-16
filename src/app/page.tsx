import { HydrateClient } from "@/trpc/server";
import TimeDisplay from "./_components/TimeDisplay/TimeDisplay";
import Console from "./Console";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <>
          <TimeDisplay />
          <Console />
        </>
      </main>
    </HydrateClient>
  );
}
