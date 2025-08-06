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

import { motion } from "framer-motion";

const SectionWrapper = ({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) => (
  <section id={title.toLowerCase()} className="scroll-mt-20">
    <motion.div
      className="flex items-center mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-2xl font-bold text-[#007acc] dark:text-[#64ffda] font-mono whitespace-nowrap">
        <span className="mr-2">{String(number).padStart(2, "0")}.</span> {title}
      </h2>
      <div className="h-px ml-5 flex-1 max-w-[300px] bg-[#8892b0]" />
    </motion.div>
    {children}
  </section>
);

const App = () => {
  const sections = [
    {
      id: "hero",
      title: "Hero",
      visible: heroContent && Object.keys(heroContent).length > 0,
      component: <Hero {...heroContent} />,
    },
    {
      id: "about",
      title: "About",
      visible: aboutContent && Object.values(aboutContent).some(Boolean),
      component: <About {...aboutContent} />,
    },
    {
      id: "experience",
      title: "Experience",
      visible:
        experienceContent &&
        Array.isArray(experienceContent.experiences) &&
        experienceContent.experiences.length > 0,
      component: <Experience {...experienceContent} />,
    },
    {
      id: "skills",
      title: "Skills",
      visible:
        skillsContent &&
        Array.isArray(skillsContent.skills) &&
        skillsContent.skills.length > 0,
      component: <Skills {...skillsContent} />,
    },
    {
      id: "projects",
      title: "Projects",
      visible:
        projectsContent &&
        Array.isArray(projectsContent.projects) &&
        projectsContent.projects.length > 0,
      component: <Projects {...projectsContent} />,
    },
    {
      id: "testimonials",
      title: "Testimonials",
      visible: true, // You can make this conditional later
      component: <Testimonial />,
    },
    {
      id: "contact",
      title: "Contact",
      visible: true,
      component: <Contact />,
    },
  ];

  const visibleSections = sections.filter((section) => section.visible);

  return (
    <div className="bg-light-background text-light-textPrimary dark:bg-dark-background dark:text-dark-textPrimary transition-colors duration-300 font-sans">
      <LeftSidebar />
      <Navbar />

      <main className="pt-10 space-y-22 px-6 nav:pl-20 md:px-12">
        {visibleSections.map((section, index) => (
          <SectionWrapper key={section.id} number={index + 1} title={section.title}>
            {section.component}
          </SectionWrapper>
        ))}
      </main>

      <Footer />
    </div>
  );
};

export default App;
