import Head from "next/head";
import InfiniteTweetsList from "~/components/InfiniteTweetsList";
import NewTweetForm from "~/components/NewTweetForm";
import Sidebar from "~/components/Sidebar";

export default function Home() {
  return (
    <>
      <Head>
        <title>T3 Twitter Clone</title>
        <meta name="description" content="Twitter clone by create-t3-app" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="container mx-auto flex">
        <Sidebar />
        <div className="min-h-screen flex-grow border-x">
          <header className="sticky top-0 z-10 flex w-full flex-shrink-0 items-center justify-between border-b   px-4 py-2">
            <h1 className="text-4xl font-bold">Hello world!</h1>
          </header>
          <NewTweetForm />
          <InfiniteTweetsList />
        </div>
      </div>
    </>
  );
}
