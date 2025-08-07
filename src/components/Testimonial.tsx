import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import TestimonialCard from "./TestimonialCard";

type Testimonial = {
  name: string;
  imageUrl: string;
  quote: string;
  projectLink?: string;
};

type TestimonialProps = {
  sectionNumber?: number;
};

const Testimonial = ({ sectionNumber }: TestimonialProps) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const snap = await getDoc(doc(db, "content", "testimonials"));
        if (snap.exists()) {
          const data = snap.data();
          const items = (data.items || []) as Testimonial[];
          const filtered = items.filter(
            (t) => t.name?.trim() || t.quote?.trim() || t.imageUrl?.trim()
          );
          setTestimonials(filtered);
          console.log("✅ Testimonials loaded:", filtered);
        } else {
          console.warn("⚠️ Testimonials document does not exist.");
        }
      } catch (err) {
        console.error("❌ Error fetching testimonials", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <section
        id="testimonials"
        className="max-w-4xl mx-auto px-6 md:px-12 py-20 md:py-24 text-center dark:text-dark-textSecondary"
      >
        Loading testimonials...
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

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
        <h2 className="text-2xl font-bold text-light-accent dark:text-dark-accent font-mono whitespace-nowrap">
          {sectionNumber !== undefined && (
            <span className="mr-2 font-mono text-light-accent dark:text-dark-accent">
              {String(sectionNumber).padStart(2, "0")}.
            </span>
          )}
          Testimonials
        </h2>
        <div className="h-px ml-5 flex-1 max-w-[300px] bg-dark-textSecondary relative -top-[5px]" />
      </motion.div>

      {/* Testimonials */}
      {testimonials.map((testimonial, i) => (
        <motion.div
          key={`testimonial-${i}`}
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
