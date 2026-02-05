import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getSubjectParticle } from "../utils/korean";

interface TypingTextProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export default function TypingText({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
}: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentParticle, setCurrentParticle] = useState("이");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeedState, setTypingSpeedState] = useState(typingSpeed);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const handleTyping = () => {
      const i = loopNum % texts.length;
      const fullText = texts[i];

      setDisplayedText((prev) =>
        isDeleting
          ? fullText.substring(0, prev.length - 1)
          : fullText.substring(0, prev.length + 1)
      );

      // 현재 표시된 텍스트의 마지막 글자에 따라 조사 업데이트
      const currentText = isDeleting
        ? fullText.substring(0, displayedText.length - 1)
        : fullText.substring(0, displayedText.length + 1);
      
      if (currentText.length > 0) {
        setCurrentParticle(getSubjectParticle(currentText));
      }

      setTypingSpeedState(isDeleting ? deletingSpeed : typingSpeed);

      if (!isDeleting && displayedText === fullText) {
        setTypingSpeedState(pauseDuration);
        setIsDeleting(true);
      } else if (isDeleting && displayedText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeedState(500);
      }
    };

    timer = setTimeout(handleTyping, typingSpeedState);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, loopNum, texts, typingSpeed, deletingSpeed, pauseDuration, typingSpeedState]);

  return (
    <>
      <span className="inline-block min-w-[2ch]">
        {displayedText}
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="ml-0.5 inline-block h-[0.9em] w-[0.08em] bg-current align-middle"
        />
      </span>
      <span className="text-black">{currentParticle}</span>
    </>
  );
}
