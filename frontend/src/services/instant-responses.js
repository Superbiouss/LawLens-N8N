/**
 * Instant responses for common messages to improve UX and reduce backend load.
 */

const RESPONSES = [
  {
    test: /^(hi|hello|hey|greetings|good morning|good afternoon|good evening)\b/i,
    responses: [
      "Hello! How can I help you with your legal needs today?",
      "Hi there! LawLens is at your service. What would you like to discuss?",
      "Greetings! I'm LawLens. How can I assist you today?"
    ]
  },
  {
    test: /^(thanks|thank you|thx|appreciate it)\b/i,
    responses: [
      "You're very welcome! If you have more questions, feel free to ask.",
      "Glad I could help. Is there anything else you'd like to dive into?",
      "Happy to assist. Let me know if you need more details on anything!"
    ]
  },
  {
    test: /^(bye|goodbye|ttyl|talk later|see you)\b/i,
    responses: [
      "Goodbye! Have a productive day ahead.",
      "See you later! Feel free to come back if you need more legal insights.",
      "Farewell! LawLens is always here when you need help."
    ]
  },
  {
    test: /\b(who are you|what are you|about you|your name)\b/i,
    responses: [
      "I am LawLens, your dedicated AI legal assistant. I can help you draft clauses, analyze risks, and explain complex legal concepts.",
      "LawLens is an AI-powered platform designed to simplify legal document analysis and drafting. I'm here to provide smart legal intelligence."
    ]
  },
  {
    test: /\b(what (can|do) you do|how (can|do) you help|capabilities|features)\b/i,
    responses: [
      "I can analyze risk in contracts, draft legal clauses, compare documents, and answer specific questions about your legal files.",
      "I specialize in contract intelligence. You can ask me to summarize documents, find red flags, or suggest improvements to existing agreements."
    ]
  },
  {
    test: /\b(lawyer|attorney|legal advice)\b/i,
    responses: [
      "I am an AI, not a qualified lawyer. While I can provide advanced legal intelligence and analysis, my responses should not be taken as professional legal advice.",
      "I help process and analyze legal data, but I'm not a replacement for legal counsel. Always consult with a qualified attorney for specific legal decisions."
    ]
  }
];

/**
 * Returns a random response from a list of strings.
 */
function getRandomResponse(list) {
  const idx = Math.floor(Math.random() * list.length);
  return list[idx];
}

/**
 * Checks if a question should have an instant client-side response.
 */
export function getInstantResponse(question) {
  const cleanQuestion = question.trim().toLowerCase();
  
  // Find a matching pattern
  const match = RESPONSES.find(r => r.test.test(cleanQuestion));
  
  if (match) {
    return getRandomResponse(match.responses);
  }
  
  return null;
}
