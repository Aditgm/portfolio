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

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent">
      <Navbar />
      <div className="relative z-10">
        <Hero />
        <Stats />
        <Achievements />
        <Experience />
        <GithubGraph />
        <Projects />
        <Skills />
        <Education />
        <Footer />
      </div>
    </main>
  );
}
