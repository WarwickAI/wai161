type MessageProps = {
  text: string;
  user: string;
  time: Date;
};

// This is a function that takes in some properties
// (in this case, the text of the message) and returns
// a React element. This is a React component.
const Message = ({ text, user, time }: MessageProps) => {
  return (
    <div
      className={`w-3/4 rounded-lg bg-slate-400 px-4 py-2 text-white ${
        user === "ai" ? "" : "ml-8"
      }`}
    >
      {/* Use curly-braces to use JavaScript in JSX */}
      {text}
      <div className="flex w-full flex-row justify-between">
        <p>{user}</p>
        <p>{time.toLocaleString()}</p>
      </div>
    </div>
  );
};

// Export the component so that it can be used in other
// files.
export default Message;
