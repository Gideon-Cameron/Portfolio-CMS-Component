import Navbar from "./components/Navbar";
import LeftSidebar from "./components/LeftSidebar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Testimonial from "./components/Testimonial";
import { heroContent, aboutContent, experienceContent, skillsContent } from "./data/defaultContent";

const App = () => {
  return (
    <div className="bg-light-background text-light-textPrimary dark:bg-dark-background dark:text-dark-textPrimary transition-colors duration-300 font-sans">
      <LeftSidebar />
      <Navbar />

      

      <main className="pt-10 space-y-22 px-6 nav:pl-20 md:px-12">
        <section id="hero">
        <Hero {...heroContent} />
        </section>

         <section id="about">
          <About {...aboutContent} />
        </section>

        <section id="experience">
          <Experience {...experienceContent}/>
        </section>

        <section id="skills">
          <Skills {...skillsContent}/>
        </section>

        <section id="projects">
          <Projects />
        </section>

        <section id="testimonials">
          <Testimonial />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;
