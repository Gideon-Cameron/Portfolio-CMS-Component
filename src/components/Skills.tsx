import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type SkillsProps = {
  sectionTitle: string;
  skillGroups: Record<string, string[]>;
};

const Skills = ({ sectionTitle, skillGroups }: SkillsProps) => {
  const categories = Object.keys(skillGroups) as Array<keyof typeof skillGroups>;
  const [activeTab, setActiveTab] = useState<keyof typeof skillGroups>(categories[0]);

  return (
    <section id="skills" className="max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-24">
      {/* Section Heading */}
      <motion.div
        className="flex items-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold text-[#007acc] dark:text-[#64ffda] font-mono whitespace-nowrap">
          <span className="mr-2 font-mono text-[#007acc] dark:text-[#64ffda]">03.</span>
          {sectionTitle}
        </h2>
        <div className="h-px ml-5 flex-1 max-w-[300px] bg-[#8892b0] relative -top-[5px]" />
      </motion.div>

      {/* Tab Buttons */}
      <motion.div
        className="flex flex-wrap gap-4 mb-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.08,
            },
          },
        }}
      >
        {categories.map((category, index) => (
          <motion.button
            key={category}
            onClick={() => setActiveTab(category)}
            className={`px-4 py-2 rounded border transition text-sm font-mono ${
              activeTab === category
                ? "bg-[#64ffda]/10 text-[#64ffda] border-[#64ffda]"
                : "text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-[#64ffda] hover:text-[#64ffda]"
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
            visible: {
              transition: {
                staggerChildren: 0.07,
              },
            },
            hidden: {},
          }}
        >
          {skillGroups[activeTab].map((skill) => (
            <motion.div
              key={skill}
              className="text-center py-3 px-4 rounded text-sm text-[#111827] dark:text-[#ccd6f6] hover:text-[#007acc] dark:hover:text-[#64ffda] hover:bg-[#64ffda]/10 transition"
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
