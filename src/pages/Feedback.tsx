import React, { useState } from "react";
import { MessageSquarePlus, Send, CheckCircle2 } from "lucide-react";

export default function Feedback() {
  const [type, setType] = useState("Suggestion");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const email = "814724106119@trp.srmtrichy.edu.in";
    const subject = `[ECE Portal Feedback] ${type}`;
    const body = `Feedback Type: ${type}\n\nMessage:\n${message}\n\n---\nSent from ECE Placement Intelligence Portal`;
    
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    setSubmitted(true);
    setTimeout(() => {
      setMessage("");
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div className="flex-1 max-w-3xl mx-auto w-full px-6 py-12 md:py-20 flex flex-col items-center">
      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
        <MessageSquarePlus className="w-8 h-8" />
      </div>
      
      <h1 className="text-4xl font-display font-bold text-center text-text-main mb-4">
        Share Your Feedback
      </h1>
      <p className="text-text-muted text-center max-w-xl mb-12">
        Help us improve the ECE Placement Intelligence Portal! Whether you found a bug, want to suggest a feature, or need to correct some data, we'd love to hear from you.
      </p>

      <div className="w-full bg-surface border border-border rounded-3xl p-6 md:p-10 shadow-xl shadow-primary/5">
        {submitted ? (
          <div className="flex flex-col items-center justify-center text-center py-12">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-text-main mb-2">Thank you!</h2>
            <p className="text-text-muted">
              Your feedback is being prepared in your email client. We appreciate your contribution!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-text-main">
                What kind of feedback do you have?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {["Suggestion", "Bug Report", "Data Correction", "Other"].map((option) => (
                  <label
                    key={option}
                    className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                      type === option 
                        ? "bg-primary/5 border-primary text-primary" 
                        : "bg-background border-border text-text-muted hover:border-primary/50 hover:bg-surface-hover"
                    }`}
                  >
                    <input
                      type="radio"
                      name="feedbackType"
                      value={option}
                      checked={type === option}
                      onChange={(e) => setType(e.target.value)}
                      className="hidden"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      type === option ? "border-primary" : "border-slate-300"
                    }`}>
                      {type === option && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                    </div>
                    <span className="font-medium">{option}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col gap-2 mt-4">
              <label className="font-semibold text-text-main">
                Please provide the details
              </label>
              <textarea 
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us exactly what's on your mind. The more details, the better!"
                className="bg-background border border-border rounded-xl px-4 py-3 text-text-main focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all min-h-[200px] resize-y"
              />
            </div>

            <button 
              type="submit"
              className="mt-6 w-full md:w-auto md:self-end bg-primary hover:bg-primary-dark text-background font-medium py-3 px-8 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-primary/20 text-lg"
            >
              <Send className="w-5 h-5" />
              Send via Email
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
