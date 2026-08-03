import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Code2, Cpu, Check, Layers } from "lucide-react";
import { mockCompanies } from "@/src/data/companies";
import { CompanyCard } from "@/src/components/features/CompanyCard";
import { cn } from "@/src/lib/utils";

export default function SkillMatch() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  // Collect all available unique skills from the company data
  const { allProgramming, allCore, allTools } = useMemo(() => {
    const prog = new Set<string>();
    const core = new Set<string>();
    const tools = new Set<string>();
    
    mockCompanies.forEach(c => {
      Object.keys(c.programmingSkills).forEach(k => prog.add(k));
      Object.keys(c.coreSkills).forEach(k => core.add(k));
      
      if (c.coreSkillDomains) {
        Object.values(c.coreSkillDomains).forEach(domain => {
          if (!domain) return;
          if (domain.traditionalTools) {
            Object.keys(domain.traditionalTools).forEach(k => tools.add(k));
          }
          if (domain.aiTools) {
            Object.keys(domain.aiTools).forEach(k => tools.add(k));
          }
        });
      }
    });
    
    return { allProgramming: Array.from(prog), allCore: Array.from(core), allTools: Array.from(tools) };
  }, []);

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const matchedCompanies = useMemo(() => {
    if (selectedSkills.length === 0) return [];

    return mockCompanies.filter(company => {
      const requiredSkills = [
        ...Object.entries(company.programmingSkills).filter(([_, v]) => v).map(([k]) => k),
        ...Object.entries(company.coreSkills).filter(([_, v]) => v).map(([k]) => k)
      ];
      
      if (company.coreSkillDomains) {
        Object.values(company.coreSkillDomains).forEach(domain => {
          if (!domain) return;
          if (domain.traditionalTools) {
            Object.entries(domain.traditionalTools).filter(([_, v]) => v).forEach(([k]) => requiredSkills.push(k));
          }
          if (domain.aiTools) {
            Object.entries(domain.aiTools).filter(([_, v]) => v).forEach(([k]) => requiredSkills.push(k));
          }
        });
      }

      const matchCount = requiredSkills.filter(req => selectedSkills.includes(req)).length;
      return matchCount > 0;
    }).map(c => {
      const requiredSkills = [
        ...Object.entries(c.programmingSkills).filter(([_, v]) => v).map(([k]) => k),
        ...Object.entries(c.coreSkills).filter(([_, v]) => v).map(([k]) => k)
      ];
      
      if (c.coreSkillDomains) {
        Object.values(c.coreSkillDomains).forEach(domain => {
          if (!domain) return;
          if (domain.traditionalTools) {
            Object.entries(domain.traditionalTools).filter(([_, v]) => v).forEach(([k]) => requiredSkills.push(k));
          }
          if (domain.aiTools) {
            Object.entries(domain.aiTools).filter(([_, v]) => v).forEach(([k]) => requiredSkills.push(k));
          }
        });
      }

      const matchCount = requiredSkills.filter(req => selectedSkills.includes(req)).length;
      return { company: c, matchCount, totalReq: requiredSkills.length };
    }).sort((a, b) => b.matchCount - a.matchCount);

  }, [selectedSkills]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">Smart Skill Match</h1>
        <p className="text-text-muted">Select your strongest technical and core skills below. The engine will match you with recruiters looking for your specific profile.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Skill Selection */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="bg-surface border border-border rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Code2 className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-display font-bold">Programming Skills</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {allProgramming.map(skill => {
                const isSelected = selectedSkills.includes(skill);
                return (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium transition-all border",
                      isSelected 
                        ? "bg-primary/10 text-primary border-primary/30 shadow-sm" 
                        : "bg-background text-text-muted border-border hover:border-primary/50 hover:text-text-main"
                    )}
                  >
                    {isSelected && <Check className="w-4 h-4" />}
                    <span className="capitalize">{skill.replace(/([A-Z])/g, ' $1').trim()}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="bg-surface border border-border rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Cpu className="w-6 h-6 text-orange-600" />
              <h2 className="text-xl font-display font-bold">Core ECE Skills</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {allCore.map(skill => {
                const isSelected = selectedSkills.includes(skill);
                return (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium transition-all border",
                      isSelected 
                        ? "bg-orange-100 text-orange-700 border-orange-300 shadow-sm" 
                        : "bg-background text-text-muted border-border hover:border-orange-500/50 hover:text-text-main"
                    )}
                  >
                    {isSelected && <Check className="w-4 h-4" />}
                    <span className="capitalize">{skill.replace(/([A-Z])/g, ' $1').trim()}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="bg-surface border border-border rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#eeefff] flex items-center justify-center">
                <Cpu className="w-5 h-5 text-[#3b47c9]" />
              </div>
              <h2 className="text-xl font-display font-bold">ECE Tools</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {allTools.map(skill => {
                const isSelected = selectedSkills.includes(skill);
                return (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium transition-all border",
                      isSelected 
                        ? "bg-[#eeefff] text-[#3b47c9] border-[#3b47c9]/30 shadow-sm" 
                        : "bg-background text-text-muted border-border hover:border-[#3b47c9]/50 hover:text-text-main"
                    )}
                  >
                    {isSelected && <Check className="w-4 h-4" />}
                    <span className="capitalize">{skill.replace(/([A-Z])/g, ' $1').trim()}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Matches */}
        <div className="lg:col-span-7">
          <div className="bg-surface border border-border rounded-3xl p-6 md:p-8 min-h-[500px]">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-border">
              <Layers className="w-6 h-6 text-emerald-600" />
              <h2 className="text-xl font-display font-bold">Matching Recruiters</h2>
              <span className="ml-auto bg-background border border-border px-3 py-1 rounded-full text-sm">
                {matchedCompanies.length} Found
              </span>
            </div>

            <div className="space-y-6">
              <AnimatePresence mode="popLayout">
                {selectedSkills.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-64 text-center"
                  >
                    <Code2 className="w-12 h-12 text-border mb-4" />
                    <p className="text-text-muted">Select some skills on the left to see matching companies.</p>
                  </motion.div>
                ) : matchedCompanies.length === 0 ? (
                   <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-64 text-center"
                   >
                     <p className="text-text-muted">No recruiters found requiring these specific skills.</p>
                   </motion.div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {matchedCompanies.map(({company, matchCount, totalReq}, index) => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        key={company.id}
                        className="relative"
                      >
                         <CompanyCard company={company} matchInfo={{ matchCount, totalReq }} />
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
