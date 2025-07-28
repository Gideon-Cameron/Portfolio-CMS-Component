import { useState } from "react";
import { motion } from "framer-motion";

type ExperienceItem = {
  title: string;
  context: string;
  date: string;
  points: string[];
};

type ExperienceProps = {
  sectionTitle: string;
  experienceData: Record<string, ExperienceItem>;
};

const Experience = ({ sectionTitle, experienceData }: ExperienceProps) => {
  const tabs = Object.keys(experienceData) as Array<keyof typeof experienceData>;
  const [activeTab, setActiveTab] = useState<keyof typeof experienceData>(tabs[0]);

  return (
    <section id="experience" className="max-w-5xl mx-auto px-6 md:px-12 py-20 md:py-24">
      {/* Section Heading */}
      <motion.div
        className="flex items-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold text-[#007acc] dark:text-[#64ffda] font-mono whitespace-nowrap">
          <span className="mr-2 font-mono text-[#007acc] dark:text-[#64ffda]">02.</span>
          {sectionTitle}
        </h2>
        <div className="h-px ml-5 flex-1 max-w-[300px] bg-[#8892b0] relative -top-[5px]" />
      </motion.div>

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
        <motion.div className="md:w-1/4 border-l border-[#8892b0]" variants={{ hidden: {}, visible: {} }}>
          <ul className="flex md:flex-col text-sm font-mono">
            {tabs.map((tab, i) => (
              <motion.li
                key={tab}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 + 0.2 }}
              >
                <button
                  className={`w-full text-left px-4 py-3 transition-colors duration-200 ${
                    activeTab === tab
                      ? "border-l-2 border-[#64ffda] text-[#64ffda] dark:text-[#64ffda] bg-[#64ffda]/[0.05]"
                      : "text-[#4b5563] dark:text-[#8892b0] hover:bg-[#64ffda]/[0.03] hover:text-[#64ffda]"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Content */}
        <motion.div
          className="md:w-3/4"
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold text-[#111827] dark:text-[#ccd6f6]">
            {experienceData[activeTab].title}{" "}
            <span className="text-[#007acc] dark:text-[#64ffda]">@ {experienceData[activeTab].context}</span>
          </h3>
          <p className="text-sm font-mono text-[#4b5563] dark:text-[#8892b0] mb-4">
            {experienceData[activeTab].date}
          </p>
          <ul className="list-disc ml-5 space-y-2 text-[#4b5563] dark:text-[#8892b0]">
            {experienceData[activeTab].points.map((point, i) => (
              <motion.li
                key={i}
                className="leading-relaxed"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {point}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Experience;
