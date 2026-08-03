export interface Company {
  id: number;
  companyName: string;
  website: string;
  logoUrl?: string;
  type: string;
  ctc: string;
  offerType: "Regular" | "Dream" | "Super Dream" | "Marquee" | "Regular / Dream" | "Dream / Super Dream" | "Super Dream / Marquee";
  domain: string;
  role: string;
  eligibleColleges: string[];
  interviewProcess: {
    aptitudeTest: boolean;
    coreTechnicalTest: boolean;
    groupDiscussion: boolean;
    technicalInterview: boolean;
    hrDiscussion: boolean;
  };
  programmingSkills: {
    cpp: boolean;
    oops: boolean;
    python: boolean;
    dsa: boolean;
    coreJava: boolean;
    sap: boolean;
    sql: boolean;
    cyberSecurity: boolean;
    dbms: boolean;
    ccna: boolean;
    webDevelopment: boolean;
  };
  coreSkills: {
    linux: boolean;
    verilog: boolean;
    vlsi: boolean;
    fpga: boolean;
    embeddedC: boolean;
    plcScada: boolean;
    matlab: boolean;
    autosar: boolean;
    coreElectronics: boolean;
    dsp: boolean;
  };
  importantNotes?: string[];
  coreSkillDomains?: {
    vlsiAndDigitalDesign?: {
      traditionalTools?: Record<string, boolean>;
      aiTools?: Record<string, boolean>;
    };
    embeddedSystemsAndFirmware?: {
      traditionalTools?: Record<string, boolean>;
      aiTools?: Record<string, boolean>;
    };
    signalProcessingAndDSP?: {
      traditionalTools?: Record<string, boolean>;
      aiTools?: Record<string, boolean>;
    };
    rfWirelessAndAntennaEngineering?: {
      traditionalTools?: Record<string, boolean>;
      aiTools?: Record<string, boolean>;
    };
    communicationSystemsAndProtocols?: {
      traditionalTools?: Record<string, boolean>;
      aiTools?: Record<string, boolean>;
    };
  };
}

export interface Hackathon {
  id: number;
  title: string;
  organization: string;
  date: string;
  mode: "Online" | "Offline" | "Hybrid" | string;
  location?: string;
  domain: string[];
  description: string;
  registrationLink: string;
  prizePool: string;
  status: "Upcoming" | "Ongoing" | "Completed" | string;
  eventType?: string;
  registrationEndDate?: string;
}
