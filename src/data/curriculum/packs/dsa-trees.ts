import { TopicPack } from "@/types/curriculum";
import { TOPICS } from "../taxonomy";

const topicData = TOPICS.find(t => t.id === "dsa-trees")!;

export const dsaTreesPack: TopicPack = {
  topic: topicData,
  activities: [
    {
      id: "dt-intro",
      topicId: "dsa-trees",
      objectiveId: topicData.objectives[0],
      category: "learn",
      type: "why-it-matters",
      difficulty: "advanced",
      payload: {
        topic: "Trees, Graphs & Recursion",
        explanation: "Why do we care about Trees? Because the HTML DOM is a Tree! React's Virtual DOM is a Tree! A company's organizational chart is a Tree. Navigating these structures requires Recursion or Queues/Stacks. Recursion is beautiful but dangerous because every recursive call uses memory on the Call Stack, which can crash if the tree is too deep. Graphs are just trees where children can loop back to their parents (like a social network).",
        interviewContext: "If an interviewer asks you to build a 'File Explorer UI' or a 'Nested Comment Thread', they are explicitly testing your knowledge of Tree traversal and Recursion."
      }
    },
    {
      id: "dt-scenario-recursion",
      topicId: "dsa-trees",
      objectiveId: topicData.objectives[2],
      category: "practice",
      type: "scenario",
      difficulty: "advanced",
      payload: {
        question: "The Call Stack Crash",
        scenario: "You write a recursive function to traverse a graph of connected users. You test it locally with 10 users and it works perfectly. You deploy to production, and for a super-user with 50,000 connections, the browser crashes with a `Maximum call stack size exceeded` error.",
        options: [
          {
            id: "opt1",
            text: "Rewrite the recursive algorithm as an iterative algorithm using a `while` loop and an array as a Queue (BFS) or Stack (DFS).",
            isCorrect: true,
            explanation: "Correct! Recursive functions use the JS engine's Call Stack, which has a hard limit (usually ~10,000 frames). By manually using an Array to store the nodes you need to process, you move the memory burden from the Call Stack to the Heap memory, which can hold millions of items."
          },
          {
            id: "opt2",
            text: "Increase the memory limit of the Node.js process using `--max-old-space-size`.",
            isCorrect: false,
            explanation: "This increases Heap memory, but does not increase the hardcoded limit of the Call Stack in the V8 engine."
          },
          {
            id: "opt3",
            text: "Wrap the recursive call in a `setTimeout`.",
            isCorrect: false,
            explanation: "This would clear the call stack, but it would make the execution extremely slow (asynchronous) and difficult to return a synchronous result."
          }
        ]
      }
    },
    {
      id: "dt-explain-bfs-dfs",
      topicId: "dsa-trees",
      objectiveId: topicData.objectives[1],
      category: "evaluate",
      type: "explain",
      difficulty: "advanced",
      payload: {
        prompt: "What is the difference between BFS (Breadth-First Search) and DFS (Depth-First Search) when searching for a node in a Tree?",
        modelAnswer: "BFS explores the tree level by level (horizontal first). It is implemented using a Queue (FIFO). It is best for finding the shortest path.\n\nDFS explores a branch all the way to the leaf before backtracking (vertical first). It is implemented using Recursion or a Stack (LIFO). It is often easier to write and uses less memory if the tree is very wide but not very deep.",
        interviewContext: "Be ready to write DFS recursively in 5 lines of code."
      }
    },
    {
      id: "dt-complete",
      topicId: "dsa-trees",
      objectiveId: topicData.objectives[0],
      category: "evaluate",
      type: "checkpoint",
      difficulty: "foundation",
      payload: {
        topicTitle: "Trees & Graphs",
        topicId: "dsa-trees"
      }
    }
  ]
};
