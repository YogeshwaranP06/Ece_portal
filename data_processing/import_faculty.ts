import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rawData = JSON.parse(fs.readFileSync(path.join(__dirname, 'faculty_data.json'), 'utf8'));

// The actual data starts at index 4 (0-indexed)
const facultyData = [];
for (let i = 4; i < rawData.length; i++) {
  const row = rawData[i];
  if (row["Unnamed: 1"] && typeof row["Unnamed: 1"] === 'string') {
    facultyData.push({
      id: row[" "],
      name: row["Unnamed: 1"].trim(),
      softwareKnown: row["Unnamed: 2"].split(',').map(s => s.trim()).filter(s => s),
      hardwareKnown: row["Unnamed: 3"].split(',').map(s => s.trim()).filter(s => s)
    });
  }
}

const outDir = path.join(__dirname, 'src', 'data');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

fs.writeFileSync(path.join(outDir, 'faculty.json'), JSON.stringify(facultyData, null, 2));
console.log(`Successfully imported ${facultyData.length} faculty members.`);
