import Navbar from "./components/navbar";
import Main from "./components/main";
import About from "./components/about";
import Skills from "./components/skills";
import Projects from "./components/project";
import Contact from "./components/contact";
import Footer from "./components/footer";
import Services from "./components/services";

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-gray-800 text-white">
        <Navbar /> {/* Navbar fixed to the top */}
        <main className="space-y-24 pt-16">  {/* Adjust padding-top to avoid overlap */}
          <Main />
            <About />
            <Skills />
          <div className="pt-32">
            <Services />
          </div>
            <Projects />
            <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
