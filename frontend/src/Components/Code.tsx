

interface CodeBlockProps {
  code: string;
  language?: string;
}

const Code: React.FC<CodeBlockProps> = ({ code, language = "plaintext" }) => {
  return (
    <pre className="bg-black text-green-300 rounded-md p-4 my-2 overflow-x-auto text-sm -z-2">
      <code>{code}</code>
    </pre>
  );
};

export default Code;
