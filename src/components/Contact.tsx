import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";

type ContactProps = {
  sectionNumber: number;
};

const Contact = ({ sectionNumber }: ContactProps) => {
  const form = useRef<HTMLFormElement>(null);
  const [messageSent, setMessageSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) return;

    const name = form.current.user_name.value.trim();
    const email = form.current.user_email.value.trim();
    const message = form.current.message.value.trim();

    if (!name || !email || !message) {
      setError("All fields are required.");
      return;
    }

    emailjs
      .sendForm("service_2e9zq4f", "template_mq85xh3", form.current, "VSey23muaE28V71S_")
      .then(
        () => {
          setMessageSent(true);
          setError(null);
          form.current?.reset();
        },
        () => {
          setError("Failed to send the message. Please try again later.");
        }
      );
  };

  return (
    <section id="contact" className="max-w-4xl mx-auto px-6 md:px-12 py-20 md:py-24 text-center">
      {/* Heading */}
      <motion.div
        className="flex items-center justify-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold text-[#007acc] dark:text-[#64ffda] font-mono whitespace-nowrap">
          <span className="mr-2 font-mono text-[#007acc] dark:text-[#64ffda]">
            {String(sectionNumber).padStart(2, "0")}.
          </span>
          What’s Next?
        </h2>
        <div className="h-px ml-5 flex-1 max-w-[300px] bg-[#8892b0] relative -top-[5px]" />
      </motion.div>

      {/* Description & Button */}
      <motion.p
        className="text-lg text-[#111827] dark:text-[#ccd6f6] mb-6 max-w-xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: true }}
      >
        I’m currently looking for full-time frontend opportunities. If you’re interested in working
        together or just want to connect, feel free to reach out. I’ll respond as soon as I can!
      </motion.p>

      {!showForm && (
        <motion.button
          onClick={() => setShowForm(true)}
          className="px-6 py-2 border border-[#007acc] dark:border-[#64ffda] text-[#007acc] dark:text-[#64ffda] rounded hover:bg-[#007acc]/10 dark:hover:bg-[#64ffda]/10 transition"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          viewport={{ once: true }}
        >
          Say Hello
        </motion.button>
      )}

      {/* Contact Form */}
      <AnimatePresence>
        {showForm && (
          <motion.form
            ref={form}
            onSubmit={sendEmail}
            className="mt-10 bg-white dark:bg-[#0a192f] p-6 rounded-lg shadow-md flex flex-col gap-4 text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <input
              type="text"
              name="user_name"
              placeholder="Your Name"
              className="p-3 rounded bg-gray-100 dark:bg-gray-800 text-[#111827] dark:text-[#ccd6f6] focus:outline-none focus:ring-2 focus:ring-[#64ffda]"
            />
            <input
              type="email"
              name="user_email"
              placeholder="Your Email"
              className="p-3 rounded bg-gray-100 dark:bg-gray-800 text-[#111827] dark:text-[#ccd6f6] focus:outline-none focus:ring-2 focus:ring-[#64ffda]"
            />
            <textarea
              name="message"
              rows={4}
              placeholder="Your Message"
              className="p-3 rounded bg-gray-100 dark:bg-gray-800 text-[#111827] dark:text-[#ccd6f6] focus:outline-none focus:ring-2 focus:ring-[#64ffda]"
            />
            <button
              type="submit"
              className="mt-2 px-6 py-2 border border-[#64ffda] text-[#64ffda] rounded hover:bg-[#64ffda]/10 transition"
            >
              Send Message
            </button>

            {/* Feedback */}
            {messageSent && (
              <motion.p
                className="text-green-500 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                ✅ Message sent successfully!
              </motion.p>
            )}
            {error && (
              <motion.p
                className="text-red-500 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                ❌ {error}
              </motion.p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
