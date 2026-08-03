export const MAIN_DOMAINS = [
  "Semiconductor",
  "Embedded Systems & Robotics",
  "Digital Signal Processing",
  "Communication Systems",
  "Software / IT",
];

export function getCompanyDomains(company: any): {
  primary: string;
  secondary?: string;
} {
  // We'll calculate scores for each domain based on company data
  const scores = {
    Semiconductor: 0,
    "Embedded Systems & Robotics": 0,
    "Digital Signal Processing": 0,
    "Communication Systems": 0,
    "Software / IT": 0,
  };

  const strToMatch = (
    company.domain +
    " " +
    company.type +
    " " +
    company.role
  ).toLowerCase();

  // Scoring based on explicit strings
  if (
    strToMatch.includes("semiconductor") ||
    strToMatch.includes("vlsi") ||
    strToMatch.includes("chip")
  )
    scores["Semiconductor"] += 50;
    
  if (
    strToMatch.includes("embedded") ||
    strToMatch.includes("robotics") ||
    strToMatch.includes("automotive") ||
    strToMatch.includes("automobile") ||
    strToMatch.includes("automation") ||
    strToMatch.includes("industrial")
  )
    scores["Embedded Systems & Robotics"] += 50;
  if (
    strToMatch.includes("dsp") ||
    strToMatch.includes("signal") ||
    strToMatch.includes("image processing")
  )
    scores["Digital Signal Processing"] += 50;
  if (
    strToMatch.includes("communication") ||
    strToMatch.includes("telecom") ||
    strToMatch.includes("networking") ||
    strToMatch.includes("rf ") ||
    strToMatch.includes("5g")
  )
    scores["Communication Systems"] += 50;
  if (
    strToMatch.includes("software") ||
    strToMatch.includes("it services") ||
    strToMatch.includes("it product") ||
    strToMatch.includes("cloud") ||
    strToMatch.includes("web") ||
    strToMatch.includes("data") ||
    strToMatch.includes("fintech") ||
    strToMatch.includes("backend")
  )
    scores["Software / IT"] += 50;

  // Scoring based on skills
  if (company.coreSkills?.vlsi) scores["Semiconductor"] += 5;
  if (company.coreSkills?.verilog) scores["Semiconductor"] += 5;
  if (company.coreSkills?.fpga) scores["Semiconductor"] += 5;
  if (company.coreSkills?.coreElectronics) scores["Semiconductor"] += 3;

  if (company.coreSkills?.embeddedC) scores["Embedded Systems & Robotics"] += 5;
  if (company.coreSkills?.autosar) scores["Embedded Systems & Robotics"] += 5;
  if (company.coreSkills?.plcScada) scores["Embedded Systems & Robotics"] += 5;
  if (company.coreSkills?.linux) scores["Embedded Systems & Robotics"] += 3;

  if (company.coreSkills?.dsp) scores["Digital Signal Processing"] += 5;
  if (company.coreSkills?.matlab) scores["Digital Signal Processing"] += 4;

  if (company.programmingSkills?.ccna) scores["Communication Systems"] += 5;

  if (company.programmingSkills?.webDevelopment) scores["Software / IT"] += 5;
  if (company.programmingSkills?.dbms) scores["Software / IT"] += 4;
  if (company.programmingSkills?.sql) scores["Software / IT"] += 3;
  if (company.programmingSkills?.dsa) scores["Software / IT"] += 3;
  if (company.programmingSkills?.coreJava || company.programmingSkills?.python)
    scores["Software / IT"] += 2;

  // Sort domains by score
  const sortedDomains = Object.entries(scores)
    .filter(([_, score]) => score > 0)
    .sort((a, b) => b[1] - a[1]);

  if (sortedDomains.length === 0) {
    return { primary: "Software / IT" }; // Default fallback
  }

  const primary = sortedDomains[0][0];
  let secondary: string | undefined = undefined;

  if (sortedDomains.length > 1 && sortedDomains[1][1] >= 5) {
    secondary = sortedDomains[1][0];
  }

  return { primary, secondary };
}
