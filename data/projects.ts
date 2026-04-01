export type ProjectItem = {
  title: string;
  subtitle: string;
  desc: Array<{ label: string; text: string }>;
  highlights: string[];
  stack: string[];
  github: string;
  live: string;
  image: string;
  gallery?: string[]; // Optional additional images for gallery (2-3 images)
  tag: string;
  tagColor: string;
  accentGradient: string;
  accentGlow: string;
  slug: string;
  stars?: number;
  forks?: number;
  language?: string;
};

export const projects: ProjectItem[] = [
  {
    title: "DIT PyQ Hub",
    subtitle: "Interactive Question Platform for DIT University",
    desc: [
      {
        label: "Problem",
        text: "Students lacked a centralized platform to access previous year questions and practice problems specific to their curriculum.",
      },
      {
        label: "Approach",
        text: "Built a full-stack MERN application with intelligent search, PDF generation, and progress tracking for exam preparation.",
      },
      {
        label: "Result",
        text: "Empowered 15+ students with instant access to 5,000+ questions across 30+ subjects, improving exam readiness by 40%.",
      },
    ],
    highlights: [
      "Full-text search with MongoDB Atlas Search",
      "PDF generation with jsPDF and html2canvas",
      "Progress tracking with analytics dashboard",
      "Secure authentication with JWT and role-based access",
    ],
    stack: ["Next.js", "MongoDB", "Express.js", "Node.js", "Tailwind CSS", "JWT"],
    github: "https://github.com/Aditgm/DIT-PYQ-hub",
    live: "https://dit-pyq-hub.vercel.app",
    image: "/projects/dit-pyq-hub.png",
    gallery: ["/projects/dit-pyq-hub-2.png", "/projects/dit-pyq-hub-3.png"],
    tag: "Full-Stack + EdTech",
    tagColor: "border-cyan-500/20 bg-cyan-500/[0.07] text-cyan-400",
    accentGradient: "from-cyan-500/20 to-blue-500/5",
    accentGlow: "rgba(34, 211, 238, 0.2)",
    slug: "dit-pyq-hub",
    stars: 2,
    forks: 0,
    language: "JavaScript",
  },
  {
    title: "DevSaathi",
    subtitle: "AI-Powered Developer Assistant",
    desc: [
      {
        label: "Problem",
        text: "Developers spend excessive time debugging and searching documentation, lacking instant contextual help.",
      },
      {
        label: "Approach",
        text: "Created an intelligent coding assistant using RAG architecture with LangChain, integrating VS Code extension and web dashboard.",
      },
      {
        label: "Result",
        text: "Reduced debugging time by 60% and increased productivity with context-aware code suggestions and instant documentation lookup.",
      },
    ],
    highlights: [
      "RAG pipeline with LangChain and OpenAI",
      "VS Code extension for real-time assistance",
      "Context-aware code analysis and suggestions",
      "Knowledge base with 500+ documentation sources",
    ],
    stack: ["React", "Node.js", "LangChain", "OpenAI", "VS Code API", "Pinecone"],
    github: "https://github.com/Aditgm/Devsaathi",
    live: "https://devsaathi-tawny.vercel.app",
    image: "/projects/devsaathi.png",
    gallery: ["/projects/devsaathi-2.png", "/projects/devsaathi-3.png"],
    tag: "AI + Developer Tools",
    tagColor: "border-orange-500/20 bg-orange-500/[0.07] text-orange-400",
    accentGradient: "from-orange-500/20 to-amber-500/5",
    accentGlow: "rgba(249, 115, 22, 0.2)",
    slug: "devsaathi",
    stars: 2,
    forks: 1,
    language: "TypeScript",
  },
  {
    title: "Dengue-spot",
    subtitle: "Community Dengue Prevention App",
    desc: [
      {
        label: "Problem",
        text: "Mosquito breeding spots go unreported until outbreaks happen, lacking real-time tracking.",
      },
      {
        label: "Approach",
        text: "Built a MERN surveillance platform integrating Roboflow CV API for automated detection and Socket.io for live chat.",
      },
      {
        label: "Result",
        text: "Enabled fast reporting with enterprise-grade security through RBAC, rate-limiting, and controlled access flows.",
      },
    ],
    highlights: [
      "Socket.io bi-directional real-time chat",
      "Roboflow CV API for mosquito detection",
      "RBAC + API rate-limiting + IP banning",
      "OAuth 2.0 secure authentication",
    ],
    stack: ["MongoDB", "Express.js", "React.js", "Node.js", "Python", "Socket.io", "Roboflow"],
    github: "https://github.com/Aditgm/dengue-spot",
    live: "https://dengue-spot-gi3p.onrender.com/",
    image: "/projects/denguespot.png",
    gallery: ["/projects/denguespot-2.png", "/projects/denguespot-3.png"],
    tag: "Full-Stack + AI/CV",
    tagColor: "border-red-500/20 bg-red-500/[0.07] text-red-400",
    accentGradient: "from-red-500/20 to-orange-500/5",
    accentGlow: "rgba(249, 115, 22, 0.18)",
    slug: "dengue-spot",
  },
  {
    title: "Legal Lens",
    subtitle: "AI-Powered Legal Help Platform",
    desc: [
      {
        label: "Problem",
        text: "Statutory research is slow, tedious, and often inaccessible for everyday users needing legal help.",
      },
      {
        label: "Approach",
        text: "Engineered a context-aware RAG pipeline using Llama 3.3 (70B) and Pinecone Vector DB for semantic search over 1,000+ docs.",
      },
      {
        label: "Result",
        text: "Achieved 92% retrieval accuracy, sub-150ms query latency, and 85% faster research workflows.",
      },
    ],
    highlights: [
      "RAG pipeline with Llama 3.3 (70B)",
      "85% faster statutory research workflows",
      "Pinecone Vector DB with sub-150ms queries",
      "92% retrieval accuracy across 1,000+ docs",
    ],
    stack: ["Next.js", "Llama 3.3", "Pinecone", "MongoDB"],
    github: "https://github.com/Aditgm/Legal_Lens",
    live: "https://aditgm.github.io/Legal_Lens/",
    image: "/projects/legallens.png",
    gallery: ["/projects/legallens-2.png", "/projects/legallens-3.png"],
    tag: "AI/ML + RAG",
    tagColor: "border-purple-500/20 bg-purple-500/[0.07] text-purple-400",
    accentGradient: "from-purple-500/20 to-blue-500/5",
    accentGlow: "rgba(124, 58, 237, 0.2)",
    slug: "legal-lens",
  },
  {
    title: "YouTubey",
    subtitle: "AI Video Summarizer for Students",
    desc: [
      {
        label: "Problem",
        text: "Students spend hours watching long educational videos just to extract key concepts.",
      },
      {
        label: "Approach",
        text: "Developed an automated pipeline leveraging Google Gemini API and Node.js to concurrently process YouTube transcripts.",
      },
      {
        label: "Result",
        text: "Supported 100+ concurrent connections while achieving a 30% reduction in processing latency.",
      },
    ],
    highlights: [
      "Google Gemini API transcript processing",
      "30% reduction in processing latency",
      "100+ concurrent connections supported",
      "Structured context-rich summaries",
    ],
    stack: ["React.js", "Node.js", "Google Gemini API", "Render"],
    github: "https://github.com/Aditgm/Youtubey",
    live: "https://youtubey-beige.vercel.app/",
    image: "/projects/youtubey.png",
    gallery: ["/projects/youtubey-2.png", "/projects/youtubey-3.png"],
    tag: "AI + Full-Stack",
    tagColor: "border-blue-500/20 bg-blue-500/[0.07] text-blue-400",
    accentGradient: "from-blue-500/20 to-cyan-500/5",
    accentGlow: "rgba(45, 212, 191, 0.18)",
    slug: "youtubey",
  },
  {
    title: "Indian Economic Dashboard",
    subtitle: "Real-time Financial Analysis Platform",
    desc: [
      {
        label: "Problem",
        text: "Financial analysts lack unified, high-performance dashboards for tracking Indian macro indicators.",
      },
      {
        label: "Approach",
        text: "Built a comprehensive Streamlit dashboard featuring parallel data fetching to analyze 40+ BSE stocks.",
      },
      {
        label: "Result",
        text: "Delivered real-time risk analytics with 73% faster load times.",
      },
    ],
    highlights: [
      "Real-time technical and correlation analysis",
      "Advanced risk analytics with VaR and Sharpe Ratio",
      "40+ BSE stocks with dynamic search",
      "Parallel data fetching architecture",
    ],
    stack: ["Python", "Streamlit", "Plotly", "Pandas", "yFinance API"],
    github: "https://github.com/Aditgm/indian-economic-dashboard",
    live: "https://aditgm-indian-economic-dashboard-app-oxnhak.streamlit.app/",
    image: "/projects/indian-economic-dashboard.png",
    gallery: ["/projects/indian-economic-dashboard-2.png", "/projects/indian-economic-dashboard-3.png"],
    tag: "Data Science + FinTech",
    tagColor: "border-emerald-500/20 bg-emerald-500/[0.07] text-emerald-400",
    accentGradient: "from-emerald-500/20 to-teal-500/5",
    accentGlow: "rgba(16, 185, 129, 0.2)",
    slug: "indian-economic-dashboard",
  },
];