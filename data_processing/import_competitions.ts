import fs from 'fs';
import path from 'path';
import { mockHackathons } from './src/data/hackathons';

const jsonPath = path.join(process.cwd(), 'competitions_data.json');
const rawData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// The first row might be headers
const data = rawData.filter((row: any) => row['Unnamed: 1'] !== 'Competition Name');

let currentMaxId = mockHackathons.reduce((max, h) => (h.id > max ? h.id : max), 0);

const newEvents = data.map((row: any) => {
  currentMaxId++;
  const title = row['Unnamed: 1'] || 'Unknown Competition';
  const org = row['Unnamed: 2'] || 'Unknown Organization';
  
  // Parse domains, comma separated
  const rawDomain = row['Unnamed: 3'] || '';
  const domain = rawDomain.split(/[\/,+]/).map((s: string) => s.trim()).filter(Boolean);
  
  const eventType = row['Unnamed: 4'] || 'Competition';
  const desc = row['Unnamed: 8'] || '';
  const prizePool = row['Unnamed: 5'] || 'TBA'; 
  
  return {
    id: currentMaxId,
    title,
    organization: org,
    date: 'TBA',
    mode: 'Hybrid', // Default
    domain: domain.length > 0 ? domain : ['Multi-domain'],
    description: desc,
    registrationLink: '#',
    prizePool: 'TBA',
    status: 'Upcoming',
    eventType
  };
});

// Update the source file
const hackathonsPath = path.join(process.cwd(), 'src/data/hackathons.ts');
let fileContent = fs.readFileSync(hackathonsPath, 'utf8');

// Ensure existing hackathons have eventType if missing
const existingEvents = mockHackathons.map(h => ({
  ...h,
  eventType: h.eventType || 'Hackathon'
}));

const allEvents = [...existingEvents, ...newEvents];

const newContent = `import { Hackathon } from "@/src/types";\n\nexport const mockHackathons: Hackathon[] = ${JSON.stringify(allEvents, null, 2)};\n`;

fs.writeFileSync(hackathonsPath, newContent);
console.log(`Successfully added ${newEvents.length} events to mockHackathons!`);
