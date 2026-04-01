import { Hammer, Server, Database, Brain, Sparkles, LayoutPanelLeft } from "lucide-react";
import { TransitionLink } from "@/components/TransitionLink";
import { notFound } from "next/navigation";
import BuildTimeline from "./BuildTimeline";

// This would typically come from a database or CMS
const buildSteps = {
    "dengue-spot": {
        title: "Dengue-spot",
        subtitle: "Community Dengue Prevention App",
        heroImage: "/projects/denguespot.png",
        overview: "Building a scalable community health platform required integrating real-time communication with automated AI-driven mosquito detection.",
        steps: [
            {
                id: 1,
                title: "Idea & Planning",
                description: "Mapped out the core problem: unreported mosquito breeding spots. Designed a solution utilizing crowd-sourced images and AI validation.",
                icon: <Brain size={20} />,
                color: "text-purple-400",
                bg: "bg-purple-500/10",
                border: "border-purple-500/20"
            },
            {
                id: 2,
                title: "Roboflow CV Pipeline",
                description: "Trained and integrated a custom YOLO model via Roboflow API to instantly scan uploaded images and detect stagant water / larvae.",
                icon: <Sparkles size={20} />,
                color: "text-cyan-400",
                bg: "bg-cyan-500/10",
                border: "border-cyan-500/20"
            },
            {
                id: 3,
                title: "MERN Backend Setup",
                description: "Built the REST architecture using Express & Node.js, hooking up a MongoDB database with rigid schema validation.",
                icon: <Server size={20} />,
                color: "text-green-400",
                bg: "bg-green-500/10",
                border: "border-green-500/20"
            },
            {
                id: 4,
                title: "Socket.io Integration",
                description: "Implemented bi-directional WebSockets to allow real-time community chat and instant push notifications for new hotspot alerts.",
                icon: <Database size={20} />,
                color: "text-blue-400",
                bg: "bg-blue-500/10",
                border: "border-blue-500/20"
            },
            {
                id: 5,
                title: "Security & UI Polish",
                description: "Locked down the endpoints with Role-Based Access Control (RBAC), API rate limiting, and wired up the React frontend with Tailwind.",
                icon: <LayoutPanelLeft size={20} />,
                color: "text-orange-400",
                bg: "bg-orange-500/10",
                border: "border-orange-500/20"
            }
        ]
    },
    "legal-lens": {
        title: "Legal Lens",
        subtitle: "AI-Powered Legal Help Platform",
        heroImage: "/projects/legallens.png",
        overview: "Constructing a highly accurate RAG pipeline capable of performing semantic searches across unstructured legal statutes in sub-150ms.",
        steps: [
            {
                id: 1,
                title: "Problem Space definition",
                description: "Identified the slow nature of statutory research. Set a target of 90%+ retrieval accuracy on legal documents.",
                icon: <Brain size={20} />,
                color: "text-purple-400",
                bg: "bg-purple-500/10",
                border: "border-purple-500/20"
            },
            {
                id: 2,
                title: "Document Parsing & Embeddings",
                description: "Chunked 1000+ legal documents using LangChain and generated semantic embeddings to capture dense legal context.",
                icon: <Database size={20} />,
                color: "text-blue-400",
                bg: "bg-blue-500/10",
                border: "border-blue-500/20"
            },
            {
                id: 3,
                title: "Pinecone Vector DB",
                description: "Stored the mass embeddings in a Pinecone index optimized for fast cosine similarity nearest-neighbor searches.",
                icon: <Server size={20} />,
                color: "text-green-400",
                bg: "bg-green-500/10",
                border: "border-green-500/20"
            },
            {
                id: 4,
                title: "Llama 3.3 (70B) Inference",
                description: "Hooked up the retrieved contexts to LLama 3.3 to synthesize clear, accurate legal guidance from the retrieved documents.",
                icon: <Sparkles size={20} />,
                color: "text-cyan-400",
                bg: "bg-cyan-500/10",
                border: "border-cyan-500/20"
            },
            {
                id: 5,
                title: "Next.js Frontend Build",
                description: "Built a responsive, chat-like interface in Next.js allowing users to query the AI in natural language seamlessly.",
                icon: <LayoutPanelLeft size={20} />,
                color: "text-orange-400",
                bg: "bg-orange-500/10",
                border: "border-orange-500/20"
            }
        ]
    },
    "youtubey": {
        title: "YouTubey",
        subtitle: "AI Video Summarizer for Students",
        heroImage: "/projects/youtubey.png",
        overview: "Building a high-concurrency Node.js pipeline designed to fetch, parse, and summarize massive YouTube transcripts rapidly.",
        steps: [
            {
                id: 1,
                title: "YouTube Transcript Fetching",
                description: "Engineered an extractor using a hidden YouTube API to rapidly pull auto-generated and manual video transcripts.",
                icon: <Server size={20} />,
                color: "text-green-400",
                bg: "bg-green-500/10",
                border: "border-green-500/20"
            },
            {
                id: 2,
                title: "Gemini API Pipeline",
                description: "Passed the raw VTT/JSON transcripts into Google's Gemini Flash model with strict prompt engineering for bulleted summaries.",
                icon: <Sparkles size={20} />,
                color: "text-cyan-400",
                bg: "bg-cyan-500/10",
                border: "border-cyan-500/20"
            },
            {
                id: 3,
                title: "Concurrency Optimization",
                description: "Restructured the backend to use Node.js worker pools and promise mapping, enabling 100+ concurrent users without bottlenecks.",
                icon: <Brain size={20} />,
                color: "text-purple-400",
                bg: "bg-purple-500/10",
                border: "border-purple-500/20"
            },
            {
                id: 4,
                title: "React UI & Integration",
                description: "Developed a sleek React interface to accept YouTube URLs and display the dynamically streaming summary back to the student.",
                icon: <LayoutPanelLeft size={20} />,
                color: "text-orange-400",
                bg: "bg-orange-500/10",
                border: "border-orange-500/20"
            }
        ]
    },
    "indian-economic-dashboard": {
        title: "Indian Economic Dashboard",
        subtitle: "Real-time Financial Analysis Platform",
        heroImage: "/projects/indian-economic-dashboard.png",
        overview: "Designing a high-speed Python architecture to process vast arrays of financial ticker data and perform advanced risk analytics.",
        steps: [
            {
                id: 1,
                title: "Data Sourcing",
                description: "Integrated the yFinance API to dynamically pull historical and live ticker data for 40+ major BSE stocks.",
                icon: <Database size={20} />,
                color: "text-blue-400",
                bg: "bg-blue-500/10",
                border: "border-blue-500/20"
            },
            {
                id: 2,
                title: "Parallel Fetching Architecture",
                description: "Utilized Python's concurrent.futures to fetch daily market data in parallel, achieving a 73% sheer reduction in load times.",
                icon: <Server size={20} />,
                color: "text-green-400",
                bg: "bg-green-500/10",
                border: "border-green-500/20"
            },
            {
                id: 3,
                title: "Quantitative Risk Analytics",
                description: "Written complex Pandas logic to calculate Value at Risk (VaR), Sharpe Ratios, and plot correlation matrices on the fly.",
                icon: <Brain size={20} />,
                color: "text-purple-400",
                bg: "bg-purple-500/10",
                border: "border-purple-500/20"
            },
            {
                id: 4,
                title: "Streamlit Interface",
                description: "Constructed an interactive multipage Streamlit dashboard using Plotly for responsive, high-fidelity financial charting.",
                icon: <LayoutPanelLeft size={20} />,
                color: "text-orange-400",
                bg: "bg-orange-500/10",
                border: "border-orange-500/20"
            }
        ]
    },
    "dit-pyq-hub": {
        title: "DIT PyQ Hub",
        subtitle: "Interactive Question Platform for DIT University",
        heroImage: "/projects/dit-pyq-hub.png",
        overview: "Creating a comprehensive question bank platform for university students to access previous year questions and track their exam preparation progress.",
        steps: [
            {
                id: 1,
                title: "需求分析",
                description: "Identified the need for a centralized platform where students can access 5,000+ questions across 30+ subjects specific to DIT University curriculum.",
                icon: <Brain size={20} />,
                color: "text-cyan-400",
                bg: "bg-cyan-500/10",
                border: "border-cyan-500/20"
            },
            {
                id: 2,
                title: "MongoDB Atlas Search",
                description: "Implemented full-text search using MongoDB Atlas Search for instant query results and intelligent question retrieval.",
                icon: <Database size={20} />,
                color: "text-blue-400",
                bg: "bg-blue-500/10",
                border: "border-blue-500/20"
            },
            {
                id: 3,
                title: "PDF Generation",
                description: "Built PDF export functionality using jsPDF and html2canvas, allowing students to download question papers for offline study.",
                icon: <LayoutPanelLeft size={20} />,
                color: "text-green-400",
                bg: "bg-green-500/10",
                border: "border-green-500/20"
            },
            {
                id: 4,
                title: "Analytics Dashboard",
                description: "Created progress tracking with visual analytics showing completion rates, strong/weak areas, and study time metrics.",
                icon: <Server size={20} />,
                color: "text-purple-400",
                bg: "bg-purple-500/10",
                border: "border-purple-500/20"
            }
        ]
    },
    "devsaathi": {
        title: "DevSaathi",
        subtitle: "AI-Powered Developer Assistant",
        heroImage: "/projects/devsaathi.png",
        overview: "Building an intelligent coding assistant that helps developers debug faster and access documentation instantly through AI-powered context awareness.",
        steps: [
            {
                id: 1,
                title: "RAG Architecture",
                description: "Designed a Retrieval-Augmented Generation pipeline using LangChain and Pinecone for context-aware code assistance.",
                icon: <Brain size={20} />,
                color: "text-orange-400",
                bg: "bg-orange-500/10",
                border: "border-orange-500/20"
            },
            {
                id: 2,
                title: "Knowledge Base",
                description: "Indexed 500+ documentation sources including MDN, React docs, Node.js docs for comprehensive coverage.",
                icon: <Database size={20} />,
                color: "text-cyan-400",
                bg: "bg-cyan-500/10",
                border: "border-cyan-500/20"
            },
            {
                id: 3,
                title: "VS Code Extension",
                description: "Developed a VS Code extension for real-time inline suggestions and context-aware debugging assistance.",
                icon: <LayoutPanelLeft size={20} />,
                color: "text-blue-400",
                bg: "bg-blue-500/10",
                border: "border-blue-500/20"
            },
            {
                id: 4,
                title: "Web Dashboard",
                description: "Built a web interface for code analysis, documentation search, and conversation history with OpenAI integration.",
                icon: <Server size={20} />,
                color: "text-purple-400",
                bg: "bg-purple-500/10",
                border: "border-purple-500/20"
            }
        ]
    }
};

