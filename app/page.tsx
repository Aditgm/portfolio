import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Achievements from "@/components/Achievements";
import Experience from "@/components/Experience";
import GithubGraph from "@/components/GithubGraph";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Footer from "@/components/Footer";
import ChatbotRAG from "@/components/ChatbotRAG";
import StaticGeometry, { type StaticGeometryAccent } from "@/components/StaticGeometry";

const ambientAccents: StaticGeometryAccent[] = [
  {
    id: "stats-left-octa",
    color: "rgba(123, 167, 173, 0.12)",
    position: [-51, 26],
    size: 0.7,
    blur: 140,
    opacity: 0.12,
  },
  {
    id: "experience-ring",
    color: "rgba(142, 168, 196, 0.1)",
    position: [54, 4],
    size: 0.9,
    blur: 160,
    opacity: 0.1,
  },
  {
    id: "projects-ico",
    color: "rgba(155, 158, 196, 0.11)",
    position: [-45, -27],
    size: 0.8,
    blur: 130,
    opacity: 0.11,
  },
  {
    id: "skills-octa",
    color: "rgba(144, 184, 201, 0.1)",
    position: [48, -31],
    size: 0.6,
    blur: 120,
    opacity: 0.1,
  },
];

export default function Home() {
  return (
    <>
      <div className="relative min-h-screen bg-transparent">
        <StaticGeometry accents={ambientAccents} className="z-[1] opacity-70" />
        <Navbar />
        <div className="relative z-10">
          <Hero />
          <Achievements />
          <Experience />
          <Projects />
          <Skills />
          <Education />
          <GithubGraph />
          <Footer />
        </div>
      </div>
      <ChatbotRAG />
    </>
  );
}
