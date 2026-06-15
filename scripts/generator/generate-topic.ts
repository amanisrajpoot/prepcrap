import { createProvider } from './adapters';
import { getAvoidConcepts, addConcepts } from './state';
import * as fs from 'fs';
import * as path from 'path';

async function generateTopic(topic: string, topicId: string) {
  const llm = createProvider(process.env.LLM_PROVIDER || "gemini");
  
  console.log(`\n🚀 Starting Generation Pipeline for: ${topic}`);
  
  // Stage 1: Topic Analysis
  console.log(`\n[Stage 1] Analyzing Topic...`);
  const metadata = await llm.analyzeTopic(topic);
  console.log(`  Importance: ${metadata.importance}/10, Difficulty: ${metadata.difficulty}`);
  
  // Anti-Redundancy
  const avoidConcepts = getAvoidConcepts(topicId);
  console.log(`  Avoid Concepts: ${avoidConcepts.length}`);

  // Stage 2: Objective Generation
  console.log(`\n[Stage 2] Generating Objectives...`);
  const objectives = await llm.generateObjectives(topic, metadata, avoidConcepts);
  console.log(`  Generated ${objectives.length} objectives.`);
  
  const finalOutput: any = {
    topic: topic,
    topicId: topicId,
    metadata,
    objectives: objectives.map(o => o.objective),
    activityPlan: [],
    activities: [],
    assessment: null
  };

  // Stage 3 & 4: Activity Planning & Generation
  for (const obj of objectives) {
    console.log(`\n[Stage 3] Planning Activities for: "${obj.objective}"`);
    const plan = await llm.planActivities(topic, obj.objective);
    finalOutput.activityPlan.push(plan);
    
    console.log(`[Stage 4] Generating Content for: [${plan.activities.join(', ')}]`);
    const activities = await llm.generateActivities(topic, plan, avoidConcepts);
    finalOutput.activities.push(...activities);
    
    addConcepts(topicId, [obj.objective], [obj.objective]);
  }

  // Stage 5: Assessments
  console.log(`\n[Stage 5] Generating Assessments...`);
  const assessments = await llm.generateAssessments(topic, objectives.map(o => o.objective));
  finalOutput.assessment = assessments;
  
  // Write output
  const outPath = path.join(__dirname, 'generated', `${topicId}.json`);
  if (!fs.existsSync(path.dirname(outPath))) {
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
  }
  fs.writeFileSync(outPath, JSON.stringify(finalOutput, null, 2));
  
  console.log(`\n✅ Generation Complete! Review content at: ${outPath}`);
  console.log(`Run 'npm run accept ${topicId}' to compile into the app.`);
}

const args = process.argv.slice(2);
const topicArg = args.find(a => a.startsWith('--topic='));
const idArg = args.find(a => a.startsWith('--id='));

if (!topicArg || !idArg) {
  console.error("Usage: tsx generate-topic.ts --topic=\"Promises\" --id=\"promises\"");
  process.exit(1);
}

generateTopic(topicArg.split('=')[1], idArg.split('=')[1]);
