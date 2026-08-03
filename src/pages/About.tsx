import { motion } from "motion/react";
import { GraduationCap, Code2, Cpu, Trophy } from "lucide-react";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-display font-bold mb-6">About the Portal</h1>
        
        <div className="prose prose-invert prose-lg max-w-none text-text-muted">
          <p className="mb-6">
            The ECE Portal is a centralized platform designed specifically for students of the Electronics and Communication Engineering department. Our goal is to streamline the placement preparation process by providing comprehensive, structured, and easily accessible data about past and current recruiters.
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-12">
            <div className="bg-surface border border-border p-6 rounded-2xl">
              <GraduationCap className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-display font-bold text-xl mb-2 text-text-main">For Students</h3>
              <p className="text-sm">Filter companies based on your exact skill set, understand interview processes in advance, and target offers that match your aspirations.</p>
            </div>
            
            <div className="bg-surface border border-border p-6 rounded-2xl">
              <Cpu className="h-10 w-10 text-emerald-600 mb-4" />
              <h3 className="font-display font-bold text-xl mb-2 text-text-main">Core Focus</h3>
              <p className="text-sm">Specially curated insights bridging the gap between core ECE domains (VLSI, Embedded) and IT services/product roles.</p>
            </div>

            <div className="bg-surface border border-border p-6 rounded-2xl">
              <Code2 className="h-10 w-10 text-purple-600 mb-4" />
              <h3 className="font-display font-bold text-xl mb-2 text-text-main">Smart Matching</h3>
              <p className="text-sm">Our skill matching engine helps you find companies that value your specific technical profile and project work.</p>
            </div>

            <div className="bg-surface border border-border p-6 rounded-2xl">
              <Trophy className="h-10 w-10 text-amber-500 mb-4" />
              <h3 className="font-display font-bold text-xl mb-2 text-text-main">Hackathon Hub</h3>
              <p className="text-sm">Discover and participate in leading hardware, IoT, and software hackathons to build your technical portfolio and win prizes.</p>
            </div>
          </div>

          <h2 className="text-2xl font-display font-bold text-text-main mt-12 mb-4">Developed By</h2>
          <p>
            This portal was designed and developed by <strong>Nebula Nexus</strong> in collaboration with the Department of Electronics and Communication Engineering. We continuously strive to keep the placement data accurate and up-to-date.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
