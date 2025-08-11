import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

type AboutContent = {
  title: string;
  paragraphs: string[];
  imageUrl: string;
};

type AboutProps = {
  sectionNumber?: number; // ✅ Numeric from Firestore via App.tsx
};

const About = ({ sectionNumber }: AboutProps) => {
  const [aboutData, setAboutData] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        const aboutSnap = await getDoc(doc(db, "content", "about"));
        if (aboutSnap.exists()) {
          setAboutData(aboutSnap.data() as AboutContent);
        } else {
          console.warn("⚠️ About document does not exist.");
        }
      } catch (err) {
        console.error("❌ Failed to fetch about data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutContent();
  }, []);

  if (loading) {
    return (
      <section
        id="about"
        className="w-full bg-soft max-w-none px-6 md:px-12 py-20 md:py-24 text-center dark:text-dark-textSecondary"
      >
        Loading about section...
      </section>
    );
  }

  if (
    !aboutData ||
    (!aboutData.title?.trim() &&
      (!aboutData.paragraphs || aboutData.paragraphs.length === 0) &&
      !aboutData.imageUrl?.trim())
  ) {
    return null;
  }

  const { title, paragraphs, imageUrl } = aboutData;
  const hasHeadingContent =
    title?.trim() || (paragraphs && paragraphs.length > 0);

  return (
    <section id="about" className="w-full bg-soft">
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-20 md:py-24 flex flex-col md:flex-row gap-12 items-center">
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
          {hasHeadingContent && typeof sectionNumber === "number" && (
            <motion.div
              className="flex items-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-chocolate dark:text-dark-accent font-playpen whitespace-nowrap">
                <span className="mr-2 font-playpen text-accent dark:text-dark-accent">
                  0.{sectionNumber}
                </span>
                {title || "About Me"}
              </h2>
              <div className="h-px ml-5 flex-1 max-w-[300px] bg-dark-border" />
            </motion.div>
          )}

          <div className="space-y-4 text-light-textSecondary dark:text-dark-textSecondary text-base leading-relaxed">
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
          <div className="relative flex items-center justify-center w-[280px] h-[280px] rounded-md overflow-hidden shadow-lg">
            {imageUrl?.trim() ? (
              <img
                src={imageUrl}
                alt="Profile image"
                className="w-full h-full object-cover rounded"
              />
            ) : (
              <div className="w-full h-full bg-dark-background-alt flex items-center justify-center text-dark-accent text-sm">
                No image uploaded
              </div>
            )}
            <div className="absolute inset-0 border-2 border-chocolate rounded pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
