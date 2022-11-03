import { NextPage } from "next";
import Message from "../components/Message";

// This React component is a Next.js page component.
// It will return a React element that will be rendered
// on the home page (e.g. example.com).
const Home: NextPage = () => {
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

      <div>
        {/* Chat messages */}
        <div className="mt-4 space-y-2">
          <Message text="Hello there, how are you?" />
          <Message text="I'm good thanks" />
        </div>

        {/* Chat text input and send button */}
        <div className="mt-4 flex flex-row space-x-2">
          <input
            onChange={(e) => console.log(e.target.value)}
            className="input-bordered input input-sm"
            type="text"
            placeholder="Type your message here..."
          />
          <button
            className="btn-sm btn rounded-full  p-2 text-white"
            onClick={() => console.log("Send button clicked")}
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
