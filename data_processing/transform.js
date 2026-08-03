import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.resolve(__dirname, 'src/data/hackathons.ts');
let content = fs.readFileSync(filePath, 'utf-8');

let jsonPart = content.replace('import { Hackathon } from "@/src/types";', '')
                      .replace('export const mockHackathons: Hackathon[] = ', '')
                      .replace(/;\s*$/, '');

const mockHackathons = eval('(' + jsonPart + ')');

const filtered = mockHackathons.filter(h => h.title !== "Flipkart GRiD 8.0");

const parseEndDate = (dateStr) => {
  const d = dateStr.toLowerCase();
  if (d.includes('self-paced')) return '2099-12-31';
  if (d.includes('jul 7')) return '2026-07-07';
  if (d.includes('jan 19 - 24, 2027')) return '2027-01-24';
  if (d.includes('jul') && !d.includes('2026')) return '2026-07-31';
  if (d.includes('sep 29, 2026')) return '2026-09-29';
  if (d.includes('jul - aug 2026')) return '2026-08-31';
  if (d.includes('dec (tentative)')) return '2027-12-31';
  if (d.includes('feb 3-4, 2027')) return '2027-02-04';
  if (d.includes('oct 31 - nov 1, 2026')) return '2026-11-01';
  if (d.includes('october 29, 2026')) return '2026-10-29';
  if (d.includes('july 11, 2026')) return '2026-07-11';
  if (d.includes('october 23-24, 2026')) return '2026-10-24';
  if (d.includes('jun-dec 2026')) return '2026-12-31';
  if (d.includes('oct 31, 2026')) return '2026-10-31';
  if (d.includes('aug 18, 2026')) return '2026-08-18';
  if (d.includes('jul 1 - 20, 2026')) return '2026-07-20';
  if (d.includes('jul 10 - 16, 2026')) return '2026-07-16';
  if (d.includes('aug 7 - 13, 2026')) return '2026-08-13';
  if (d.includes('sep 11 - 17, 2026')) return '2026-09-17';
  if (d.includes('jun 10 - jul 10, 2026')) return '2026-07-10';
  if (d.includes('aug 14, 2026')) return '2026-08-14';
  if (d.includes('sep 18, 2026')) return '2026-09-18';
  if (d.includes('aug 20, 2026')) return '2026-08-20';

  return '2026-12-31';
};

const updated = filtered.map(h => ({
  ...h,
  registrationEndDate: parseEndDate(h.date)
}));

const newContent = "import { Hackathon } from \"@/src/types\";\n\nexport const mockHackathons: Hackathon[] = " + JSON.stringify(updated, null, 2) + ";\n";

fs.writeFileSync(filePath, newContent, 'utf-8');
console.log('Successfully updated hackathons.ts');
