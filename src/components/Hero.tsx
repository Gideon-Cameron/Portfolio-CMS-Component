import { motion } from "framer-motion";

type HeroProps = {
  intro: string;
  name: string;
  subtitle: string;
  description: string;
};

const Hero = ({ intro, name, subtitle, description }: HeroProps) => {
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
