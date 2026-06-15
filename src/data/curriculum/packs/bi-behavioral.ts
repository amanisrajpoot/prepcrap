import { TopicPack } from "@/types/curriculum";
import { TOPICS } from "../taxonomy";

const topicData = TOPICS.find(t => t.id === "bi-behavioral")!;

export const biBehavioralPack: TopicPack = {
  topic: topicData,
  activities: [
    {
      id: "bib-intro",
      topicId: "bi-behavioral",
      objectiveId: topicData.objectives[0],
      category: "learn",
      type: "why-it-matters",
      difficulty: "intermediate",
      payload: {
        topic: "The Behavioral Round",
        explanation: "The Behavioral Round evaluates your maturity. Senior backend engineers have all broken production at some point. Interviewers don't want to hear that you never make mistakes; they want to hear how you handle them. Do you blame the intern? Or do you take extreme ownership, conduct a blameless post-mortem, and implement systemic guardrails (like CI/CD checks or better logging) to ensure the failure never happens again?",
        interviewContext: "Always use the STAR method: Situation, Task, Action, Result. Focus heavily on the 'Action' (what YOU did) and the 'Result' (business metrics)."
      }
    },
    {
      id: "bib-scenario-outage",
      topicId: "bi-behavioral",
      objectiveId: topicData.objectives[1],
      category: "practice",
      type: "scenario",
      difficulty: "advanced",
      payload: {
        question: "The Production Outage",
        scenario: "The interviewer asks: 'Tell me about a time you caused a production outage.'",
        options: [
          {
            id: "opt1",
            text: "'I deployed a bad migration. But my tech lead approved the PR, so it was really their fault for not catching it.'",
            isCorrect: false,
            explanation: "This is a massive red flag. Passing the blame shows a lack of accountability and maturity."
          },
          {
            id: "opt2",
            text: "'I've never caused a production outage because I test all my code very thoroughly.'",
            isCorrect: false,
            explanation: "This is either a lie or it means you haven't worked on systems at a sufficient scale. Everyone breaks production eventually."
          },
          {
            id: "opt3",
            text: "'I deployed a query without an index that locked the users table. I immediately rolled back to restore service. Then, I wrote a blameless post-mortem and added a CI step to analyze EXPLAIN plans on new migrations.'",
            isCorrect: true,
            explanation: "Perfect. You took ownership, resolved the immediate issue, and implemented a systemic fix so it never happens again."
          }
        ]
      }
    },
    {
      id: "bib-explain-metrics",
      topicId: "bi-behavioral",
      objectiveId: topicData.objectives[2],
      category: "evaluate",
      type: "explain",
      difficulty: "advanced",
      payload: {
        prompt: "Why is it important to communicate the 'business impact' of your technical work in an interview?",
        modelAnswer: "Engineers are hired to solve business problems, not just write code. Saying 'I optimized the SQL queries' is weak. Saying 'I optimized the SQL queries, which reduced average latency by 200ms, leading to a 5% increase in user retention and saving $2,000/month on AWS database costs' demonstrates that you understand the ROI of your engineering efforts.",
        interviewContext: "Always quantify your results with numbers, percentages, or dollar amounts."
      }
    },
    {
      id: "bib-complete",
      topicId: "bi-behavioral",
      objectiveId: topicData.objectives[0],
      category: "evaluate",
      type: "checkpoint",
      difficulty: "foundation",
      payload: {
        topicTitle: "The Behavioral Round",
        topicId: "bi-behavioral"
      }
    }
  ]
};
