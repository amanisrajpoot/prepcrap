import * as fs from 'fs';
import * as path from 'path';

const args = process.argv.slice(2);
const topicId = args[0];

if (!topicId) {
  console.error("Usage: tsx accept-pack.ts promises");
  process.exit(1);
}

const jsonPath = path.join(__dirname, 'generated', `${topicId}.json`);
if (!fs.existsSync(jsonPath)) {
  console.error(`File not found: ${jsonPath}`);
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

// Auto-compute objective coverage
const objectiveCoverage: Record<string, string[]> = {};
const objectiveDifficulty: Record<string, string> = {};

data.objectives.forEach((obj: string) => {
  objectiveCoverage[obj] = [];
  objectiveDifficulty[obj] = "foundation"; 
});

data.activities.forEach((a: any, i: number) => {
  const id = `${data.topicId}-act-${i}`;
  const objName = data.activityPlan.find((p:any) => p.activities.includes(a.type))?.objective;
  if (objName && objectiveCoverage[objName]) {
    objectiveCoverage[objName].push(id);
    if (a.difficulty === 'advanced') objectiveDifficulty[objName] = 'advanced';
    else if (a.difficulty === 'intermediate' && objectiveDifficulty[objName] !== 'advanced') objectiveDifficulty[objName] = 'intermediate';
  }
});

const tsContent = `import { TopicPack } from "@/types/curriculum";

export const ${topicId.replace(/-/g, '')}Pack: TopicPack = {
  topic: {
    id: "${data.topicId}",
    moduleId: "generated", // Update manually
    trackId: "javascript", // Update manually
    title: "${data.topic}",
    order: 1,
    metadata: {
      difficulty: "${data.metadata.difficulty}",
      estimatedMinutes: 30,
      interviewFrequency: ${data.metadata.interviewFrequency},
      importance: ${data.metadata.importance},
      prerequisites: ${JSON.stringify(data.metadata.prerequisites)}
    },
    objectives: ${JSON.stringify(data.objectives, null, 4)}
  },
  activities: [
    ${data.activities.map((a: any, i: number) => `{
      id: "${data.topicId}-act-${i}",
      topicId: "${data.topicId}",
      objectiveId: "${data.activityPlan.find((p:any) => p.activities.includes(a.type))?.objective || "none"}",
      category: "${a.category || "practice"}",
      type: "${a.type}",
      difficulty: "${a.difficulty}",
      payload: ${JSON.stringify(a.payload, null, 6)}
    }`).join(',\n    ')},
    ${data.assessment.map((a: any, i: number) => `{
      id: "${data.topicId}-assess-${i}",
      topicId: "${data.topicId}",
      objectiveId: "none",
      category: "evaluate",
      type: "${a.type}",
      difficulty: "${a.difficulty}",
      payload: ${JSON.stringify(a.payload, null, 6)}
    }`).join(',\n    ')}
  ],
  objectiveCoverage: ${JSON.stringify(objectiveCoverage, null, 4)},
  objectiveDifficulty: ${JSON.stringify(objectiveDifficulty, null, 4)} as any
};
`;

const outPath = path.join(__dirname, '../../src/data/curriculum/packs', `${topicId}.ts`);
fs.writeFileSync(outPath, tsContent);
console.log(`✅ Pack compiled to: ${outPath}`);