export async function generateStaticParams() {
    return Object.keys(buildSteps).map((slug) => ({
        slug,
    }));
}

export default async function BuildPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = buildSteps[slug as keyof typeof buildSteps];

    if (!project) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-[#050510] relative overflow-hidden text-slate-200">
            {/* Background Elements */}
            <div className="fixed inset-0 pointer-events-none geo-grid opacity-30 z-0" />
            <div className="fixed top-[-20%] left-[-10%] h-[600px] w-[600px] rounded-full bg-blue-600/[0.04] blur-[150px] z-0" />
            <div className="fixed bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-purple-600/[0.04] blur-[120px] z-0" />

            <div className="relative z-10 mx-auto w-full max-w-4xl px-6 py-24 sm:py-32 md:px-12 flex flex-col items-center">
                {/* Back Link */}
                <div className="text-center mb-12">
                    <TransitionLink
                        href="/#projects"
                        className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors group"
                    >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.05] border border-white/[0.1] transition-all group-hover:bg-white/[0.1] group-hover:border-white/[0.2]">
                            <span className="group-hover:-translate-x-0.5 transition-transform">&larr;</span>
                        </div>
                        Back to Projects
                    </TransitionLink>
                </div>

                {/* Header */}
                <div className="mb-20 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    <div
                        className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/[0.08] px-5 py-2 text-sm font-semibold text-blue-300 mb-6 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                    >
                        <Hammer size={14} className="animate-pulse" />
                        <span>Build with me</span>
                    </div>

                    <h1
                        className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white tracking-tight mb-5"
                    >
                        {project.title}
                    </h1>

                    <p
                        className="text-xl md:text-2xl text-slate-400 font-medium mb-8 max-w-2xl mx-auto"
                    >
                        {project.subtitle}
                    </p>

                    <div
                        className="h-px w-32 bg-gradient-to-r from-transparent via-blue-500/80 to-transparent mb-10 mx-auto"
                    />

                    <p
                        className="text-base md:text-lg leading-relaxed text-slate-300 max-w-3xl mx-auto"
                    >
                        {project.overview}
                    </p>
                </div>

                {/* Timeline Component */}
                <BuildTimeline steps={project.steps} />

                {/* Footer CTA */}
                <div className="mt-32 text-center pb-12">
                    <h3 className="text-2xl font-bold text-white mb-6">Inspired to build something similar?</h3>
                    <TransitionLink
                        href="/#contact"
                        className="inline-flex items-center gap-3 overflow-hidden rounded-xl border border-white/[0.12] bg-white/[0.06] px-8 py-4 text-sm font-bold text-slate-200 transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.25] hover:bg-white/[0.1] hover:text-white hover:shadow-lg"
                    >
                        Let&apos;s collaborate
                    </TransitionLink>
                </div>
            </div>
        </main>
    );
}
