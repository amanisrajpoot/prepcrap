const { execSync } = require('child_process');

const topics = [
  { topic: "React Rendering Engine", id: "react-rendering-engine" },
  { topic: "Hooks Mental Models", id: "hooks-mental-models" },
  { topic: "React Performance", id: "react-performance" },
  { topic: "Async UX Patterns", id: "async-ux-patterns" },
  { topic: "State Architecture", id: "state-architecture" }
];

async function run() {
  for (const { topic, id } of topics) {
    console.log(`\n\n=== Generating ${topic} ===`);
    try {
      execSync(`npx tsx scripts/generator/generate-topic.ts --topic="${topic}" --id="${id}"`, { stdio: 'inherit' });
      execSync(`npm run accept -- ${id}`, { stdio: 'inherit' });
      
      console.log(`\n✅ Generated and accepted ${topic}. Waiting 60 seconds to respect API rate limits...`);
      // Wait 60 seconds
      await new Promise(r => setTimeout(r, 60000));
    } catch (e) {
      console.error(`\n❌ Failed to generate ${topic}:`, e.message);
      console.log(`Waiting 60 seconds before trying next...`);
      await new Promise(r => setTimeout(r, 60000));
    }
  }
  console.log("\n🎉 All packs generated!");
}

run();
