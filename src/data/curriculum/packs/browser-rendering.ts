import { TopicPack } from "@/types/curriculum";
import { TOPICS } from "../taxonomy";

const topicData = TOPICS.find(t => t.id === "browser-rendering")!;

export const browserRenderingPack: TopicPack = {
  topic: topicData,
  activities: [
    {
      id: "br-intro",
      topicId: "browser-rendering",
      objectiveId: topicData.objectives[0],
      category: "learn",
      type: "why-it-matters",
      difficulty: "intermediate",
      payload: {
        topic: "Critical Rendering Path",
        explanation: "The browser's job is to turn HTML, CSS, and JS into pixels on a screen. Every time you change a style in JS, the browser has to recalculate Layout (Reflow), Paint, and Composite. Junior devs animate `margin-left` which forces Layout calculations on every single frame, causing jank. Senior devs animate `transform` which skips Layout and Paint, running purely on the GPU.",
        interviewContext: "Understanding Reflow vs Repaint is one of the most common frontend performance interview questions."
      }
    },
    {
      id: "br-scenario-animation",
      topicId: "browser-rendering",
      objectiveId: topicData.objectives[1],
      category: "practice",
      type: "scenario",
      difficulty: "advanced",
      payload: {
        question: "The Janky Animation",
        scenario: "You have a slide-out sidebar. You animate its width from 0px to 300px using CSS transitions. Users on cheap Android phones report the animation stutters terribly.",
        options: [
          {
            id: "opt1",
            text: "Change it to animate transform: translateX() instead of width.",
            isCorrect: true,
            explanation: "Correct! Animating width forces the browser to recalculate the Layout (Reflow) of the sidebar and potentially all its children on every frame. Animating transform skips Layout and Paint, doing the work entirely on the GPU during the Composite phase."
          },
          {
            id: "opt2",
            text: "Use requestAnimationFrame in JavaScript instead of CSS transitions.",
            isCorrect: false,
            explanation: "JS vs CSS is not the issue here. The issue is animating a layout-triggering property (width) vs a composite-triggering property (transform)."
          },
          {
            id: "opt3",
            text: "Add will-change: width to the CSS.",
            isCorrect: false,
            explanation: "will-change might put it on its own layer, but changing width STILL forces a reflow. It does not fix the root cause."
          }
        ]
      }
    },
    {
      id: "br-explain-reflow",
      topicId: "browser-rendering",
      objectiveId: topicData.objectives[0],
      category: "evaluate",
      type: "explain",
      difficulty: "intermediate",
      payload: {
        prompt: "What is the difference between a Reflow (Layout) and a Repaint in the browser?",
        modelAnswer: "A Reflow (or Layout) occurs when the geometry of the page changes (e.g., width, height, margin, position). The browser must recalculate the exact position and size of all elements. A Repaint occurs when visual styles change but geometry does not (e.g., color, background-color, visibility). Reflows are much more expensive than Repaints because they often trigger a chain reaction of layout recalculations across the DOM tree.",
        interviewContext: "Be prepared to give examples: 'changing width causes Reflow, changing color causes Repaint'."
      }
    },
    {
      id: "br-incident-parser-blocking",
      topicId: "browser-rendering",
      objectiveId: topicData.objectives[1],
      category: "practice",
      type: "incident",
      difficulty: "advanced",
      payload: {
        question: "The White Screen of Death",
        incident: "PagerDuty Alert!\n\nThe marketing site is taking 4 seconds to show any content (First Contentful Paint). You check the network tab. The HTML downloads in 50ms, but there is a massive <script src=\"analytics.js\"></script> tag in the <head> that takes 3.9 seconds to download and execute.",
        options: [
          {
            id: "opt1",
            text: "Move the script to the bottom of the <body>.",
            explanation: "This works, but a better modern approach is to add the 'defer' or 'async' attribute so it downloads in parallel without blocking the HTML parser.",
            isCorrect: false
          },
          {
            id: "opt2",
            text: "Add the 'defer' attribute to the script tag.",
            explanation: "Correct! Synchronous scripts block the HTML parser because they could potentially call document.write(). By adding 'defer', the script downloads in parallel but guarantees it won't execute until the HTML is fully parsed, preventing it from blocking the render.",
            isCorrect: true
          },
          {
            id: "opt3",
            text: "Minify the script.",
            explanation: "Minifying helps, but a synchronous script will still completely block the DOM construction while it downloads and parses.",
            isCorrect: false
          }
        ]
      }
    },
    {
      id: "br-complete",
      topicId: "browser-rendering",
      objectiveId: topicData.objectives[0],
      category: "evaluate",
      type: "checkpoint",
      difficulty: "foundation",
      payload: {
        topicTitle: "Critical Rendering Path",
        topicId: "browser-rendering"
      }
    }
  ]
};
