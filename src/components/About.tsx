import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

type AboutContent = {
  title: string;
  paragraphs: string[];
  imageUrl: string;
};

const About = () => {
  const [aboutData, setAboutData] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const docRef = doc(db, "content", "about");
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          const data = snap.data() as AboutContent;
          setAboutData(data);
          console.log("✅ About data loaded:", data);
        } else {
          console.warn("⚠️ About document does not exist.");
        }
      } catch (err) {
        console.error("❌ Failed to fetch about data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  if (loading || !aboutData) {
    return (
      <section
        id="about"
        className="max-w-5xl mx-auto px-6 md:px-12 py-20 md:py-24 text-center text-[#8892b0]"
      >
        Loading about section...
      </section>
    );
  }

  const { title, paragraphs, imageUrl } = aboutData;

  return (
    <section
      id="about"
      className="max-w-5xl mx-auto px-6 md:px-12 py-20 md:py-24 flex flex-col md:flex-row gap-12 items-center"
    >
      {/* LEFT - TEXT */}
      <motion.div
        className="md:w-3/5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.15 }}
        variants={{
          visible: { transition: { staggerChildren: 0.15 } },
          hidden: {},
        }}
      >
        {/* SECTION HEADING */}
        <motion.div
          className="flex items-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-[#007acc] dark:text-[#64ffda] font-mono whitespace-nowrap">
            <span className="mr-2 font-mono text-[#007acc] dark:text-[#64ffda]">01.</span>
            {title}
          </h2>
          <div className="h-px ml-5 flex-1 max-w-[300px] bg-[#233554] relative -top-[0px]" />
        </motion.div>

        <div className="space-y-4 text-[#4b5563] dark:text-[#8892b0] text-base leading-relaxed">
          {paragraphs.map((text, index) => (
            <motion.p
              key={index}
              className="mb-2"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.15, duration: 0.5 }}
              viewport={{ once: true }}
            >
              {text}
            </motion.p>
          ))}
        </div>
      </motion.div>

      {/* RIGHT - IMAGE */}
      <motion.div
        className="md:w-2/5 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="relative group w-64 h-64 rounded-md overflow-hidden shadow-lg">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Profile image"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-500 rounded"
            />
          ) : (
            <div className="w-full h-full bg-[#112240] flex items-center justify-center text-[#64ffda] text-sm">
              No image uploaded
            </div>
          )}
          <div className="absolute inset-0 border-2 border-[#64ffda] rounded pointer-events-none" />
        </div>
      </motion.div>
    </section>
  );
};

export default About;
