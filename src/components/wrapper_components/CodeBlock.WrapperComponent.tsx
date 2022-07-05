import React from "react";
import { CopyBlock, dracula } from "react-code-blocks";

interface CodeBlockProps {
  code: string;
  language: string;
}

const CodeBlock: React.FC<CodeBlockProps> = (props) => {
  return (
    <CopyBlock
      text={props.code}
      language={props.language}
      showLineNumbers={true}
      theme={dracula}
      codeBlock
    />
  );
};

export default CodeBlock;
