import { useState, useEffect } from "react";

interface UseTypingEffectProps {
  text: string;
  speed?: number;
  enabled?: boolean;
}

interface UseTypingEffectReturn {
  displayedText: string;
  isTyping: boolean;
}

export const useTypingEffect = ({
  text,
  speed = 30,
  enabled = true,
}: UseTypingEffectProps): UseTypingEffectReturn => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!enabled || !text || text.trim() === "") {
      setDisplayedText(text || "");
      setIsTyping(false);
      return;
    }

    setDisplayedText("");
    setIsTyping(true);

    let currentIndex = 0;
    const timer = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText((prev) => prev + text[currentIndex]);
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, speed);

    return () => {
      clearInterval(timer);
    };
  }, [text, speed, enabled]);

  return { displayedText, isTyping };
};

// Hook for multiple texts (for "all" middleware)
interface UseMultipleTypingEffectProps {
  texts: {
    googleResult: string;
    vertexResult: string;
    perplexityResult: string;
  };
  speed?: number;
  enabled?: boolean;
}

interface UseMultipleTypingEffectReturn {
  displayedTexts: {
    googleResult: string;
    vertexResult: string;
    perplexityResult: string;
  };
  isTyping: boolean;
}

export const useMultipleTypingEffect = ({
  texts,
  speed = 30,
  enabled = true,
}: UseMultipleTypingEffectProps): UseMultipleTypingEffectReturn => {
  const [displayedTexts, setDisplayedTexts] = useState({
    googleResult: "",
    vertexResult: "",
    perplexityResult: "",
  });
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (
      !enabled ||
      (!texts.googleResult?.trim() &&
        !texts.vertexResult?.trim() &&
        !texts.perplexityResult?.trim())
    ) {
      setDisplayedTexts((prev) => {
        const newTexts = {
          googleResult: texts.googleResult || "",
          vertexResult: texts.vertexResult || "",
          perplexityResult: texts.perplexityResult || "",
        };
        // Only update if there's actually a change
        if (
          prev.googleResult !== newTexts.googleResult ||
          prev.vertexResult !== newTexts.vertexResult ||
          prev.perplexityResult !== newTexts.perplexityResult
        ) {
          return newTexts;
        }
        return prev;
      });
      setIsTyping(false);
      return;
    }

    setDisplayedTexts({
      googleResult: "",
      vertexResult: "",
      perplexityResult: "",
    });
    setIsTyping(true);

    const timers: NodeJS.Timeout[] = [];
    let activeTimers = 0;

    // Start typing each text simultaneously but with slight delays
    Object.entries(texts).forEach(([key, text], index) => {
      if (!text || text.trim() === "") return;

      activeTimers++;
      let currentIndex = 0;

      const timer = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedTexts((prev) => ({
            ...prev,
            [key]: prev[key as keyof typeof prev] + text[currentIndex],
          }));
          currentIndex++;
        } else {
          activeTimers--;
          if (activeTimers === 0) {
            setIsTyping(false);
          }
          clearInterval(timer);
        }
      }, speed + index * 10); // Slight delay between each text

      timers.push(timer);
    });

    // If no timers were created, set isTyping to false
    if (activeTimers === 0) {
      setIsTyping(false);
    }

    return () => {
      timers.forEach(clearInterval);
    };
  }, [
    texts.googleResult,
    texts.vertexResult,
    texts.perplexityResult,
    speed,
    enabled,
  ]);

  return { displayedTexts, isTyping };
};
