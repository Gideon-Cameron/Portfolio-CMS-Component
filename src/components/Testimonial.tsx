import { motion } from "framer-motion";
import { testimonialsContent } from "../data/defaultContent";
import TestimonialCard from "./TestimonialCard";

const Testimonial = () => {
  const { sectionTitle, testimonials } = testimonialsContent;

  return (
    <section
      id="testimonials"
      className="max-w-4xl mx-auto px-6 md:px-12 py-20 md:py-24"
    >
      {/* Section Heading */}
      <motion.div
        className="flex items-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold text-[#007acc] dark:text-[#64ffda] font-mono whitespace-nowrap">
          <span className="mr-2 font-mono text-[#007acc] dark:text-[#64ffda]">05.</span>
          {sectionTitle}
        </h2>
        <div className="h-px ml-5 flex-1 max-w-[300px] bg-[#8892b0] relative -top-[5px]" />
      </motion.div>

      {/* Testimonials */}
      {testimonials.map((testimonial, i) => (
        <motion.div
          key={testimonial.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: i * 0.15 }}
          viewport={{ once: true }}
        >
          <TestimonialCard {...testimonial} />
        </motion.div>
      ))}
    </section>
  );
};

export default Testimonial;
