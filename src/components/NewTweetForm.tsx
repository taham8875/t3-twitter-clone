import { useSession } from "next-auth/react";
import { ProfilePicture } from "./ProfilePicture";
import { useState, useRef, useCallback, useLayoutEffect } from "react";
import { api } from "~/utils/api";

const updateTextAreaSize = (textArea?: HTMLTextAreaElement) => {
  if (textArea == null) return;
  textArea.style.height = "0";
  textArea.style.height = `${textArea.scrollHeight}px`;
};

const NewTweetForm = () => {
  const session = useSession();
  if (session.status !== "authenticated") return null;

  const user = session.data?.user;

  const profilePicture = user?.image;

  return <Form profilePicture={profilePicture} />;
};

const Form = ({
  profilePicture,
}: {
  profilePicture: string | null | undefined;
}) => {
  const session = useSession();
  const [inputValue, setInputValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>();
  const inputRef = useCallback((textArea: HTMLTextAreaElement) => {
    updateTextAreaSize(textArea);
    textAreaRef.current = textArea;
  }, []);

  useLayoutEffect(() => {
    updateTextAreaSize(textAreaRef.current);
  }, [inputValue]);

  const createTweet = api.tweet.create.useMutation({
    onSuccess: (newTweet) => {
      console.log("newTweet", newTweet);
      setInputValue("");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createTweet.mutate({
      content: inputValue,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col   border-b px-4 py-2"
    >
      <div className="flex">
        <ProfilePicture src={profilePicture} className="mr-2" />
        <textarea
          ref={inputRef}
          style={{ height: 0 }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-grow resize-none overflow-hidden p-4 text-lg outline-none"
          placeholder="What's happening?"
        />
      </div>
      <button className="ml-auto rounded-full bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600">
        Tweet
      </button>
    </form>
  );
};

export default NewTweetForm;
