import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

type SkillGroups = Record<string, string[]>;

type SkillsProps = {
  sectionNumber?: number; // same contract as About
};

const Skills = ({ sectionNumber }: SkillsProps) => {
  const [skillGroups, setSkillGroups] = useState<SkillGroups>({});
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const contentSnap = await getDoc(doc(db, "content", "skills"));

        if (contentSnap.exists()) {
          const data = contentSnap.data() as SkillGroups;
          const categories = Object.keys(data).filter(
            (key) => Array.isArray(data[key]) && data[key].some((s) => s.trim())
          );

          if (categories.length > 0) {
            setSkillGroups(data);
            setActiveTab(categories[0]);
          }

          console.log("✅ Skill data loaded:", data);
        } else {
          console.warn("⚠️ Skills document does not exist.");
        }
      } catch (err) {
        console.error("❌ Failed to fetch skills", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const categories = Object.keys(skillGroups).filter(
    (key) => Array.isArray(skillGroups[key]) && skillGroups[key].some((s) => s.trim())
  );

  if (loading) {
    return (
      <section
        id="skills"
        className="max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-24 text-center dark:text-dark-textSecondary"
      >
        Loading skills...
      </section>
    );
  }

  if (!activeTab || categories.length === 0) {
    console.log("🚫 Skills section hidden or empty.");
    return null;
  }

  const hasHeadingContent = true; // skills always have heading when section is shown

  return (
    <section id="skills" className="max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-24">
      {/* Section Heading - same behavior as About */}
      {hasHeadingContent && typeof sectionNumber === "number" && (
        <motion.div
          className="flex items-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-light-accent dark:text-dark-accent font-mono whitespace-nowrap">
            <span className="mr-2">0.{sectionNumber}</span>
            Skills
          </h2>
          <div className="h-px ml-5 flex-1 max-w-[300px] bg-dark-textSecondary relative -top-[5px]" />
        </motion.div>
      )}

      {/* Tab Buttons */}
      <motion.div
        className="flex flex-wrap gap-4 mb-10"
        initial="hidden"
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {categories.map((category, index) => (
          <motion.button
            key={category}
            onClick={() => setActiveTab(category)}
            className={`px-4 py-2 rounded border transition text-sm font-mono ${
              activeTab === category
                ? "bg-dark-accent/10 text-dark-accent border-dark-accent"
                : "text-light-textSecondary dark:text-dark-textSecondary border-light-border dark:border-dark-textSecondary hover:border-dark-accent hover:text-dark-accent"
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

      {/* Skills Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={{
            visible: { transition: { staggerChildren: 0.07 } },
            hidden: {},
          }}
        >
          {skillGroups[activeTab]?.map((skill) => (
            <motion.div
              key={skill}
              className="text-center py-3 px-4 rounded text-sm text-light-textPrimary dark:text-dark-textPrimary hover:text-light-accent dark:hover:text-dark-accent hover:bg-dark-accent/10 transition"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              {skill}
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default Skills;
