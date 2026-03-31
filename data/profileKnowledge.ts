export type KnowledgeChunk = {
  id: string;
  title: string;
  content: string;
  tags: string[];
};

export const profileKnowledge: KnowledgeChunk[] = [
  {
    id: "intro",
    title: "Profile Overview",
    content:
      "Aditya Raj is a Computer Science undergraduate, Full-Stack Developer, and AI Engineer focused on building AI-powered products that ship.",
    tags: ["about", "intro", "profile", "ai", "full stack"],
  },
  {
    id: "competitive",
    title: "Competitive Programming",
    content:
      "He has solved 2000+ problems across LeetCode, Codeforces, CodeChef, CSES, HackerRank, and VJudge. He is Guardian on LeetCode with 2360+ rating (Top 0.4%) and Master on Codeforces with 2131 rating.",
    tags: ["leetcode", "codeforces", "codechef", "ratings", "dsa"],
  },
  {
    id: "contests",
    title: "Contest Highlights",
    content:
      "Aditya ranked 169 out of 30,000+ in LeetCode Weekly Contest 462 and ranked 45 out of 20,000+ in Codeforces Round 1068 Div. 2.",
    tags: ["contest", "ranking", "leetcode weekly", "codeforces round"],
  },
  {
    id: "experience-amazon",
    title: "Amazon ML Summer School",
    content:
      "He completed Amazon ML Summer School, studying machine learning fundamentals, neural networks, and practical ML applications taught by Amazon scientists.",
    tags: ["amazon", "ml", "experience", "neural networks"],
  },
  {
    id: "projects-legal-lens",
    title: "Project: Legal Lens",
    content:
      "Legal Lens is an AI-powered legal help platform built with Next.js, Llama 3.3, Pinecone, and MongoDB, using retrieval-augmented generation patterns.",
    tags: ["project", "rag", "llm", "next.js", "pinecone", "mongodb"],
  },
  {
    id: "projects-dengue",
    title: "Project: Dengue Spot",
    content:
      "Dengue Spot is a MERN surveillance platform that integrates Roboflow computer vision API and Socket.io for real-time interaction.",
    tags: ["project", "mern", "computer vision", "roboflow", "socket.io"],
  },
  {
    id: "projects-youtubey",
    title: "Project: Youtubey",
    content:
      "Youtubey is an AI video summarizer for students and is categorized as an AI + Full-Stack project.",
    tags: ["project", "video summarizer", "ai", "full stack"],
  },
  {
    id: "projects-dashboard",
    title: "Project: Indian Economic Dashboard",
    content:
      "This project is a Streamlit dashboard with parallel data fetching for 40+ BSE stocks, using Python, Plotly, Pandas, and yFinance API.",
    tags: ["project", "python", "streamlit", "plotly", "finance"],
  },
  {
    id: "stack",
    title: "Core Stack",
    content:
      "Primary technologies include Next.js, React, TypeScript, Node.js, Python, Tailwind CSS, GSAP, MongoDB, and modern AI tooling.",
    tags: ["skills", "stack", "next.js", "react", "typescript", "node", "python"],
  },
  {
    id: "contact",
    title: "Contact",
    content:
      "You can contact Aditya at arajsinha4@gmail.com. Portfolio links include GitHub (Aditgm), LeetCode (adityagm), and Codeforces (aditya2005).",
    tags: ["contact", "email", "github", "leetcode", "codeforces"],
  },
  {
    id: "location",
    title: "Location",
    content: "Aditya is based in Dehradun, Uttarakhand, India.",
    tags: ["location", "india", "dehradun"],
  },
];
