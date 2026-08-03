import React, { useState } from "react";
import { motion } from "motion/react";
import { Search, Monitor, Cpu, ChevronDown } from "lucide-react";
import facultyData from "@/src/data/faculty.json";

export default function Faculty() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedFaculty, setExpandedFaculty] = useState<string | null>(null);

  const filteredFaculty = facultyData.filter((faculty: any) =>
    faculty.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (faculty.domain && faculty.domain.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (faculty.specialization && faculty.specialization.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (faculty.softwareKnown || []).some((s: string) => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (faculty.hardwareKnown || []).some((s: string) => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const toggleExpand = (id: string) => {
    if (expandedFaculty === id) {
      setExpandedFaculty(null);
    } else {
      setExpandedFaculty(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Faculty</h1>
          <p className="text-text-muted">
            Explore the technical expertise and hardware/software skills of our esteemed faculty.
          </p>
        </div>
        
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
          <input
            type="text"
            placeholder="Search faculty or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-80 bg-surface border border-border rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFaculty.map((faculty, index) => (
          <motion.div
            key={faculty.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-surface border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors"
          >
            <div 
              className="p-6 cursor-pointer"
              onClick={() => toggleExpand(faculty.id.toString())}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg text-text-main group-hover:text-primary transition-colors">
                    {faculty.name.replace(/\/(.*)/, '')}
                  </h3>
                  <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded-full mt-2 inline-block">
                    {faculty.name.includes('/') ? faculty.name.split('/')[1].trim() : ((faculty as any).designation || "Faculty")}
                  </span>
                  {((faculty as any).domain || (faculty as any).specialization) && (
                    <span className="text-xs font-medium px-2 py-1 bg-blue-500/10 text-blue-500 border border-blue-500/20 rounded-full mt-2 ml-2 inline-block">
                      {(faculty as any).domain || (faculty as any).specialization}
                    </span>
                  )}
                </div>
                <ChevronDown 
                  className={`w-5 h-5 text-text-muted transition-transform duration-300 ${
                    expandedFaculty === faculty.id.toString() ? "rotate-180" : ""
                  }`}
                />
              </div>

              <motion.div 
                initial={false}
                animate={{ 
                  height: expandedFaculty === faculty.id.toString() ? "auto" : "0px",
                  opacity: expandedFaculty === faculty.id.toString() ? 1 : 0,
                  marginTop: expandedFaculty === faculty.id.toString() ? "1.5rem" : "0px"
                }}
                className="overflow-hidden"
              >
                <div className="space-y-4">
                  {faculty.softwareKnown && faculty.softwareKnown.length > 0 && faculty.softwareKnown[0] !== "" && (
                    <div>
                      <h4 className="text-sm font-medium text-text-muted mb-2 flex items-center gap-2">
                        <Monitor className="w-4 h-4" />
                        Software Skills
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {faculty.softwareKnown.map((skill, i) => (
                          <span key={i} className="px-2 py-1 bg-surface-hover border border-border text-xs rounded-md text-text-main">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {faculty.hardwareKnown && faculty.hardwareKnown.length > 0 && faculty.hardwareKnown[0] !== "" && (
                    <div>
                      <h4 className="text-sm font-medium text-text-muted mb-2 flex items-center gap-2">
                        <Cpu className="w-4 h-4" />
                        Hardware Skills
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {faculty.hardwareKnown.map((skill, i) => (
                          <span key={i} className="px-2 py-1 bg-primary/5 border border-primary/20 text-xs rounded-md text-primary">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredFaculty.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text-muted text-lg">No faculty members found matching your search.</p>
        </div>
      )}
    </div>
  );
}
