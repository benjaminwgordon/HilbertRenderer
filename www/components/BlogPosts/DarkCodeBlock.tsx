import { CodeBlock, CopyBlock, irBlack } from "react-code-blocks";

type DarkCodeBlockProps = {
  text: string;
  language: string;
};
const DarkCodeBlock = (props: DarkCodeBlockProps) => {
  const { text, language } = props;
  return (
    <div className="mb-8 border border-white rounded-md p-1">
      <CopyBlock
        text={text}
        language={language}
        showLineNumbers={false}
        theme={irBlack}
      />
    </div>
  );
};

export default DarkCodeBlock;
