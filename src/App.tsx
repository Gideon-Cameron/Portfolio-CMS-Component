import { useEffect, useState, Suspense, lazy } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./lib/firebase";

import Navbar from "./components/Navbar";
import LeftSidebar from "./components/LeftSidebar";
import Hero from "./components/Hero"; // Load immediately

// Lazy-loaded sections
const About = lazy(() => import("./components/About"));
const Experience = lazy(() => import("./components/Experience"));
const Skills = lazy(() => import("./components/Skills"));
const Projects = lazy(() => import("./components/Projects"));
const Testimonial = lazy(() => import("./components/Testimonial"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

type SectionMeta = {
  displayNumber: number;
  enabled: boolean;
};

const App = () => {
  const [sectionsMeta, setSectionsMeta] = useState<Record<string, SectionMeta>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSectionsMeta = async () => {
      try {
        const snapshot = await getDocs(collection(db, "sections"));
        const metaData: Record<string, SectionMeta> = {};

        snapshot.forEach((docSnap) => {
          const meta = docSnap.data() as Partial<SectionMeta>;
          metaData[docSnap.id] = {
            displayNumber: typeof meta.displayNumber === "number" ? meta.displayNumber : 1,
            enabled: meta.enabled ?? true,
          };
        });

        setSectionsMeta(metaData);
        console.log("✅ Loaded sections metadata:", metaData);
      } catch (err) {
        console.error("❌ Failed to fetch sections metadata:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSectionsMeta();
  }, []);

  return (
    <div className="text-light-textPrimary dark:text-dark-textPrimary transition-colors duration-300 font-sans">
      <LeftSidebar />
      <Navbar />

      <main className="pt-10 space-y-22">
        {/* Hero loads immediately */}
        <section id="hero">
          <Hero />
        </section>

        {/* Lazy load the rest */}
        <Suspense fallback={<div className="text-center py-10">Loading section...</div>}>
          {!loading && sectionsMeta.about?.enabled && (
            <section id="about">
              <About sectionNumber={sectionsMeta.about.displayNumber} />
            </section>
          )}

          {!loading && sectionsMeta.experience?.enabled && (
            <section id="experience">
              <Experience sectionNumber={sectionsMeta.experience.displayNumber} />
            </section>
          )}

          {!loading && sectionsMeta.skills?.enabled && (
            <section id="skills">
              <Skills sectionNumber={sectionsMeta.skills.displayNumber} />
            </section>
          )}

          {!loading && sectionsMeta.projects?.enabled && (
            <section id="projects">
              <Projects sectionNumber={sectionsMeta.projects.displayNumber} />
            </section>
          )}

          {!loading && sectionsMeta.testimonials?.enabled && (
            <section id="testimonials">
              <Testimonial sectionNumber={sectionsMeta.testimonials.displayNumber} />
            </section>
          )}

          <section id="contact">
            <Contact />
          </section>

          <section id="footer">
            <Footer />
          </section>
        </Suspense>
      </main>
    </div>
  );
};

export default App;
