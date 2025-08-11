import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./lib/firebase";

import Navbar from "./components/Navbar";
import LeftSidebar from "./components/LeftSidebar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Testimonial from "./components/Testimonial";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

type SectionMeta = {
  displayNumber: number; // ✅ Numeric only
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
        {/* Hero always at the top */}
        <section id="hero">
          <Hero />
        </section>

        {/* About */}
        {!loading && sectionsMeta.about?.enabled && (
          <section id="about">
            <About sectionNumber={sectionsMeta.about.displayNumber} />
          </section>
        )}

        {/* Experience */}
        {!loading && sectionsMeta.experience?.enabled && (
          <section id="experience">
            <Experience sectionNumber={sectionsMeta.experience.displayNumber} />
          </section>
        )}

        {/* Skills */}
        {!loading && sectionsMeta.skills?.enabled && (
          <section id="skills">
            <Skills sectionNumber={sectionsMeta.skills.displayNumber} />
          </section>
        )}

        {/* Projects */}
        {!loading && sectionsMeta.projects?.enabled && (
          <section id="projects">
            <Projects sectionNumber={sectionsMeta.projects.displayNumber} />
          </section>
        )}

        {/* Testimonials */}
        {!loading && sectionsMeta.testimonials?.enabled && (
          <section id="testimonials">
            <Testimonial sectionNumber={sectionsMeta.testimonials.displayNumber} />
          </section>
        )}

        {/* Contact */}
        <section id="contact">
          <Contact />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;
