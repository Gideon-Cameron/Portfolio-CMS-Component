import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaTelegram,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaEnvelope,
  FaGlobe,
  FaMedium,
  FaDev,
  FaDribbble,
  FaBehance,
} from "react-icons/fa";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

// 🔁 Updated type
type SocialLink = {
  name: string;
  url: string;
};

function getIconForUrl(url: string): JSX.Element | null {
  if (url.includes("linkedin.com")) return <FaLinkedin className="w-5 h-5" />;
  if (url.includes("github.com")) return <FaGithub className="w-5 h-5" />;
  if (url.includes("facebook.com")) return <FaFacebook className="w-5 h-5" />;
  if (url.includes("instagram.com")) return <FaInstagram className="w-5 h-5" />;
  if (url.includes("youtube.com")) return <FaYoutube className="w-5 h-5" />;
  if (url.includes("tiktok.com")) return <FaTiktok className="w-5 h-5" />;
  if (url.includes("t.me") || url.includes("telegram.me")) return <FaTelegram className="w-5 h-5" />;
  if (url.includes("medium.com")) return <FaMedium className="w-5 h-5" />;
  if (url.includes("dev.to")) return <FaDev className="w-5 h-5" />;
  if (url.includes("dribbble.com")) return <FaDribbble className="w-5 h-5" />;
  if (url.includes("behance.net")) return <FaBehance className="w-5 h-5" />;
  if (url.startsWith("mailto:")) return <FaEnvelope className="w-5 h-5" />;
  if (url.includes("http")) return <FaGlobe className="w-5 h-5" />;
  return null;
}

const LeftSidebar = () => {
  const [links, setLinks] = useState<SocialLink[]>([]);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const snap = await getDoc(doc(db, "content", "social"));
        if (snap.exists()) {
          const data = snap.data();
          const raw = data.links || [];

          const structured: SocialLink[] = raw.map((item: any) =>
            typeof item === "string" ? { name: "", url: item } : item
          );

          setLinks(structured.slice(0, 5));
          console.log("✅ Social links loaded:", structured);
        } else {
          console.warn("⚠️ Social links document does not exist.");
        }
      } catch (err) {
        console.error("❌ Error fetching social links:", err);
      }
    };

    fetchLinks();
  }, []);

  return (
    <div className="hidden nav:flex fixed bottom-0 left-0 pl-4 pr-2 flex-col items-center space-y-6 z-40">
      {links.map((link, index) => {
        const icon = getIconForUrl(link.url);
        if (!icon) return null;

        return (
          <motion.a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 + 0.5, duration: 0.5 }}
            whileHover={{
              color: "#64ffda",
              transition: { duration: 0.2 },
            }}
            className="text-gray-600 dark:text-gray-400"
            title={link.name || link.url}
            aria-label={link.name || link.url}
          >
            {icon}
          </motion.a>
        );
      })}

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "8rem", opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="w-[2px] bg-[#111827] dark:bg-[#ccd6f6] mt-6 mb-2"
      />
    </div>
  );
};

export default LeftSidebar;
