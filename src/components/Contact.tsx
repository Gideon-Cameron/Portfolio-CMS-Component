import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);

  const [messageSent, setMessageSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [enabled, setEnabled] = useState(true);
  const [sectionNumber, setSectionNumber] = useState<number>(4); // Default to 0.4
  const [description, setDescription] = useState(
    "I’m currently looking for new creative marketing opportunities. If you're interested in collaborating or just want to say hello, feel free to drop a message — I’ll respond as soon as I can!"
  );

  // Load settings from Firestore
  useEffect(() => {
    const fetchContactSettings = async () => {
      try {
        const snap = await getDoc(doc(db, "sections", "contact"));
        if (snap.exists()) {
          const data = snap.data();
          setEnabled(data.enabled ?? true);
          setSectionNumber(data.displayNumber ?? 4);
          setDescription(
            data.description ??
              "I’m currently looking for new creative marketing opportunities. If you're interested in collaborating or just want to say hello, feel free to drop a message — I’ll respond as soon as I can!"
          );
        }
      } catch (err) {
        console.error("❌ Failed to load contact section settings", err);
      }
    };

    fetchContactSettings();
  }, []);

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

  if (!enabled) return null;

  return (
    <section id="contact" className="bg-background w-full">
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-20 md:py-24 text-center">
        {/* Heading */}
        <motion.div
          className="flex items-center justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-accent font-playpen whitespace-nowrap">
            <span className="mr-2 font-playpen text-accent">
              {String(sectionNumber).padStart(2, "0")}.
            </span>
            What’s Next?
          </h2>
          <div className="h-px ml-5 flex-1 max-w-[300px] bg-accent relative -top-[5px]" />
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-lg text-richblack mb-6 max-w-xl mx-auto font-sans"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          {description}
        </motion.p>

        {!showForm && (
          <motion.button
            onClick={() => setShowForm(true)}
            className="px-6 py-2 border border-accent text-accent rounded hover:bg-accent/10 transition"
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
              className="mt-10 bg-soft p-6 rounded-lg shadow-md flex flex-col gap-4 text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <input
                type="text"
                name="user_name"
                placeholder="Your Name"
                className="p-3 rounded bg-[#f5f5f5] text-richblack focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <input
                type="email"
                name="user_email"
                placeholder="Your Email"
                className="p-3 rounded bg-[#f5f5f5] text-richblack focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <textarea
                name="message"
                rows={4}
                placeholder="Your Message"
                className="p-3 rounded bg-[#f5f5f5] text-richblack focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                type="submit"
                className="mt-2 px-6 py-2 bg-[#f5f5f5] border border-accent text-accent rounded hover:bg-accent/10 transition"
              >
                Send Message
              </button>

              {/* Feedback */}
              {messageSent && (
                <motion.p
                  className="text-green-600 mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  ✅ Message sent successfully!
                </motion.p>
              )}
              {error && (
                <motion.p
                  className="text-red-600 mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  ❌ {error}
                </motion.p>
              )}
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Contact;
