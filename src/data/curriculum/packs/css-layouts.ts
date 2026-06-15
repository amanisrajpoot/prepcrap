import { TopicPack } from "@/types/curriculum";
import { TOPICS } from "../taxonomy";

const topicData = TOPICS.find(t => t.id === "css-layouts")!;

export const cssLayoutsPack: TopicPack = {
  topic: topicData,
  activities: [
    {
      id: "cl-intro",
      topicId: "css-layouts",
      objectiveId: topicData.objectives[0],
      category: "learn",
      type: "why-it-matters",
      difficulty: "intermediate",
      payload: {
        topic: "Modern Layouts (Flexbox vs Grid)",
        explanation: "Before modern CSS, developers used floats and table hacks for layouts. Today, we have two native powerhouses: Flexbox and CSS Grid. The core distinction is dimensional: Flexbox is for 1-Dimensional layouts (a single row or a single column), making it perfect for navigation bars and aligning items. CSS Grid is for 2-Dimensional layouts (rows AND columns simultaneously), making it perfect for full-page structures and masonry galleries.",
        interviewContext: "Knowing when to use Grid vs Flexbox shows deep CSS mastery. 'Flexbox is for content, Grid is for layout' is a great rule of thumb."
      }
    },
    {
      id: "cl-scenario-grid",
      topicId: "css-layouts",
      objectiveId: topicData.objectives[0],
      category: "practice",
      type: "scenario",
      difficulty: "intermediate",
      payload: {
        question: "The Masonry Gallery",
        scenario: "You need to build a photo gallery where images have different heights, but they neatly pack into a multi-column grid (like Pinterest). A junior dev tries to use `display: flex; flex-wrap: wrap;` but the rows are misaligned.",
        options: [
          {
            id: "opt1",
            text: "Add margins to the flex items to force them into place.",
            isCorrect: false,
            explanation: "This is a brittle hack that will break on different screen sizes."
          },
          {
            id: "opt2",
            text: "Use CSS Grid instead.",
            isCorrect: true,
            explanation: "Correct! CSS Grid is explicitly designed for 2D layouts where items span across rows and columns. Flexbox only cares about the current line it is wrapping, which ruins the vertical alignment of a masonry layout."
          },
          {
            id: "opt3",
            text: "Use JavaScript to calculate absolute positions for every image.",
            isCorrect: false,
            explanation: "This was the old way (e.g., Masonry.js), but it's terrible for performance compared to native CSS Grid."
          }
        ]
      }
    },
    {
      id: "cl-explain-responsive",
      topicId: "css-layouts",
      objectiveId: topicData.objectives[1],
      category: "evaluate",
      type: "explain",
      difficulty: "advanced",
      payload: {
        prompt: "How can you build a responsive card grid without using any Media Queries?",
        modelAnswer: "By using CSS Grid with `auto-fit` and `minmax`. For example: `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));`. This tells the browser: 'Make as many columns as possible, but ensure each column is at least 250px wide. If there isn't enough space for 250px, wrap the item to the next row and let it stretch (1fr).' This creates a fluid, responsive layout entirely natively.",
        interviewContext: "This specific line of CSS is considered the holy grail of modern responsive design."
      }
    },
    {
      id: "cl-complete",
      topicId: "css-layouts",
      objectiveId: topicData.objectives[0],
      category: "evaluate",
      type: "checkpoint",
      difficulty: "foundation",
      payload: {
        topicTitle: "Modern Layouts",
        topicId: "css-layouts"
      }
    }
  ]
};
