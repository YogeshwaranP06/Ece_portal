import React from "react";
import { MessageSquarePlus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/src/lib/utils";

export function FeedbackWidget() {
  const location = useLocation();
  
  // Don't show the floating button if we're already on the feedback page
  if (location.pathname === '/feedback') return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <Link
        to="/feedback"
        className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center text-background shadow-lg shadow-primary/30 transition-all hover:scale-105 active:scale-95 bg-primary hover:bg-primary-dark"
        )}
        title="Send Feedback"
      >
        <MessageSquarePlus className="w-6 h-6" />
      </Link>
    </div>
  );
}
