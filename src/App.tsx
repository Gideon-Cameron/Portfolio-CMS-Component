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

import {
  heroContent,
  aboutContent,
  experienceContent,
  skillsContent,
  projectsContent,
} from "./data/defaultContent";

const App = () => {
  return (
    <div className="bg-light-background text-light-textPrimary dark:bg-dark-background dark:text-dark-textPrimary transition-colors duration-300 font-sans">
      <LeftSidebar />
      <Navbar />

      <main className="pt-10 space-y-22 px-6 nav:pl-20 md:px-12">
        {/* Hero section always visible, no number */}
        <section id="hero">
          <Hero {...heroContent} />
        </section>

        {/* All others will check content and number themselves */}
        <About {...aboutContent} sectionNumber={1} />
        <Experience {...experienceContent} sectionNumber={2} />
        <Skills {...skillsContent} sectionNumber={3} />
        <Projects {...projectsContent} sectionNumber={4} />
        <Testimonial sectionNumber={5} />
        <Contact sectionNumber={6} />
      </main>

      <Footer />
    </div>
  );
};

export default App;
