import { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Message from "../components/Message";
import { trpc } from "../utils/trpc";

interface MessageObject {
  text: string;
  user: string;
  time: Date;
}

// This React component is a Next.js page component.
// It will return a React element that will be rendered
// on the home page (e.g. example.com).
const Home: NextPage = () => {
  const [msg, setMsg] = useState<string>("");

  const messageData = trpc.message.getAll.useQuery();
  const createMessage = trpc.message.create.useMutation();

  const { data: sessionData } = useSession();

  useEffect(() => {
    const chatRefresh = setInterval(() => {
      messageData.refetch();
    }, 200);

    return () => {
      clearInterval(chatRefresh);
    };
  }, [messageData]);

  // const handleMessageChange = async (newMsg: string) => {
  //   const newMessage: MessageObject = {
  //     text: newMsg,
  //     user: "user",
  //     time: new Date(),
  //   };
  //   setMessages([...messages, newMessage]);

  //   const requestInit: RequestInit = {
  //     method: "POST",
  //     headers: HEADERS,
  //     body: JSON.stringify({ inputs: newMsg }),
  //   };
  //   const response = await fetch(API_URL, requestInit);
  //   const json = await response.json();
  //   console.log(json);

  //   const emotion = json[0]["generated_text"];
  //   console.log(emotion);

  //   const aiMessage: MessageObject = {
  //     text: "That message felt like " + emotion + " to me...",
  //     user: "ai",
  //     time: new Date(),
  //   };

  //   setMessages([...messages, newMessage, aiMessage]);

  //   setMsg("");
  // };

  return (
    <div
      className="
        container mx-auto flex min-h-screen flex-col
        items-center justify-center p-4
      "
    >
      <h1
        className="
        text-3xl font-extrabold leading-normal 
        text-gray-800 md:text-[3rem]
      "
      >
        Welcome to WAI161
      </h1>

      <p className="mt-4 text-2xl text-gray-600">
        Where we will be creating an NLP chatbot
      </p>

      <p className="mt-2 text-gray-500">
        Find out more about{" "}
        <a className="underline" href="https://warwick.ai">
          Warwick AI here!
        </a>
      </p>

      <button
        className="btn-sm btn"
        onClick={() => (sessionData ? signOut() : signIn())}
      >
        {sessionData ? "Sign out of " + sessionData.user?.email : "Sign in"}
      </button>

      <div className="w-80">
        {/* Chat messages */}
        <div className="mt-4 w-full space-y-2">
          {messageData.data?.map((message) => (
            <Message key={message.id} {...message} />
          ))}
        </div>

        {/* Chat text input and send button */}
        <div className="mt-4 flex flex-row space-x-2">
          <input
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            className="input-bordered input input-sm"
            type="text"
            placeholder="Type your message here..."
            onKeyDown={(e) => {
              console.log(e);
              if (e.key === "Enter") {
                createMessage.mutate(msg);
              }
            }}
          />
          <button
            className="btn-sm btn rounded-full  p-2 text-white"
            onClick={() => createMessage.mutate(msg)}
          >
            Send!
          </button>
        </div>
      </div>
    </div>
  );
};

// Every Next.js page component must export a default
export default Home;
