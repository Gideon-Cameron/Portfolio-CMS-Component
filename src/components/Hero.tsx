import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase"; // adjust path as needed

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
      <section className="min-h-screen flex items-center justify-center text-[#8892b0] font-mono">
        Loading hero content...
      </section>
    );
  }

  const { intro, name, subtitle, description } = content;

  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 max-w-4xl mx-auto">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-[#007acc] dark:text-[#64ffda] text-sm md:text-base font-mono mb-4"
      >
        {intro}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.6 }}
        className="text-5xl sm:text-6xl md:text-7xl font-bold text-[#0f172a] dark:text-[#ccd6f6] mb-2 leading-tight"
      >
        {name}
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-4xl sm:text-5xl md:text-6xl font-semibold text-[#475569] dark:text-[#8892b0] mb-6 leading-tight"
      >
        {subtitle}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.6 }}
        className="text-base sm:text-lg md:text-xl leading-relaxed text-[#0f172a] dark:text-[#8892b0] max-w-2xl"
      >
        {description}
      </motion.p>
    </section>
  );
};

export default Hero;
