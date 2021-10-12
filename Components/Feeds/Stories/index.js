import CreateStory from "./CreateStory";
import StoryCard from "./StoryCard";

import { auth } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "../../../Utils/link";

const stories = [
  {
    name: "Mitt Parmar",
    image: "/stories/coffee.jpg",
    profile: "/stories/1.jpg",
  },
  {
    name: "Vishesh Bhatt",
    image: "/stories/dog.jpg",
    profile: "/stories/5.jpeg",
  },
  {
    name: "Vish Verma",
    image: "/stories/travel.jpg",
    profile: "/stories/2.jpg",
  },
  {
    name: "Divyash Bhattnagar",
    image: "/stories/fitness.jpg",
    profile: "/stories/4.jpg",
  },
];
function Stories() {
  const [user] = useAuthState(auth);
  return (
    <div className="flex justify-center space-x-3 mx-auto">
      <CreateStory profileSrc={user.photoURL} />
      {stories.map((story) => (
        <StoryCard
          key={story.image}
          name={story.name}
          src={story.image}
          profile={story.profile}
        />
      ))}
    </div>
  );
}

export default Stories;
