
import { useState, type ReactNode } from "react";

interface FlashcardProps {
  renderFront: ReactNode;
  renderBack: ReactNode;
  className?: string;
  height?: string;
}

export default function Flashcard({
  renderFront,
  renderBack,
  className = "",
  height = "h-64",
}: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <div
      className={`w-full cursor-pointer [perspective:1000px] ${height} ${className}`}
      onClick={handleFlip}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleFlip();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label="Flip flashcard"
    >
      <div
        className={`relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* Front */}
        <div className="absolute inset-0 h-full w-full [backface-visibility:hidden]">
          {renderFront}
        </div>

        {/* Back */}
<div className="absolute inset-0 h-full w-full rounded-2xl
  [backface-visibility:hidden]
  [transform:rotateY(180deg)]">
  {renderBack}
</div>
      </div>
    </div>
  );
}
