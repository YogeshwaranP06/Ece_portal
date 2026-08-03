const fs = require('fs');
let content = fs.readFileSync('src/data/companies.ts', 'utf8');

const updates = [
  { name: 'TCS', file: 'TCS-logo.jpg' },
  { name: 'Infosys', file: 'infosys-logo.webp' },
  { name: 'Capgemini', file: 'Capgemini-Logo.wine.png' },
  { name: 'Cisco', file: 'cisco-logo-0-2048x2048-1-1024x1024.png' },
  { name: 'DE Shaw', file: 'de-shaw.jpg' },
  { name: 'EY', file: 'ey.png' },
  { name: 'HCL Technologies', file: 'hcl logo.webp' },
  { name: 'KPMG', file: 'kpmg-logo-0.png' },
  { name: 'L&T', file: 'larsen-toubro-company-logo-computer-numerical-control-l-t-ecc-infra-others.jpg' },
  { name: 'Tata Elxsi', file: 'tata-elxsi-logo.png' }
];

updates.forEach(u => {
  const safeName = u.name.replace(/&/g, '\\&');
  // Match "companyName": "NAME",\s*"website": "URL",
  const regex = new RegExp(`("\\s*companyName\\s*"\\s*:\\s*"${safeName}"\\s*,\\s*"\\s*website\\s*"\\s*:\\s*"[^"]*"\\s*,\\s*)`, 'g');
  
  if (!content.includes(`"logoUrl": "/logos/${u.file}"`)) {
     content = content.replace(regex, `$1"logoUrl": "/logos/${u.file}",\n    `);
  }
});

fs.writeFileSync('src/data/companies.ts', content);
console.log('Done');
