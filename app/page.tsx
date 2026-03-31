import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Achievements from "@/components/Achievements";
import Experience from "@/components/Experience";
import GithubGraph from "@/components/GithubGraph";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Footer from "@/components/Footer";
import ChatbotRAG from "@/components/ChatbotRAG";
import Scene3D, { type Scene3DAccent } from "@/components/Scene3D";

const ambientAccents: Scene3DAccent[] = [
  {
    id: "stats-left-octa",
    shape: "octahedron",
    position: [-5.1, 2.6, -9.5],
    color: "#7ba7ad",
    size: 0.7,
    speed: 0.7,
    materialType: "wobble",
    factor: 0.12,
  },
  {
    id: "experience-ring",
    shape: "torus",
    position: [5.4, 0.4, -10.5],
    color: "#8ea8c4",
    size: 0.92,
    speed: 0.58,
    materialType: "distort",
    distortion: 0.12,
    rotation: [0.6, 0.3, 0.4],
  },
  {
    id: "projects-ico",
    shape: "icosahedron",
    position: [-4.5, -2.7, -8.2],
    color: "#9b9ec4",
    size: 0.82,
    speed: 0.5,
    materialType: "distort",
    distortion: 0.1,
  },
  {
    id: "skills-octa",
    shape: "octahedron",
    position: [4.8, -3.1, -9.3],
    color: "#90b8c9",
    size: 0.64,
    speed: 0.62,
    materialType: "wobble",
    factor: 0.1,
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen bg-transparent">
      <Scene3D accents={ambientAccents} className="z-[1] opacity-70" />
      <Navbar />
      <div className="relative z-10">
        <Hero />
        <Stats />
        <Achievements />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <GithubGraph />
        <Footer />
        <ChatbotRAG />
      </div>
    </main>
  );
}
