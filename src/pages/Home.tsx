import { motion } from "motion/react";
import {
  ArrowRight,
  Briefcase,
  Trophy,
  Building2,
  Terminal,
  Network,
  Search,
  Cpu,
  Microchip,
  Code
} from "lucide-react";
import { Link } from "react-router-dom";
import { mockCompanies } from "@/src/data/companies";
import { cn } from "@/src/lib/utils";
import { AnimatedCounter } from "@/src/components/common/AnimatedCounter";

export default function Home() {
  const stats = [
    {
      label: "Total Companies",
      value: mockCompanies.length,
      icon: Building2,
      color: "text-blue-400",
      bg: "bg-blue-900/40",
      border: "border-blue-500/30",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
    },
    {
      label: "Regular Offers",
      value: mockCompanies.filter((c) => c.offerType.split("/").map((s) => s.trim()).includes("Regular")).length,
      icon: Briefcase,
      color: "text-slate-300",
      bg: "bg-slate-800/60",
      border: "border-slate-500/30",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80"
    },
    {
      label: "Dream Offers",
      value: mockCompanies.filter((c) => c.offerType.split("/").map((s) => s.trim()).includes("Dream")).length,
      icon: Trophy,
      color: "text-cyan-400",
      bg: "bg-cyan-900/40",
      border: "border-cyan-500/30",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
    },
    {
      label: "Super Dream",
      value: mockCompanies.filter((c) => {
        const parts = c.offerType.split("/").map((s) => s.trim());
        return parts.includes("Super Dream") || parts.includes("Marquee");
      }).length,
      icon: Trophy,
      color: "text-purple-400",
      bg: "bg-purple-900/40",
      border: "border-purple-500/30",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
    },
    {
      label: "Core Recruiters",
      value: mockCompanies.filter((c) => {
        const str = (c.type + " " + c.domain).toLowerCase();
        return str.includes("core") || str.includes("embedded") || str.includes("semiconductor") || str.includes("electronics") || str.includes("hardware") || str.includes("automotive") || str.includes("automation") || str.includes("vlsi") || str.includes("telecom") || str.includes("rf ");
      }).length,
      icon: Network,
      color: "text-emerald-400",
      bg: "bg-emerald-900/40",
      border: "border-emerald-500/30",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
    },
    {
      label: "IT Recruiters",
      value: mockCompanies.filter((c) => {
        const str = (c.type + " " + c.domain).toLowerCase();
        const isCore = str.includes("core") || str.includes("embedded") || str.includes("semiconductor") || str.includes("electronics") || str.includes("hardware") || str.includes("automotive") || str.includes("automation") || str.includes("vlsi") || str.includes("telecom") || str.includes("rf ");
        return !isCore;
      }).length,
      icon: Terminal,
      color: "text-indigo-400",
      bg: "bg-indigo-900/40",
      border: "border-indigo-500/30",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16 lg:pt-48 lg:pb-32 text-white">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
          style={{ backgroundImage: "url('/logos/SRM-TRP-Campus.jpg')" }}
        />
        {/* Dark Overlays for Readability */}
        <div className="absolute inset-0 bg-slate-900/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/60 via-slate-900/80 to-slate-900" />

        {/* Glowing Orbs */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] pointer-events-none" />

        {/* Floating Icons Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 hidden md:block">
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-[15%] text-cyan-400"
          >
            <Cpu className="w-16 h-16" />
          </motion.div>
          <motion.div
            animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-1/3 right-[15%] text-purple-400"
          >
            <Microchip className="w-20 h-20" />
          </motion.div>
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-1/4 left-[25%] text-emerald-400"
          >
            <Code className="w-12 h-12" />
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-extrabold tracking-tight mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                ECE Portal
              </span>
            </h1>
            <p className="mt-4 text-xl text-slate-300 max-w-2xl mx-auto mb-10 font-medium">
              Smart placement insights for ECE students. Discover companies, analyze interview processes, and map your skills to your dream job.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/companies"
                className="group relative inline-flex items-center gap-2 px-8 py-4 bg-primary text-slate-900 font-bold rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(6,182,212,0.4)]"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative">Browse Companies</span>
                <Search className="relative w-5 h-5" />
              </Link>
              <Link
                to="/skill-match"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full border border-white/20 transition-all backdrop-blur-sm w-full sm:w-auto justify-center"
              >
                Try Skill Match
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section - Lifted up into the dark theme */}
      <section className="py-20 border-b border-slate-800 bg-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-display font-bold text-white">
              Placement Overview
            </h2>
            <p className="text-slate-400 mt-2 font-medium">
              Current statistics for the ongoing placement season.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={cn("border rounded-3xl relative overflow-hidden group transition-all", stat.border)}
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity mix-blend-overlay grayscale group-hover:grayscale-0 duration-500"
                  style={{ backgroundImage: `url('${stat.image}')` }}
                />
                {/* Color Overlay for dark theme */}
                <div className={cn("absolute inset-0 opacity-80 backdrop-blur-[2px] transition-opacity group-hover:opacity-60", stat.bg)} />

                <div className="relative p-6 z-10 flex flex-col justify-end min-h-[140px]">
                  <div className="text-5xl font-display font-bold mb-2 text-white">
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <div className={`text-sm font-bold uppercase tracking-wider ${stat.color}`}>
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold mb-4 text-text-main">
              Platform Features
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto text-lg">
              Everything you need to navigate your placement journey and build your career in core electronics and IT.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-surface border border-border rounded-3xl p-8 hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-500/10 transition-all group"
            >
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                <Building2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-3 text-text-main">
                Company Insights
              </h3>
              <p className="text-text-muted mb-8 leading-relaxed">
                Explore 60+ recruiters across Semiconductor, Embedded, IT, and more. Detailed interview processes, CTCs, and required core skills.
              </p>
              <Link to="/companies" className="text-indigo-600 font-bold inline-flex items-center gap-2 hover:gap-3 transition-all bg-indigo-50 px-4 py-2 rounded-xl">
                Browse Directory <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-surface border border-border rounded-3xl p-8 hover:border-purple-400 hover:shadow-xl hover:shadow-purple-500/10 transition-all group"
            >
              <div className="w-16 h-16 bg-purple-50 text-purple-600 border border-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                <Network className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-3 text-text-main">
                Skill Matching
              </h3>
              <p className="text-text-muted mb-8 leading-relaxed">
                Select your programming and core ECE skills to instantly discover which companies align best with your technical profile.
              </p>
              <Link to="/skill-match" className="text-purple-600 font-bold inline-flex items-center gap-2 hover:gap-3 transition-all bg-purple-50 px-4 py-2 rounded-xl">
                Try Skill Match <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-surface border border-border rounded-3xl p-8 hover:border-emerald-400 hover:shadow-xl hover:shadow-emerald-500/10 transition-all group"
            >
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                <Trophy className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-3 text-text-main">
                Events & Competitions
              </h3>
              <p className="text-text-muted mb-8 leading-relaxed">
                Participate in hardware prototyping, IoT, coding challenges, and innovation competitions to build your resume.
              </p>
              <Link to="/hackathons" className="text-emerald-600 font-bold inline-flex items-center gap-2 hover:gap-3 transition-all bg-emerald-50 px-4 py-2 rounded-xl">
                View Events <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Career Paths Section */}
      <section className="py-24 bg-slate-900 border-t border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900 to-slate-900" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold mb-4 text-white">
              Two Distinct Paths
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Whether you want to build the hardware of tomorrow or write the software that powers it, find your niche.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-800/50 border border-slate-700/50 rounded-3xl p-10 hover:border-blue-500/50 transition-colors group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                  <Microchip className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white">Core Hardware</h3>
              </div>
              <p className="text-slate-300 mb-6 leading-relaxed">
                Dive into VLSI, Embedded Systems, IoT, and Telecommunications. Work on chip design, firmware, and physical hardware architectures.
              </p>
              <ul className="space-y-3 mb-8">
                {["Communication Systems", "Digital Signal Processing", "IoT and Robotics", "Semiconductor"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-400 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-800/50 border border-slate-700/50 rounded-3xl p-10 hover:border-purple-500/50 transition-colors group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-purple-500/20 rounded-2xl flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                  <Terminal className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white">Software & IT</h3>
              </div>
              <p className="text-slate-300 mb-6 leading-relaxed">
                Leverage your analytical skills in Software Development, Data Science, Cloud Computing, and AI/ML across leading IT services and product firms.
              </p>
              <ul className="space-y-3 mb-8">
                {["Full-Stack Development", "Cloud Architecture", "Data Analytics & ML", "Cybersecurity"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-400 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400" /> {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-indigo-600 to-purple-700" />
        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Ready to find your dream role?
          </h2>
          <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto font-medium">
            Join thousands of ECE students who have used our intelligence platform to map their skills and crack top interviews.
          </p>
          <Link
            to="/skill-match"
            className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white text-primary font-bold rounded-full overflow-hidden hover:scale-105 active:scale-95 transition-all shadow-xl text-lg"
          >
            Start Skill Match <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
