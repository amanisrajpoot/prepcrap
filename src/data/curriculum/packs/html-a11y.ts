import { TopicPack } from "@/types/curriculum";
import { TOPICS } from "../taxonomy";

const topicData = TOPICS.find(t => t.id === "html-a11y")!;

export const htmlA11yPack: TopicPack = {
  topic: topicData,
  activities: [
    {
      id: "ha-intro",
      topicId: "html-a11y",
      objectiveId: topicData.objectives[0],
      category: "learn",
      type: "why-it-matters",
      difficulty: "intermediate",
      payload: {
        topic: "Semantic HTML & Accessibility",
        explanation: "Accessibility (a11y) is not a 'nice to have'—it is a legal requirement and a core pillar of modern web development. The easiest way to break accessibility is by ignoring semantic HTML. If you attach an `onClick` to a `<div>` to make it act like a button, it is invisible to screen readers, cannot be focused via the Tab key, and won't respond to the Enter key. Using the correct semantic tags (`<button>`, `<nav>`, `<main>`) gives you 90% of accessibility for free.",
        interviewContext: "If an interviewer asks you to build a component and you use a clickable `<div>` instead of a `<button>`, it is an immediate red flag for senior roles."
      }
    },
    {
      id: "ha-scenario-button",
      topicId: "html-a11y",
      objectiveId: topicData.objectives[1],
      category: "practice",
      type: "scenario",
      difficulty: "intermediate",
      payload: {
        question: "The Clickable Div",
        scenario: "You review a junior developer's PR. They built a custom dropdown toggle like this: `<div class='dropdown-toggle' onClick={toggleMenu}>Menu</div>`. What is the primary issue with this code?",
        options: [
          {
            id: "opt1",
            text: "It's functionally fine, but it needs `cursor: pointer` in CSS.",
            isCorrect: false,
            explanation: "While it does need a pointer, the far more critical issue is that it completely breaks keyboard navigation and screen readers."
          },
          {
            id: "opt2",
            text: "It lacks keyboard support (Tab to focus, Enter/Space to click) and semantic meaning for screen readers.",
            isCorrect: true,
            explanation: "Correct! A natively focusable `<button>` gives you all of this automatically. If you absolutely MUST use a div (which you shouldn't), you'd have to manually add `tabIndex='0'`, `role='button'`, and an `onKeyDown` listener to replicate the native `<button>` behavior."
          },
          {
            id: "opt3",
            text: "Divs cannot accept onClick handlers in React.",
            isCorrect: false,
            explanation: "React allows `onClick` on divs, but it's a terrible practice for accessibility."
          }
        ]
      }
    },
    {
      id: "ha-explain-aria",
      topicId: "html-a11y",
      objectiveId: topicData.objectives[2],
      category: "evaluate",
      type: "explain",
      difficulty: "advanced",
      payload: {
        prompt: "When should you use ARIA attributes (like `aria-hidden` or `aria-expanded`), and when should you avoid them?",
        modelAnswer: "The first rule of ARIA is: 'No ARIA is better than bad ARIA.' You should only use ARIA attributes to bridge the gap when native HTML semantics fall short (e.g., indicating `aria-expanded='true'` for a custom accordion state). You should AVOID ARIA if a native HTML element already exists for your purpose (e.g., do not use `<div role='button'>`; just use a `<button>`).",
        interviewContext: "Knowing the 'First Rule of ARIA' demonstrates maturity."
      }
    },
    {
      id: "ha-complete",
      topicId: "html-a11y",
      objectiveId: topicData.objectives[0],
      category: "evaluate",
      type: "checkpoint",
      difficulty: "foundation",
      payload: {
        topicTitle: "Semantic HTML & Accessibility",
        topicId: "html-a11y"
      }
    }
  ]
};
