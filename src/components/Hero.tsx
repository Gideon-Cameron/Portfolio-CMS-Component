import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import AnimatedText from "../components/AnimatedText";

type HeroContent = {
  intro: string;
  name: string;
  subtitle: string;
  description: string;
};

const Hero = () => {
  const [content, setContent] = useState<HeroContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const ref = doc(db, "content", "hero");
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data() as HeroContent;
          setContent(data);
          console.log("✅ Hero document data:", data);
        } else {
          console.warn("⚠️ Hero document does not exist.");
        }
      } catch (err) {
        console.error("❌ Failed to fetch hero data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHero();
  }, []);

  if (loading || !content) {
    return (
      <section className="min-h-screen flex items-center justify-center font-mono bg-background w-full text-dark-text-secondary">
        Loading hero content...
      </section>
    );
  }

  const { intro, name, subtitle, description } = content;

  return (
    <section className="min-h-screen flex flex-col justify-center bg-background w-full">
      <div className="px-6 md:px-12 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-light-accent dark:text-dark-accent text-sm md:text-base font-mono mb-4"
        >
          {intro}
        </motion.p>

        {/* UPDATED NAME ANIMATION */}
        <AnimatedText
          text={name}
          as="h1"
          className="text-5xl sm:text-6xl md:text-7xl font-allura text-accent dark:text-dark-text-primary mb-2 leading-tight"
          delay={0.35}
        />

        {/* UPDATED SUBTITLE ANIMATION */}
        <AnimatedText
          text={subtitle}
          as="h2"
          className="text-4xl sm:text-5xl md:text-6xl font-tangerine text-accent dark:text-dark-text-secondary mb-6 leading-tight"
          delay={0.5}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="text-base sm:text-lg md:text-xl leading-relaxed text-light-text-primary dark:text-dark-text-primary max-w-2xl font-opensans"
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
};

export default Hero;
