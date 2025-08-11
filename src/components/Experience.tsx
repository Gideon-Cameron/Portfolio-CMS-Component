import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

type ExperienceItem = {
  title: string;
  context: string;
  date: string;
  points: string[];
};

type ExperienceProps = {
  sectionNumber?: number; // matches About behavior
};

const Experience = ({ sectionNumber }: ExperienceProps) => {
  const [experienceData, setExperienceData] = useState<Record<string, ExperienceItem>>({});
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      setLoading(true);
      try {
        const snap = await getDoc(doc(db, "content", "experience"));
        if (snap.exists()) {
          const rawData = snap.data() as Record<string, ExperienceItem>;

          const sortedKeys = Object.keys(rawData).sort((a, b) => {
            const numA = parseInt(a.replace(/\D/g, ""), 10);
            const numB = parseInt(b.replace(/\D/g, ""), 10);
            return numA - numB;
          });

          const filteredSortedData = sortedKeys.reduce((acc, key) => {
            const item = rawData[key];
            const hasContent =
              item.title?.trim() ||
              item.context?.trim() ||
              item.date?.trim() ||
              item.points?.some((pt) => pt.trim());
            if (hasContent) acc[key] = item;
            return acc;
          }, {} as Record<string, ExperienceItem>);

          setExperienceData(filteredSortedData);
          setActiveTab(Object.keys(filteredSortedData)[0] || null);
          console.log("✅ Experience data loaded:", filteredSortedData);
        } else {
          console.warn("⚠️ Experience document does not exist.");
        }
      } catch (err) {
        console.error("❌ Failed to fetch experience data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, []);

  const tabs = Object.keys(experienceData);
  const hasHeadingContent = tabs.length > 0;

  if (loading) {
    return (
      <section
        id="experience"
        className="max-w-5xl mx-auto px-6 md:px-12 py-20 md:py-24 text-center dark:text-dark-textSecondary"
      >
        Loading experience...
      </section>
    );
  }

  if (!tabs.length) return null;

  return (
    <section id="experience" className="max-w-5xl mx-auto px-6 md:px-12 py-20 md:py-24">
      {/* Section Heading - same behavior as About */}
      {hasHeadingContent && typeof sectionNumber === "number" && (
        <motion.div
          className="flex items-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-chocolate dark:text-dark-accent font-mono whitespace-nowrap">
            <span className="mr-2 font-mono text-accent dark:text-dark-accent">
              0.{sectionNumber}
            </span>
            Where I've Worked
          </h2>
          <div className="h-px ml-5 flex-1 max-w-[300px] bg-dark-textSecondary relative -top-[5px]" />
        </motion.div>
      )}

      {/* Layout */}
      <motion.div
        className="flex flex-col md:flex-row gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        {/* Tabs */}
        <motion.div className="md:w-1/4 border-l border-dark-textSecondary" variants={{ hidden: {}, visible: {} }}>
          <ul className="flex md:flex-col text-sm font-mono">
            {tabs.map((tab, i) => (
              <motion.li key={tab} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 + 0.2 }}>
                <button
                  className={`w-full text-left px-4 py-3 transition-colors duration-200 ${
                    activeTab === tab
                      ? "border-l-2 border-dark-accent text-dark-accent dark:text-dark-accent bg-dark-accent/5"
                      : "text-light-textSecondary dark:text-dark-textSecondary hover:bg-dark-accent/5 hover:text-dark-accent"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {experienceData[tab].title?.trim() || "Untitled"}
                </button>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Content */}
        {activeTab && (
          <motion.div
            className="md:w-3/4"
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
          >
            {experienceData[activeTab].title?.trim() && (
              <h3 className="text-xl font-semibold text-light-textPrimary dark:text-dark-textPrimary">
                {experienceData[activeTab].title}{" "}
                {experienceData[activeTab].context?.trim() && (
                  <span className="text-light-accent dark:text-dark-accent">@ {experienceData[activeTab].context}</span>
                )}
              </h3>
            )}

            {experienceData[activeTab].date?.trim() && (
              <p className="text-sm font-mono text-light-textSecondary dark:text-dark-textSecondary mb-4">
                {experienceData[activeTab].date}
              </p>
            )}

            <ul className="list-disc ml-5 space-y-2 text-light-textSecondary dark:text-dark-textSecondary">
              {experienceData[activeTab].points
                .filter((point) => point.trim() !== "")
                .map((point, i) => (
                  <motion.li key={i} className="leading-relaxed" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                    {point}
                  </motion.li>
                ))}
            </ul>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default Experience;
