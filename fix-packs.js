const fs = require('fs');
const path = require('path');

const files = [
  'react-rendering-engine.ts',
  'hooks-mental-models.ts',
  'react-performance.ts',
  'async-ux-patterns.ts',
  'modern-react.ts'
];

for (const file of files) {
  const filePath = path.join(__dirname, 'src/data/curriculum/packs', file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Replace import
  content = content.replace("import { CurriculumPack } from '../index';", "import { TopicPack } from \"@/types/curriculum\";\nimport { TOPICS } from \"../taxonomy\";");
  
  // Match topicId: "..."
  const topicIdMatch = content.match(/topicId:\s*"([^"]+)"/);
  if (!topicIdMatch) {
    console.log("No topicId found in", file);
    continue;
  }
  const topicId = topicIdMatch[1];
  
  // Replace top level struct
  content = content.replace(
    /export const (\w+): CurriculumPack = \{\n\s*topicId: "[^"]+",\n\s*cards: \[/,
    `const topicData = TOPICS.find(t => t.id === "${topicId}")!;\n\nexport const $1: TopicPack = {\n  topic: topicData,\n  activities: [`
  );
  
  // Replace types and add fields
  content = content.replace(/(\s+)type:\s*"([^"]+)",/g, (match, space, type) => {
    // Fix topic-complete -> checkpoint
    let actualType = type;
    if (actualType === "topic-complete") actualType = "checkpoint";

    let category = "practice";
    if (actualType === "why-it-matters") category = "learn";
    if (actualType === "explain" || actualType === "checkpoint" || actualType === "interview") category = "evaluate";
    if (actualType === "code-completion") category = "implementation";
    
    return `${space}topicId: "${topicId}",${space}objectiveId: topicData.objectives[0],${space}category: "${category}",${space}difficulty: "intermediate",${space}type: "${actualType}",`;
  });
  
  fs.writeFileSync(filePath, content);
  console.log("Fixed", file);
}
