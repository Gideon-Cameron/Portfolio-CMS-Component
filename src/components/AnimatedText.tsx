import { motion, Variants } from "framer-motion";

type AnimatedTextProps = {
  text: string;
  as?: keyof JSX.IntrinsicElements; // h1, h2, p, etc.
  className?: string;
  delay?: number; // optional global delay
};

const AnimatedText = ({
  text,
  as = "span",
  className = "",
  delay = 0,
}: AnimatedTextProps) => {
  const letters = Array.from(text);

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
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
        duration: 0.45,
        ease: "easeOut",
      },
    },
  };

  const Tag = as;

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
          <motion.span
            key={index}
            variants={child}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
};

export default AnimatedText;
