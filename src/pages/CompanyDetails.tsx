import { useParams, Link } from "react-router-dom";
import { mockCompanies } from "@/src/data/companies";
import { motion } from "motion/react";
import { ArrowLeft, CheckCircle2, IndianRupee, MapPin, XCircle, ChevronRight, GraduationCap, Code2, Cpu, ExternalLink, Briefcase, Database, Sparkles, Wrench, AlertTriangle } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { CompanyLogo } from "@/src/components/common/CompanyLogo";
import { getCompanyDomains } from "@/src/lib/domainMapping";

const DOMAIN_DISPLAY_NAMES: Record<string, string> = {
  vlsiAndDigitalDesign: "VLSI & Digital Design",
  embeddedSystemsAndFirmware: "Embedded Systems & Firmware",
  signalProcessingAndDSP: "Signal Processing & DSP",
  rfWirelessAndAntennaEngineering: "RF, Wireless & Antenna Engineering",
  communicationSystemsAndProtocols: "Communication Systems & Protocols"
};

const DOMAIN_BORDER_CLASSES: Record<string, string> = {
  vlsiAndDigitalDesign: "border-l-4 border-l-amber-500 pl-4 md:pl-6",
  embeddedSystemsAndFirmware: "border-l-4 border-l-orange-500 pl-4 md:pl-6",
  signalProcessingAndDSP: "border-l-4 border-l-cyan-500 pl-4 md:pl-6",
  rfWirelessAndAntennaEngineering: "border-l-4 border-l-rose-500 pl-4 md:pl-6",
  communicationSystemsAndProtocols: "border-l-4 border-l-blue-500 pl-4 md:pl-6"
};

const TOOL_DISPLAY_NAMES: Record<string, string> = {
  cadence: "Cadence",
  magicVLSI: "MagicVLSI",
  matlab: "MATLAB",
  openRoad: "OpenROAD",
  python: "Python",
  siemens: "Siemens Questa",
  synopsys: "Synopsys",
  systemVerilog: "SystemVerilog",
  verilog: "Verilog",
  xilinxVivado: "Xilinx Vivado",
  synopsysAI: "Synopsys DSO.ai",
  cadenceAI: "Cadence Cerebrus",
  siemensAI: "Siemens Calibre AI",
  googleAI: "Google AlphaChip",
  githubCopilot: "GitHub Copilot",
  nvidiaAI: "Nvidia Modulus",
  keil: "Keil µVision",
  stm32: "STM32 CubeIDE",
  arduino: "Arduino IDE",
  rtos: "RTOS",
  embeddedC: "Embedded C",
  arm: "ARM Cortex",
  autosar: "AUTOSAR",
  awsIot: "AWS IoT ExpressLink",
  keilStudio: "Keil Studio AI",
  parasoft: "Parasoft C/C++test",
  simulink: "Simulink",
  pythonDSP: "Python DSP",
  labview: "LabVIEW DSP",
  texasInstruments: "TI Code Composer",
  tensorflow: "TensorFlow",
  cudaToolkit: "CUDA Toolkit",
  matlabAI: "MATLAB AI",
  tiEdgeAI: "TI EdgeAI Studio",
  niLabviewAI: "NI LabVIEW AI",
  pytorch: "PyTorch",
  ansysHFSS: "Ansys HFSS",
  keysightADS: "Keysight ADS",
  cstStudio: "CST Microwave Studio",
  niAWR: "NI AWR Microwave",
  sonnetEM: "Sonnet EM Simulator",
  ansysHFSSPlus: "Ansys HFSS Mesh AI",
  keysightAI: "Keysight PathWave AI",
  cstAI: "CST AI Sweep",
  mlSurrogate: "ML-Surrogate EM Models",
  gnuRadio: "GNU Radio",
  ns3: "NS-3",
  "omnet++": "OMNeT++",
  ciscoPacketTracer: "Cisco Packet Tracer",
  keysight: "Keysight PathWave",
  keilUVision: "Keil µVision",
  pspice: "PSpice",
  nodeRed: "Node-RED",
  gnuRadioAI: "GNU Radio AI",
  openAirInterface: "OpenAirInterface (OAI)"
};

