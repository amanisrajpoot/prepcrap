import { TopicPack } from "@/types/curriculum";
import { TOPICS } from "../taxonomy";

const topicData = TOPICS.find(t => t.id === "dsa-patterns")!;

export const dsaPatternsPack: TopicPack = {
  topic: topicData,
  activities: [
    {
      id: "dp-intro",
      topicId: "dsa-patterns",
      objectiveId: topicData.objectives[0],
      category: "learn",
      type: "why-it-matters",
      difficulty: "intermediate",
      payload: {
        topic: "Arrays, Strings & Two Pointers",
        explanation: "As a full-stack engineer, you won't be reversing linked lists on the job. But you WILL be manipulating arrays and strings constantly—formatting user input, filtering lists, or checking for duplicates. The 'Two Pointers' and 'Sliding Window' patterns are the most common ways to optimize an O(N^2) nested loop into an O(N) linear scan.",
        interviewContext: "If you see a question about finding a 'pair' of elements, or a 'contiguous subarray', your brain should immediately jump to Two Pointers or Sliding Window."
      }
    },
    {
      id: "dp-scenario-twosum",
      topicId: "dsa-patterns",
      objectiveId: topicData.objectives[2],
      category: "practice",
      type: "scenario",
      difficulty: "intermediate",
      payload: {
        question: "The Classic Two Sum",
        scenario: "You are given an array of numbers and a target sum. You need to find if any two numbers add up to the target. A junior dev writes a nested loop: `for(let i=0...) { for(let j=i+1...) { if(arr[i]+arr[j] === target) return true; } }`",
        options: [
          {
            id: "opt1",
            text: "This is perfectly fine, it's the standard solution.",
            isCorrect: false,
            explanation: "It works, but it's O(N^2). If the array has 10,000 items, it takes 100,000,000 operations."
          },
          {
            id: "opt2",
            text: "Sort the array first, then use Two Pointers (one at start, one at end) moving inward.",
            isCorrect: true,
            explanation: "Correct! Sorting takes O(N log N), and the two-pointer scan takes O(N), bringing the total time down to O(N log N). (Note: using a Hash Map can bring it down to O(N), but Two Pointers is the classic algorithm pattern here!)."
          },
          {
            id: "opt3",
            text: "Use array.filter() to find the answer.",
            isCorrect: false,
            explanation: "filter() is just an abstraction over a loop. It wouldn't solve the O(N^2) problem if used incorrectly."
          }
        ]
      }
    },
    {
      id: "dp-explain-strings",
      topicId: "dsa-patterns",
      objectiveId: topicData.objectives[1],
      category: "evaluate",
      type: "explain",
      difficulty: "advanced",
      payload: {
        prompt: "Why is repeatedly concatenating strings (e.g., `str += 'a'`) inside a loop considered a bad practice in many languages?",
        modelAnswer: "In JavaScript (and many other languages like Java and Python), strings are immutable. This means every time you do `str += 'a'`, the engine must allocate a completely new block of memory, copy the old string, and append the new character. Inside a large loop, this leads to O(N^2) time complexity and massive memory churn.",
        interviewContext: "A great optimization to mention is pushing strings to an array and then doing `array.join('')` at the end."
      }
    },
    {
      id: "dp-complete",
      topicId: "dsa-patterns",
      objectiveId: topicData.objectives[0],
      category: "evaluate",
      type: "checkpoint",
      difficulty: "foundation",
      payload: {
        topicTitle: "Arrays, Strings & Two Pointers",
        topicId: "dsa-patterns"
      }
    }
  ]
};
