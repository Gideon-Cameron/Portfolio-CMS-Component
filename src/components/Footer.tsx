import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="bg-background px-6 py-8 text-center text-sm text-[#4b5563] dark:text-[#8892b0]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col gap-2 items-center">
        <p>
          Designed & Built by{" "}
          <a
            href="https://www.linkedin.com/in/gideon-cameron-335801263/"
            target="_blank"
            className="hover:text-[#007acc] dark:hover:text-[#64ffda] transition"
          >
            Gideon Cameron
          </a>
        </p>
        <p>
          <a
            href="mailto:arielgermond@gmail.com"
            className="hover:text-[#007acc] dark:hover:text-[#64ffda] transition"
          >
            arielgermond@gmail.com
          </a>{" "}
          |{" "}
          
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
