interface TypingCursorProps {
  isVisible: boolean;
}

export default function TypingCursor({ isVisible }: TypingCursorProps) {
  if (!isVisible) return null;

  return (
    <span className="inline-block w-0.5 h-5 bg-blue-500 ml-1 rounded-sm animate-pulse"></span>
  );
}
