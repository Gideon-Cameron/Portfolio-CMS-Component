import React from "react";
import { motion, Variants } from "framer-motion";

type AnimatedTextProps = {
  text: string;
  as?: React.ElementType;
  className?: string;
  delay?: number;
  duration?: number; // NEW
};

const AnimatedText = ({
  text,
  as: Tag = "span",
  className = "",
  delay = 0,
  duration = 0.6, // default duration
}: AnimatedTextProps) => {
  const letters = Array.from(text);

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: duration / letters.length, // evenly spreads over duration
        delayChildren: delay,
      },
    },
  };

  const child: Variants = {
    hidden: {
      opacity: 0,
      filter: "blur(8px)",
      y: 10,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: duration * 0.6, // each character animation length
        ease: "easeOut",
      },
    },
  };

  return (
    <Tag className={className}>
      <motion.span
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="inline-block"
      >
        {letters.map((char, index) => (
          <motion.span key={index} variants={child} className="inline-block">
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
};

export default AnimatedText;
