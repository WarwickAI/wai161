import { NextPage } from "next";
import { useState } from "react";
import Message from "../components/Message";

interface MessageObject {
  text: string;
  user: string;
  time: Date;
}

const API_URL =
  "https://api-inference.huggingface.co/models/mrm8488/t5-base-finetuned-emotion";
const HEADERS = new Headers();
HEADERS.append("Authorization", "Bearer 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");

// This React component is a Next.js page component.
// It will return a React element that will be rendered
// on the home page (e.g. example.com).
const Home: NextPage = () => {
  const [msg, setMsg] = useState<string>("");
  const [messages, setMessages] = useState<MessageObject[]>([]);

  const handleMessageChange = async (newMsg: string) => {
    const newMessage: MessageObject = {
      text: newMsg,
      user: "user",
      time: new Date(),
    };
    setMessages([...messages, newMessage]);

    const requestInit: RequestInit = {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({ inputs: newMsg }),
    };
    const response = await fetch(API_URL, requestInit);
    const json = await response.json();
    console.log(json);

    const emotion = json[0]["generated_text"];
    console.log(emotion);

    const aiMessage: MessageObject = {
      text: "That message felt like " + emotion + " to me...",
      user: "ai",
      time: new Date(),
    };

    setMessages([...messages, newMessage, aiMessage]);

    setMsg("");
  };

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

      <div className="w-80">
        {/* Chat messages */}
        <div className="mt-4 w-full space-y-2">
          {messages.map((message) => (
            <Message key={message.time.toISOString()} {...message} />
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
          />
          <button
            className="btn-sm btn rounded-full  p-2 text-white"
            onClick={() => handleMessageChange(msg)}
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
