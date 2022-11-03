// This is a function that takes in some properties
// (in this case, the text of the message) and returns
// a React element. This is a React component.
const Message = ({ text }: { text: string }) => {
  return (
    <div className="rounded-lg bg-slate-400 px-4 py-2 text-white">
      {/* Use curly-braces to use JavaScript in JSX */}
      {text}
    </div>
  );
};

// Export the component so that it can be used in other
// files.
export default Message;
