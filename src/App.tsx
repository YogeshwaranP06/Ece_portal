import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "@/src/components/layout/Navbar";
import { Footer } from "@/src/components/layout/Footer";
import Home from "@/src/pages/Home";
import Companies from "@/src/pages/Companies";
import SkillMatch from "@/src/pages/SkillMatch";
import About from "@/src/pages/About";
import CompanyDetails from "@/src/pages/CompanyDetails";
import Hackathons from "@/src/pages/Hackathons";
import Faculty from "@/src/pages/Faculty";
import Feedback from "@/src/pages/Feedback";
import { AnimatePresence, motion } from "motion/react";
import { FeedbackWidget } from "@/src/components/common/FeedbackWidget";
import { BackToTop } from "@/src/components/common/BackToTop";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <div key={location.pathname} className="w-full h-full flex-1 flex flex-col">
        <Routes location={location}>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/companies" element={<PageWrapper><Companies /></PageWrapper>} />
        <Route path="/companies/:id" element={<PageWrapper><CompanyDetails /></PageWrapper>} />
        <Route path="/skill-match" element={<PageWrapper><SkillMatch /></PageWrapper>} />
        <Route path="/hackathons" element={<PageWrapper><Hackathons /></PageWrapper>} />
        <Route path="/faculty" element={<PageWrapper><Faculty /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/feedback" element={<PageWrapper><Feedback /></PageWrapper>} />
        </Routes>
      </div>
    </AnimatePresence>
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-background text-text-main">
        <Navbar />
        <main className="flex-1 w-full flex flex-col">
          <AnimatedRoutes />
        </main>
        <Footer />
        <FeedbackWidget />
        <BackToTop />
      </div>
    </BrowserRouter>
  );
}
