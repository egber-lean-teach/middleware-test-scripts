import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useTypingEffect } from "../../hooks/useTypingEffect";
import TypingCursor from "./TypingCursor";

interface TypingTextProps {
  text: string;
  isStreaming: boolean;
  speed?: number;
}

export default function TypingText({ text, isStreaming, speed = 30 }: TypingTextProps) {
  const { displayedText, isTyping } = useTypingEffect({
    text,
    speed,
    enabled: isStreaming,
  });

  return (
    <div className="relative">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {displayedText || text}
      </ReactMarkdown>
      <TypingCursor isVisible={isStreaming && isTyping} />
    </div>
  );
}
