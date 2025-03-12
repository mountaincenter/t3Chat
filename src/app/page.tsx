import { HydrateClient } from "@/trpc/server";
import TimeDisplay from "./_components/TimeDisplay/TimeDisplay";
// import SignIn from "./SignIn";
// import Image from "next/image";
// import PDFLink from "./PdfLink";

export default function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <>
          <TimeDisplay />
          {/* <SignIn />
          <Image
            src={
              "https://t3chat-development.s3.ap-northeast-1.amazonaws.com/cat20250106.jpeg"
            }
            alt="Cat"
            width={500}
            height={500}
          />

          <PDFLink /> */}
        </>
      </main>
    </HydrateClient>
  );
}
