import Head from "next/head";
import CreateStoryScreen from "../../Components/CreateStory/CreateStoryScreen";
import StorySidebar from "../../Components/CreateStory/StorySidebar";

function create() {
  return (
    <div>
      <Head>
        <title>Create Stories</title>
      </Head>
      <main className="flex bg-gray-200 h-screen">
        <StorySidebar />
        <CreateStoryScreen />
      </main>
    </div>
  );
}

export default create;
