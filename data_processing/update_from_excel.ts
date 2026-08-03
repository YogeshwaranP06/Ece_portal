import fs from 'fs';
import { mockCompanies } from './src/data/companies.js';

const excelData = JSON.parse(fs.readFileSync('excel_skills.json', 'utf8'));

const updatedCompanies = mockCompanies.map(company => {
  const cName = company.companyName;
  const newData = excelData[cName];
  
  if (newData) {
    company.programmingSkills = {
      ...company.programmingSkills,
      ...newData.programmingSkills
    };
    
    company.coreSkills = {
      ...company.coreSkills,
      ...newData.coreSkills
    };
  }
  
  return company;
});

const content = `import { Company } from "@/src/types";

export const mockCompanies: Company[] = ${JSON.stringify(updatedCompanies, null, 2)};
`;

fs.writeFileSync('src/data/companies.ts', content);
console.log('Successfully updated companies.ts from Excel data');