export default function CompanyDetails() {
  const { id } = useParams<{ id: string }>();
  const company = mockCompanies.find(c => c.id === Number(id));

  if (!company) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-2xl font-bold mb-4">Company not found</h1>
        <Link to="/companies" className="text-primary hover:underline">
          Return to Companies
        </Link>
      </div>
    );
  }

  const interviewStages = [
    { key: 'aptitudeTest', label: 'Aptitude Test' },
    { key: 'coreTechnicalTest', label: 'Core Technical Test' },
    { key: 'groupDiscussion', label: 'Group Discussion' },
    { key: 'technicalInterview', label: 'Technical Interview' },
    { key: 'hrDiscussion', label: 'HR Discussion' }
  ];

  const { primary, secondary } = getCompanyDomains(company);

  const resourceLinks: Record<string, string> = {
    cpp: "https://www.learncpp.com",
    oops: "https://www.geeksforgeeks.org/object-oriented-programming-in-cpp/",
    python: "https://www.programiz.com/python-programming",
    dsa: "https://takeuforward.org",
    coreJava: "https://docs.oracle.com/javase/tutorial/",
    sql: "https://sqlbolt.com",
    dbms: "https://www.geeksforgeeks.org/dbms/",
    webDevelopment: "https://developer.mozilla.org",
    cyberSecurity: "https://tryhackme.com",
    ccna: "https://www.netacad.com",
    sap: "https://learning.sap.com",
    matlab: "https://in.mathworks.com/products/matlab.html"
  };

  const advancedTools = new Set<string>();
  if (company.coreSkillDomains) {
    Object.values(company.coreSkillDomains).forEach((domain) => {
      if (!domain) return;
      Object.entries(domain.traditionalTools || {}).forEach(([k, v]) => {
        if (v) advancedTools.add(k);
      });
      Object.entries(domain.aiTools || {}).forEach(([k, v]) => {
        if (v) advancedTools.add(k);
      });
    });
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Link to="/companies" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 font-medium transition-colors mb-8 bg-white border border-slate-200 px-4 py-2 rounded-full shadow-sm hover:shadow-md">
        <ArrowLeft className="w-4 h-4" />
        Back to Companies
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Dashboard Hero Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-12 relative overflow-hidden shadow-2xl mb-8">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[80px] pointer-events-none -translate-x-1/3 translate-y-1/3" />
          
          <div className="flex flex-col lg:flex-row gap-8 lg:items-center justify-between relative z-10">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center p-3 shadow-inner hover:scale-105 transition-transform shrink-0">
                <CompanyLogo
                  website={company.website}
                  companyName={company.companyName}
                  logoUrl={company.logoUrl}
                  className="w-full h-full rounded-xl"
                  iconClassName="w-12 h-12"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-4">
                  <h1 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight text-white">{company.companyName}</h1>
                  <span className={cn("px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border backdrop-blur-md", 
                    company.offerType.includes("Marquee") ? "bg-orange-500/20 text-orange-300 border-orange-500/40" :
                    company.offerType.includes("Super Dream") ? "bg-purple-500/20 text-purple-300 border-purple-500/40" :
                    company.offerType.includes("Dream") ? "bg-blue-500/20 text-blue-300 border-blue-500/40" :
                    "bg-green-500/20 text-green-300 border-green-500/40"
                  )}>
                    {company.offerType}
                  </span>
                </div>
                <p className="text-slate-400 text-sm font-bold tracking-wide uppercase">{company.role}</p>
                <div className="flex flex-wrap gap-3 text-sm mt-2">
                  <div className="flex items-center gap-2 text-slate-200 bg-white/5 px-4 py-2 rounded-2xl border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
                    <IndianRupee className="w-4 h-4 text-emerald-400" />
                    <span className="font-semibold">{company.ctc}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-200 bg-white/5 px-4 py-2 rounded-2xl border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
                    <Briefcase className="w-4 h-4 text-sky-400" />
                    <span className="font-medium">{primary}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-200 bg-white/5 px-4 py-2 rounded-2xl border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
                    <GraduationCap className="w-4 h-4 text-purple-400" />
                    <span className="font-medium">{company.eligibleColleges.join(", ")}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="shrink-0 w-full lg:w-auto">
              <a href={company.website || "#"} target="_blank" rel="noopener noreferrer" className="w-full lg:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-background font-bold text-sm rounded-2xl hover:bg-primary-dark transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20">
                <ExternalLink className="w-4 h-4" />
                Careers Portal
              </a>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info (Left Column) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Restored Important Notes */}
            <div className="bg-amber-50/50 border border-amber-200/60 rounded-3xl p-6 md:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center border border-amber-200">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="text-xl font-display font-bold text-amber-900">Important Details</h2>
              </div>
              <div className="relative z-10">
                {company.importantNotes && company.importantNotes.length > 0 ? (
                  <ul className="space-y-3">
                    {company.importantNotes.map((note, idx) => (
                      <li key={idx} className="flex gap-3 text-sm text-amber-900/80 leading-relaxed font-medium">
                        <ChevronRight className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-amber-900/80 leading-relaxed font-medium">
                    Prepare thoroughly for coding rounds and revise core ECE concepts. Focus on explainability of projects listed in your resume.
                  </p>
                )}
              </div>
            </div>

            {/* Redesigned Interview Process Stepper */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center border border-emerald-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
                <h2 className="text-xl font-display font-bold text-slate-800">Recruitment Tracker</h2>
              </div>
              
              <div className="space-y-6 relative pl-4 mt-4">
                {/* Vertical timeline line */}
                <div className="absolute left-[11px] top-6 bottom-6 w-[2px] bg-slate-100" />
                
                {interviewStages.map((stage, idx) => {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const isActive = (company.interviewProcess as any)[stage.key];
                  return (
                    <div key={idx} className="flex gap-6 relative group">
                      <div className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center border-2 shrink-0 z-10 bg-white transition-all duration-300 mt-1",
                        isActive 
                          ? "border-emerald-500 text-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.15)]" 
                          : "border-slate-200 text-slate-300"
                      )}>
                        {isActive ? (
                          <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                        )}
                      </div>
                      
                      <div className="flex-1 pb-4">
                        <h4 className={cn(
                          "text-base font-bold transition-colors duration-300",
                          isActive ? "text-slate-800" : "text-slate-400 font-medium"
                        )}>
                          {stage.label}
                        </h4>
                        
                        {isActive && (
                          <div className="mt-3 text-sm text-slate-600 bg-slate-50 border border-slate-100 rounded-2xl p-4 shadow-sm">
                            {stage.key === 'aptitudeTest' && (
                              <div className="space-y-2">
                                <p className="font-medium">Evaluates speed, quantitative aptitude, and logic.</p>
                                <a href="https://www.indiabix.com/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 hover:underline inline-flex items-center gap-1 font-bold text-xs">
                                  Prepare on IndiaBix <ExternalLink className="w-3 h-3" />
                                </a>
                              </div>
                            )}
                            {stage.key === 'coreTechnicalTest' && (
                              <p className="font-medium">Written/Coding test covering core topics, programming fundamentals, and problem solving.</p>
                            )}
                            {stage.key === 'groupDiscussion' && (
                              <p className="font-medium">Tests communication, presentation, and team collaboration skills under time limits.</p>
                            )}
                            {stage.key === 'technicalInterview' && (
                              <p className="font-medium">Deep-dive into core academic subjects, programming logic, projects, and problem solving.</p>
                            )}
                            {stage.key === 'hrDiscussion' && (
                              <p className="font-medium">Behavioral assessment covering corporate adaptability, values, and relocation readiness.</p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Advanced ECE Domains */}
            {company.coreSkillDomains && Object.values(company.coreSkillDomains).some(d => d && (Object.values(d.traditionalTools || {}).some(v => v) || Object.values(d.aiTools || {}).some(v => v))) && (
              <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#eeefff] flex items-center justify-center">
                    <Cpu className="w-5 h-5 text-[#3b47c9]" />
                  </div>
                  <h2 className="text-xl font-display font-bold text-slate-900">ECE Tools</h2>
                </div>
                <div className="flex flex-col gap-6 relative">
                  {Object.entries(company.coreSkillDomains).map(([domain, data]) => {
                    if (!data) return null;
                    const tradTools = Object.entries(data.traditionalTools || {}).filter(([_, v]) => v).map(([k]) => k);
                    const aiToolsList = Object.entries(data.aiTools || {}).filter(([_, v]) => v).map(([k]) => k);
                    if (tradTools.length === 0 && aiToolsList.length === 0) return null;
                    
                    return (
                      <div key={domain} className={`bg-[#f8f9ff] border border-slate-200 rounded-2xl p-6 ${DOMAIN_BORDER_CLASSES[domain] || ''}`}>
                        <h3 className="font-display font-bold text-lg mb-6 text-slate-800">
                          {DOMAIN_DISPLAY_NAMES[domain] || domain.replace(/([A-Z])/g, ' $1').trim()}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4">
                          {tradTools.length > 0 && (
                            <div className="flex flex-col gap-3 items-start">
                              <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1 bg-gray-200/80 px-2 py-1 rounded-md">
                                Traditional Tools
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                                {tradTools.map(t => (
                                  <div key={t} className="w-full min-h-[44px] flex items-center justify-center text-center bg-white border border-gray-200 text-gray-700 text-[13px] font-semibold rounded-lg px-2 py-1.5 hover:bg-gray-50 transition-all select-none">
                                    {TOOL_DISPLAY_NAMES[t] || t.replace(/([A-Z])/g, ' $1').trim()}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          {aiToolsList.length > 0 && (
                            <div className="flex flex-col gap-3 items-start">
                              <div className="text-[10px] text-[#4a4ac0] font-bold uppercase tracking-wider mb-1 bg-[#e6e8fa] px-2 py-1 rounded-md">
                                AI-Enhanced Tools
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                                {aiToolsList.map(t => (
                                  <div key={t} className="w-full min-h-[44px] flex items-center justify-center text-center bg-[#e6e8fa]/60 border border-[#d2d5f0] text-[#4a4ac0] text-[13px] font-semibold rounded-lg px-2 py-1.5 hover:bg-[#e6e8fa] transition-all select-none">
                                    {TOOL_DISPLAY_NAMES[t] || t.replace(/([A-Z])/g, ' $1').trim()}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar (Right Column) */}
          <div className="space-y-8">
            {/* Required Skills Matrix */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm sticky top-24">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center border border-purple-100">
                  <Code2 className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-lg font-display font-bold text-slate-800">Required Skills</h2>
              </div>
              
              <div className="space-y-8">
                {/* Programming Section */}
                {Object.entries(company.programmingSkills).filter(([k, v]) => v && !advancedTools.has(k) && !['sql', 'dbms', 'cyberSecurity', 'ccna', 'sap', 'webDevelopment'].includes(k)).length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Programming</div>
                    </div>
                    <div className="flex flex-col gap-3">
                      {Object.entries(company.programmingSkills)
                        .filter(([k, v]) => v && !advancedTools.has(k) && !['sql', 'dbms', 'cyberSecurity', 'ccna', 'sap', 'webDevelopment'].includes(k))
                        .map(([skill]) => (
                          <div key={skill} className="flex flex-col gap-1.5 w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl hover:border-blue-400 hover:shadow-sm transition-all group">
                            <div className="flex items-center gap-2 text-sm font-bold text-slate-700 group-hover:text-blue-700 transition-colors">
                              <span className="capitalize">{skill.replace(/([A-Z])/g, ' $1').trim()}</span>
                            </div>
                            {resourceLinks[skill] && (
                              <a href={resourceLinks[skill]} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:text-blue-700 hover:underline inline-flex items-center gap-1 font-medium">
                                View Study Guide <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                )}
                
                {/* IT & Tools Section */}
                {Object.entries(company.programmingSkills).filter(([k, v]) => v && !advancedTools.has(k) && ['sql', 'dbms', 'cyberSecurity', 'ccna', 'sap', 'webDevelopment'].includes(k)).length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-purple-500" />
                      <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">IT & Databases</div>
                    </div>
                    <div className="flex flex-col gap-3">
                      {Object.entries(company.programmingSkills)
                        .filter(([k, v]) => v && !advancedTools.has(k) && ['sql', 'dbms', 'cyberSecurity', 'ccna', 'sap', 'webDevelopment'].includes(k))
                        .map(([skill]) => (
                          <div key={skill} className="flex flex-col gap-1.5 w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl hover:border-purple-400 hover:shadow-sm transition-all group">
                            <div className="flex items-center gap-2 text-sm font-bold text-slate-700 group-hover:text-purple-700 transition-colors">
                              <span className="capitalize">{skill.replace(/([A-Z])/g, ' $1').trim()}</span>
                            </div>
                            {resourceLinks[skill] && (
                              <a href={resourceLinks[skill]} target="_blank" rel="noopener noreferrer" className="text-xs text-purple-600 hover:text-purple-700 hover:underline inline-flex items-center gap-1 font-medium">
                                View Study Guide <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                )}
                
                {/* Core ECE Skills */}
                {Object.entries(company.coreSkills).filter(([k, v]) => v && !advancedTools.has(k)).length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-orange-500" />
                      <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Core ECE Concepts</div>
                    </div>
                    <div className="flex flex-col gap-3">
                      {Object.entries(company.coreSkills)
                        .filter(([k, v]) => v && !advancedTools.has(k))
                        .map(([skill]) => (
                          <div key={skill} className="flex flex-col gap-1.5 w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl hover:border-orange-400 hover:shadow-sm transition-all group">
                            <div className="flex items-center gap-2 text-sm font-bold text-slate-700 group-hover:text-orange-700 transition-colors">
                              <span className="capitalize">{skill.replace(/([A-Z])/g, ' $1').trim()}</span>
                            </div>
                            {resourceLinks[skill] && (
                              <a href={resourceLinks[skill]} target="_blank" rel="noopener noreferrer" className="text-xs text-orange-600 hover:text-orange-700 hover:underline inline-flex items-center gap-1 font-medium">
                                View Study Guide <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
