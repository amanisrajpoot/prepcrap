import { TopicPack } from "@/types/curriculum";
import { TOPICS } from "../taxonomy";

const topicData = TOPICS.find(t => t.id === "browser-security")!;

export const browserSecurityPack: TopicPack = {
  topic: topicData,
  activities: [
    {
      id: "bs-intro",
      topicId: "browser-security",
      objectiveId: topicData.objectives[0],
      category: "learn",
      type: "why-it-matters",
      difficulty: "intermediate",
      payload: {
        topic: "Browser Security & CORS",
        explanation: "CORS (Cross-Origin Resource Sharing) is the most misunderstood security feature in web development. Junior devs think CORS is a firewall that blocks requests. Senior devs know CORS is a browser policy that blocks the *response* from being read by JS, designed to prevent a malicious website from making requests to your bank using your cookies. XSS and CSRF are the actual exploits; CORS is a mitigation.",
        interviewContext: "Never say 'CORS is a backend error'. Say 'CORS is a browser-enforced security mechanism to protect user data from cross-origin scripts'."
      }
    },
    {
      id: "bs-scenario-cors",
      topicId: "browser-security",
      objectiveId: topicData.objectives[0],
      category: "practice",
      type: "scenario",
      difficulty: "advanced",
      payload: {
        question: "The Misunderstood CORS",
        scenario: "You have a frontend running on `localhost:3000` and a backend on `api.example.com`. You send a POST request using `fetch`. The browser throws a CORS error. You look in the database, and the record WAS actually created. How is this possible if CORS 'blocked' it?",
        options: [
          {
            id: "opt1",
            text: "CORS only blocks the JS from reading the response. The request was actually sent and processed.",
            isCorrect: true,
            explanation: "Correct! For 'simple requests', the browser sends the request to the server, the server processes it, and the server returns a response. If the response is missing the `Access-Control-Allow-Origin` header, the browser throws an error and prevents your JS code from seeing the response data. But the server still executed the operation!"
          },
          {
            id: "opt2",
            text: "The server's firewall failed to block the preflight request.",
            isCorrect: false,
            explanation: "Simple POST requests do not trigger a preflight OPTIONS request. They are sent directly."
          },
          {
            id: "opt3",
            text: "There is a bug in the fetch API.",
            isCorrect: false,
            explanation: "This is exactly how CORS is designed to work. It protects the client from reading data, not the server from receiving data."
          }
        ]
      }
    },
    {
      id: "bs-incident-xss",
      topicId: "browser-security",
      objectiveId: topicData.objectives[1],
      category: "practice",
      type: "incident",
      difficulty: "advanced",
      payload: {
        question: "The Stolen JWT",
        incident: "PagerDuty Alert!\n\nUser accounts are being compromised. You investigate and find that an attacker put a malicious `<script>` tag into their public profile bio. When other users view that profile, the script executes, reads their auth token from `localStorage`, and sends it to the attacker's server.",
        options: [
          {
            id: "opt1",
            text: "Sanitize the bio input before saving it to the database.",
            explanation: "While sanitizing input is good, a Defense in Depth strategy requires changing how the token is stored.",
            isCorrect: false
          },
          {
            id: "opt2",
            text: "Move the JWT from localStorage to an HttpOnly Cookie.",
            explanation: "Correct! This is a classic XSS (Cross-Site Scripting) attack. Any script on the page has full access to `localStorage`. An `HttpOnly` cookie, however, is completely invisible to JavaScript. It is automatically sent by the browser on every request, making it immune to being stolen via XSS.",
            isCorrect: true
          },
          {
            id: "opt3",
            text: "Add a CORS policy to prevent the token from being sent.",
            explanation: "CORS does not prevent the attacker's script from sending data OUT via an Image beacon or a form submission.",
            isCorrect: false
          }
        ]
      }
    },
    {
      id: "bs-explain-csrf",
      topicId: "browser-security",
      objectiveId: topicData.objectives[1],
      category: "evaluate",
      type: "explain",
      difficulty: "advanced",
      payload: {
        prompt: "Explain CSRF (Cross-Site Request Forgery) and how to prevent it.",
        modelAnswer: "CSRF happens when a malicious site tricks the user's browser into making an unwanted request to a site where they are authenticated. Because the browser automatically attaches cookies (like session cookies) to requests, the server thinks the user authorized it.\n\nPrevention: Use Anti-CSRF tokens (a hidden value in forms that the attacker cannot guess), or use the `SameSite=Lax` or `Strict` attribute on cookies so they aren't sent in cross-site POST requests.",
        interviewContext: "Interviewers want to see that you understand the relationship between cookies and CSRF."
      }
    },
    {
      id: "bs-complete",
      topicId: "browser-security",
      objectiveId: topicData.objectives[0],
      category: "evaluate",
      type: "checkpoint",
      difficulty: "foundation",
      payload: {
        topicTitle: "Browser Security (CORS, XSS)",
        topicId: "browser-security"
      }
    }
  ]
};
