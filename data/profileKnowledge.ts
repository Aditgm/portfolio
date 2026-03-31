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
    id: "headline",
    title: "Professional Headline",
    content:
      "He presents himself as a Full-Stack Developer and AI Engineer with a product-first and performance-aware mindset.",
    tags: ["headline", "role", "developer", "ai engineer"],
  },
  {
    id: "availability",
    title: "Hiring Availability",
    content: "Aditya is open to SDE internships and new graduate opportunities.",
    tags: ["availability", "internship", "new grad", "sde"],
  },
  {
    id: "focus",
    title: "Current Focus",
    content:
      "He focuses on AI product systems, retrieval-augmented workflows, and polished frontend experiences.",
    tags: ["focus", "rag", "llm", "frontend", "ai systems"],
  },
  {
    id: "competitive-overview",
    title: "Competitive Programming",
    content:
      "He has solved 2000+ problems across LeetCode, Codeforces, CodeChef, CSES, HackerRank, and VJudge.",
    tags: ["competitive programming", "problems", "dsa", "algorithms"],
  },
  {
    id: "leetcode-guardian",
    title: "LeetCode Achievement",
    content:
      "On LeetCode, he reached Guardian with 2360+ rating and is in the top 0.4% globally.",
    tags: ["leetcode", "guardian", "2360", "top 0.4"],
  },
  {
    id: "codeforces-master",
    title: "Codeforces Achievement",
    content:
      "On Codeforces, he reached Master with a 2131 rating through consistent high-level contest performance.",
    tags: ["codeforces", "master", "2131", "rating"],
  },
  {
    id: "codechef-5star",
    title: "CodeChef Achievement",
    content:
      "On CodeChef, he reached 5-star level with a 2101 rating and has been ranked 470th in India.",
    tags: ["codechef", "5 star", "2101", "india"],
  },
  {
    id: "contest-overview",
    title: "Contest Highlights",
    content:
      "Key highlights include rank 169 out of 30,000+ in LeetCode Weekly 462 and rank 45 out of 20,000+ in Codeforces Round 1068 Div. 2.",
    tags: ["contest", "rankings", "leetcode weekly", "codeforces round"],
  },
  {
    id: "contest-leetcode-462",
    title: "LeetCode Weekly 462 Result",
    content:
      "He ranked 169 among 30,000+ participants in LeetCode Weekly Contest 462, a top 0.005% finish.",
    tags: ["leetcode", "weekly 462", "rank 169", "top 0.005"],
  },
  {
    id: "contest-cf-1068",
    title: "Codeforces Round 1068 Result",
    content:
      "He ranked 45 among 20,000+ participants in Codeforces Round 1068 Div. 2, a top 0.003% finish.",
    tags: ["codeforces", "round 1068", "rank 45", "top 0.003"],
  },
  {
    id: "experience-competitive",
    title: "Experience: Competitive Programmer",
    content:
      "From March 2024 onward, he has actively competed and improved depth in advanced data structures and dynamic programming.",
    tags: ["experience", "competitive", "dynamic programming", "algorithms"],
  },
  {
    id: "experience-amazon",
    title: "Experience: Amazon ML Summer School",
    content:
      "He completed Amazon ML Summer School and studied ML fundamentals, neural networks, and practical applications with Amazon-designed curriculum.",
    tags: ["amazon", "ml", "experience", "neural networks"],
  },
  {
    id: "experience-amazon-selectivity",
    title: "Amazon ML Summer School Selection",
    content:
      "He was selected among about 3,000 participants from 60,000+ applicants, with acceptance below 5%.",
    tags: ["amazon", "selection", "acceptance", "ml summer school"],
  },
  {
    id: "experience-gssoc",
    title: "Experience: GSSOC Contributor",
    content:
      "During GirlScript Summer of Code, he contributed to open-source AI projects and collaborated through reviews and team workflows.",
    tags: ["gssoc", "open source", "ai projects", "collaboration"],
  },
  {
    id: "experience-gssoc-tech",
    title: "GSSOC Technical Work",
    content:
      "In GSSOC work, he developed web application features using Node.js and Python to improve UX and performance.",
    tags: ["gssoc", "node.js", "python", "web features", "performance"],
  },
  {
    id: "education-dit",
    title: "Education: DIT University",
    content:
      "He is pursuing B.Tech in Computer Science and Engineering at DIT University with AI/ML specialization.",
    tags: ["education", "dit", "b.tech", "computer science", "ai ml"],
  },
  {
    id: "education-timeline",
    title: "Education Timeline",
    content: "The academic timeline shown is April 2023 to present.",
    tags: ["education", "timeline", "2023", "present"],
  },
  {
    id: "education-gpa",
    title: "Current GPA",
    content: "Current GPA is listed as 8.41 out of 10.0.",
    tags: ["gpa", "8.41", "academics", "10.0"],
  },
  {
    id: "education-coursework",
    title: "Key Coursework",
    content:
      "Coursework includes Algorithms, Data Structures, Machine Learning, Deep Learning, Computer Networks, and DBMS.",
    tags: ["coursework", "algorithms", "deep learning", "computer networks", "dbms"],
  },
  {
    id: "projects-overview",
    title: "Projects Overview",
    content:
      "Projects include AI, computer vision, RAG, and data analytics products with measurable impact.",
    tags: ["projects", "overview", "ai", "rag", "analytics"],
  },
  {
    id: "project-dengue-overview",
    title: "Project: Dengue Spot",
    content:
      "Dengue Spot is a community dengue prevention app built with MERN and Roboflow CV API, plus Socket.io real-time chat.",
    tags: ["dengue spot", "mern", "roboflow", "socket.io", "cv"],
  },
  {
    id: "project-dengue-security",
    title: "Dengue Spot Security",
    content:
      "The app includes RBAC, rate limiting, IP banning, and OAuth 2.0 based secure authentication.",
    tags: ["dengue spot", "security", "rbac", "oauth", "rate limiting"],
  },
  {
    id: "project-legal-overview",
    title: "Project: Legal Lens",
    content:
      "Legal Lens is an AI-powered legal help platform using Next.js, Llama 3.3, Pinecone, and MongoDB.",
    tags: ["legal lens", "next.js", "llama", "pinecone", "mongodb"],
  },
  {
    id: "project-legal-rag",
    title: "Legal Lens RAG Pipeline",
    content:
      "Legal Lens uses a context-aware RAG pipeline over 1,000+ legal documents for semantic legal retrieval.",
    tags: ["legal lens", "rag", "semantic search", "1000 docs", "legal"],
  },
  {
    id: "project-legal-metrics",
    title: "Legal Lens Metrics",
    content:
      "Reported metrics include 92% retrieval accuracy, sub-150ms query latency, and 85% faster legal research workflows.",
    tags: ["legal lens", "92%", "150ms", "85% faster", "metrics"],
  },
  {
    id: "project-youtubey-overview",
    title: "Project: YouTubey",
    content:
      "YouTubey is an AI video summarizer for students that transforms long educational videos into concise outputs.",
    tags: ["youtubey", "ai", "video summarizer", "students"],
  },
  {
    id: "project-youtubey-stack",
    title: "YouTubey Stack",
    content:
      "The project uses React.js, Node.js, Google Gemini API, and Render for deployment.",
    tags: ["youtubey", "react", "node", "gemini", "render"],
  },
  {
    id: "project-youtubey-performance",
    title: "YouTubey Performance",
    content:
      "The system reports support for 100+ concurrent connections and around 30% lower processing latency.",
    tags: ["youtubey", "concurrency", "latency", "performance"],
  },
  {
    id: "project-dashboard-overview",
    title: "Project: Indian Economic Dashboard",
    content:
      "This Streamlit dashboard provides real-time financial analysis for 40+ BSE stocks.",
    tags: ["dashboard", "streamlit", "bse", "finance", "stocks"],
  },
  {
    id: "project-dashboard-stack",
    title: "Dashboard Tech Stack",
    content:
      "The dashboard is built with Python, Streamlit, Plotly, Pandas, and yFinance API.",
    tags: ["python", "streamlit", "plotly", "pandas", "yfinance"],
  },
  {
    id: "project-dashboard-analytics",
    title: "Dashboard Analytics Features",
    content:
      "Analytics include technical indicators, correlation analysis, and risk metrics such as VaR and Sharpe Ratio.",
    tags: ["analytics", "technical", "correlation", "var", "sharpe"],
  },
  {
    id: "project-dashboard-performance",
    title: "Dashboard Performance",
    content:
      "The architecture uses parallel data fetching and reports about 73% faster load times.",
    tags: ["dashboard", "parallel", "73%", "load time", "performance"],
  },
  {
    id: "stack-core",
    title: "Core Stack",
    content:
      "Primary technologies include Next.js, React, TypeScript, Node.js, Python, Tailwind CSS, GSAP, and MongoDB.",
    tags: ["stack", "next.js", "react", "typescript", "node.js", "python"],
  },
  {
    id: "stack-ai",
    title: "AI Tooling",
    content:
      "AI-oriented tooling includes Llama, Gemini, Pinecone, and retrieval-augmented generation patterns.",
    tags: ["ai", "llama", "gemini", "pinecone", "rag"],
  },
  {
    id: "stack-frontend",
    title: "Frontend Technologies",
    content:
      "Frontend tools include React, Next.js, Tailwind CSS, GSAP, Framer Motion, and React Three Fiber.",
    tags: ["frontend", "tailwind", "gsap", "framer", "r3f"],
  },
  {
    id: "stack-backend",
    title: "Backend Technologies",
    content:
      "Backend systems include Node.js, Express, REST APIs, Socket.io, and authentication/security controls.",
    tags: ["backend", "express", "rest", "socket.io", "auth"],
  },
  {
    id: "stack-shipping",
    title: "Shipping Toolchain",
    content:
      "Common shipping tools include GitHub, Vercel, Render, Docker, and Streamlit.",
    tags: ["shipping", "github", "vercel", "render", "docker", "streamlit"],
  },
  {
    id: "engineering-philosophy",
    title: "Engineering Philosophy",
    content:
      "He treats software work like contest problem solving: reduce complexity, verify correctness, then optimize bottlenecks.",
    tags: ["philosophy", "engineering", "optimization", "problem solving"],
  },
  {
    id: "location",
    title: "Location",
    content: "Aditya is based in Dehradun, Uttarakhand, India.",
    tags: ["location", "india", "dehradun"],
  },
  {
    id: "contact",
    title: "Contact",
    content:
      "Primary contact email is arajsinha4@gmail.com. Main coding profiles are GitHub, LeetCode, Codeforces, CodeChef, and VJudge.",
    tags: ["contact", "email", "profiles", "social", "links"],
  },
  {
    id: "contact-email",
    title: "Email",
    content: "Email: arajsinha4@gmail.com",
    tags: ["email", "mail", "contact", "arajsinha4@gmail.com"],
  },
  {
    id: "contact-github",
    title: "GitHub Link",
    content: "GitHub profile is https://github.com/Aditgm",
    tags: ["github", "aditgm", "repo", "profile"],
  },
  {
    id: "contact-leetcode",
    title: "LeetCode Link",
    content: "LeetCode profile is https://leetcode.com/u/adityagm/",
    tags: ["leetcode", "profile", "contests", "practice"],
  },
  {
    id: "contact-codeforces",
    title: "Codeforces Link",
    content: "Codeforces profile is https://codeforces.com/profile/aditya2005",
    tags: ["codeforces", "profile", "master", "rating"],
  },
  {
    id: "contact-codechef",
    title: "CodeChef Link",
    content: "CodeChef profile is https://www.codechef.com/users/adityagm",
    tags: ["codechef", "profile", "competitive"],
  },
  {
    id: "contact-vjudge",
    title: "VJudge Link",
    content: "VJudge profile is https://vjudge.net/user/aditya6789",
    tags: ["vjudge", "profile", "practice", "dsa"],
  },
];
