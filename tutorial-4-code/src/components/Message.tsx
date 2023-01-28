import { Message, User } from "@prisma/client";
import CryptoJS from "crypto-js";

// This is a function that takes in some properties
// (in this case, the text of the message) and returns
// a React element. This is a React component.
const Message = ({
  text,
  user,
  createdAt,
  ai,
}: Message & { user: User | null }) => {
  const emailHash = CryptoJS.MD5(user?.email || "").toString();

  return (
    <div
      className={`w-3/4 rounded-lg  px-4 py-2 text-white ${
        ai ? "bg-slate-400" : "ml-8 bg-slate-600"
      }`}
    >
      {/* Use curly-braces to use JavaScript in JSX */}
      {text}
      <div className="flex w-full flex-row justify-between">
        <p>
          {ai ? (
            "ai"
          ) : (
            <img
              className="h-6 w-6 rounded-full"
              src={`https://www.gravatar.com/avatar/${emailHash}`}
            />
          )}
        </p>
        <p>{createdAt.toLocaleString()}</p>
      </div>
    </div>
  );
};

// Export the component so that it can be used in other
// files.
export default Message;
