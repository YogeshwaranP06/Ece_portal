import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/src/lib/utils";
import { useLocation } from "react-router-dom";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Stack above the Feedback Widget, unless it's hidden on the feedback page
  const isFeedbackHidden = location.pathname === '/feedback';
  const bottomPosition = isFeedbackHidden ? 'bottom-6' : 'bottom-20';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          onClick={scrollToTop}
          className={cn(
            "fixed right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-surface border border-border text-text-muted shadow-lg shadow-black/20 transition-all hover:text-text-main hover:border-text-muted hover:scale-105 active:scale-95",
            bottomPosition
          )}
          aria-label="Back to top"
        >
          <ArrowUp className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
