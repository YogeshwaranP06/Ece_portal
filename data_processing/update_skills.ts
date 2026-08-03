import fs from 'fs';
import { mockCompanies } from './src/data/companies.js';

const domainSkills = JSON.parse(fs.readFileSync('domain_skills.json', 'utf8'));

const programmingMapping: Record<string, string> = {
  "C / C++": "cpp",
  "OOPS": "oops",
  "Python": "python",
  "Data Structures & Algorithms": "dsa",
  "Core Java": "coreJava",
  "SAP": "sap",
  "SQL": "sql",
  "Cyber Security": "cyberSecurity",
  "DBMS": "dbms",
  "CCNA": "ccna",
  "Web Application.": "webDevelopment"
};

const coreSkillsMapping: Record<string, string> = {
  "LINUX": "linux",
  "Verilog": "verilog",
  "VLSI & Digital Design": "vlsi", // sometimes it's mapped differently, let's keep it
  "Embedded C": "embeddedC",
  "MATLAB": "matlab",
  "AUTOSAR": "autosar"
};

const advancedToolsMapping: Record<string, any> = {
  "vlsiAndDigitalDesign": {
    "traditionalTools": {
      "Cadence": "cadence",
      "Synopsys": "synopsys",
      "Siemens Questa / ModelSim": "siemens",
      "Xilinx Vivado": "xilinxVivado",
      "MATLAB HDL Coder": "matlab",
      "OpenROAD": "openRoad",
      "MagicVLSI": "magicVLSI",
      "Python (PyRTL / Amaranth)": "python",
      "Verilog": "verilog",
      "System          Verilog": "systemVerilog"
    },
    "aiTools": {
      "Synopsys DSO.ai": "synopsysAI",
      "Cadence Cerebrus": "cadenceAI",
      "Siemens EDA Calibre AI": "siemensAI",
      "Google AlphaChip / DeepChip": "googleAI",
      "GitHub Copilot (RTL)": "githubCopilot",
      "Nvidia Modulus (EDA)": "nvidiaAI"
    }
  },
  "embeddedSystemsAndFirmware": {
    "traditionalTools": {
      "Keil": "keil",
      "STM32                CubeIDE": "stm32",
      "Arduino IDE": "arduino",
      "RTOS": "rtos",
      "Embedded C": "embeddedC",
      "ARM Cortex": "arm",
      "AUTOSAR": "autosar"
    },
    "aiTools": {
      "GitHub Copilot + IAR AI": "githubCopilot",
      "Keil Studio + AI code assist": "keilStudio",
      "AWS IoT ExpressLink + AI scheduling": "awsIot",
      "Parasoft C/C++test + AI fix suggestions": "parasoft"
    }
  },
  "signalProcessingAndDSP": {
    "traditionalTools": {
      "MATLAB": "matlab",
      "Simulink": "simulink",
      "Python DSP Libraries": "pythonDSP",
      "LabVIEW DSP": "labview",
      "Texas Instruments Code Composer": "texasInstruments",
      "TensorFlow": "tensorflow",
      "UDA Toolki": "udaToolki"
    },
    "aiTools": {
      "MATLAB AI Toolbox + Deep Learning Toolbox": "matlabAI",
      "GNU Radio + PyTorch RF-ML blocks": "gnuRadioAI",
      "TI EdgeAI Studio AI": "tiEdgeAI",
      "NI LabVIEW AI Signal Analysis toolkit": "labviewAI",
      "PyTorch / TensorFlow Signal processing": "pytorchTensorflow"
    }
  },
  "rfWirelessAndAntennaEngineering": {
    "traditionalTools": {
      "Ansys HFSS": "ansys",
      "Keysight ADS": "keysight",
      "CST Microwave Studio": "cst",
      "GNU Radio": "gnuRadio",
      "NI AWR Microwave Office": "niAwr",
      "Sonnet EM Simulator": "sonnet"
    },
    "aiTools": {
      "Ansys HFSS + AI-driven mesh optimization": "ansysAI",
      "Keysight PathWave + PathWave AI": "keysightAI",
      "3DS CST + AI Parametric Sweep": "cstAI",
      "Cadence AWR + AI circuit synthesis": "cadenceAwrAI",
      "ML-surrogate EM models (DeepMind / internal)": "mlSurrogate"
    }
  },
  "communicationSystemsAndProtocols": {
    "traditionalTools": {
      "GNU Radio.1": "gnuRadio",
      "GNU Radio.2": "gnuRadio",
      "GNU Radio.3": "gnuRadio",
      "GNU Radio": "gnuRadio",
      "NS-3": "ns3",
      "OMNeT++": "omnet",
      "Cisco Packet Tracer": "cisco",
      "Keysight PathWave": "keysight",
      "Keil µVision": "keilVision",
      "PSpice": "pspice",
      "Node-RED": "nodeRed"
    },
    "aiTools": {
      "MATLAB & Simulink AI Toolbox": "matlabAI",
      "TensorFlow.1": "tensorflow",
      "TensorFlow": "tensorflow",
      "PyTorch": "pytorch",
      "OpenAirInterface (OAI)": "openAirInterface"
    }
  }
};

const updatedCompanies = mockCompanies.map(company => {
  const domain = company.domain;
  const skillsList = domainSkills[domain] || [];

  // reset skills to false first
  for (const k in company.programmingSkills) {
    (company.programmingSkills as any)[k] = false;
  }
  for (const k in company.coreSkills) {
    (company.coreSkills as any)[k] = false;
  }
  
  if (company.coreSkillDomains) {
      for (const d in company.coreSkillDomains) {
          const dom = (company.coreSkillDomains as any)[d];
          if (dom) {
              if (dom.traditionalTools) {
                  for (const t in dom.traditionalTools) {
                      dom.traditionalTools[t] = false;
                  }
              }
              if (dom.aiTools) {
                  for (const t in dom.aiTools) {
                      dom.aiTools[t] = false;
                  }
              }
          }
      }
  }

  // update based on list
  for (const s of skillsList) {
    if (programmingMapping[s]) {
      (company.programmingSkills as any)[programmingMapping[s]] = true;
    } else if (coreSkillsMapping[s]) {
      (company.coreSkills as any)[coreSkillsMapping[s]] = true;
    }
    
    // check advanced tools
    if (company.coreSkillDomains) {
        for (const dom in advancedToolsMapping) {
            const mappings = advancedToolsMapping[dom];
            
            if (mappings.traditionalTools[s]) {
               if (!(company.coreSkillDomains as any)[dom]) (company.coreSkillDomains as any)[dom] = {};
               if (!(company.coreSkillDomains as any)[dom].traditionalTools) (company.coreSkillDomains as any)[dom].traditionalTools = {};
               (company.coreSkillDomains as any)[dom].traditionalTools[mappings.traditionalTools[s]] = true;
            }
            if (mappings.aiTools[s]) {
               if (!(company.coreSkillDomains as any)[dom]) (company.coreSkillDomains as any)[dom] = {};
               if (!(company.coreSkillDomains as any)[dom].aiTools) (company.coreSkillDomains as any)[dom].aiTools = {};
               (company.coreSkillDomains as any)[dom].aiTools[mappings.aiTools[s]] = true;
            }
        }
    }
  }

  return company;
});

const content = `import { Company } from "@/src/types";

export const mockCompanies: Company[] = ${JSON.stringify(updatedCompanies, null, 2)};
`;

fs.writeFileSync('src/data/companies.ts', content);
console.log('Successfully updated companies.ts');
