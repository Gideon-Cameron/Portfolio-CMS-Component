import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

type Project = {
  id?: string;
  title: string;
  shortDescription: string;
  description: string;
  imageUrl: string;
  liveUrl: string;
  skills?: string[];
};

type ProjectsContent = {
  list: Project[];
};

type ProjectsMeta = {
  order?: number;
  enabled?: boolean;
};

type ProjectsProps = {
  sectionNumber?: number; // 👈 added
};

const Projects = ({ sectionNumber }: ProjectsProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selected, setSelected] = useState<Project | null>(null);
  const [showCount, setShowCount] = useState(3);
  const [loading, setLoading] = useState(true);
  const [sectionOrder, setSectionOrder] = useState<number>(sectionNumber ?? 5); // 👈 use passed value if available
  const [enabled, setEnabled] = useState(true);

  const handleClose = () => setSelected(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectSnap = await getDoc(doc(db, "content", "projects"));
        if (projectSnap.exists()) {
          const data = projectSnap.data() as ProjectsContent;
          setProjects(data.list || []);
        } else {
          console.warn("⚠️ Projects document does not exist.");
        }

        const metaSnap = await getDoc(doc(db, "content/sections", "projects"));
        if (metaSnap.exists()) {
          const meta = metaSnap.data() as ProjectsMeta;
          // only overwrite sectionOrder if sectionNumber not passed
          if (sectionNumber === undefined) {
            setSectionOrder(meta.order ?? 5);
          }
          setEnabled(meta.enabled ?? true);
        }
      } catch (err) {
        console.error("❌ Failed to fetch projects data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [sectionNumber]);

  if (loading) {
    return (
      <section
        id="projects"
        className="bg-[#f3ebe8] w-full max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-24 text-center text-experienceText"
      >
        Loading projects...
      </section>
    );
  }

  const hasValidProjects = projects.some(
    (p) => p.title?.trim() || p.shortDescription?.trim() || p.imageUrl?.trim()
  );

  if (!enabled || !hasValidProjects) {
    return null;
  }

  return (
    <section id="projects" className="bg-[#f3ebe8] w-full">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-24">
        {/* Section Heading */}
        {typeof sectionOrder === "number" && (
          <motion.div
            className="flex items-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-experienceText font-playpen whitespace-nowrap">
              <span className="mr-2 font-playpen text-accent">
                0{sectionOrder}.
              </span>
              Projects
            </h2>
            <div className="h-px ml-5 flex-1 max-w-[300px] bg-experienceText relative -top-[5px]" />
          </motion.div>
        )}

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        >
          {projects.slice(0, showCount).map((project, index) => (
            <motion.div
              key={project.id || `${project.title}-${index}`}
              className="bg-[#f7efec] border border-dark-accent/30 rounded shadow-sm transition hover:ring-2 hover:ring-dark-accent/30 hover:shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Image container */}
              <div className="p-[15px] rounded-t overflow-hidden">
                <div className="w-full aspect-video relative">
                  {project.imageUrl && (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover rounded"
                    />
                  )}
                </div>
              </div>

              {/* Text + buttons */}
              <div className="p-4 flex flex-col items-start gap-2">
                <h3 className="text-lg font-semibold text-light-textPrimary dark:text-dark-textPrimary">
                  {project.title}
                </h3>
                <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary italic">
                  {project.shortDescription}
                </p>
                <button
                  onClick={() => setSelected(project)}
                  className="text-sm text-accent font-medium hover:opacity-80 cursor-pointer transition"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Toggle Button */}
        {projects.length > 3 && (
          <motion.div
            className="mt-12 flex justify-center"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <button
              onClick={() =>
                setShowCount(showCount === 3 ? projects.length : 3)
              }
              className="px-6 py-2 border border-accent text-accent rounded hover:bg-accent/10 transition cursor-pointer"
            >
              {showCount === 3 ? "View More" : "Show Less"}
            </button>
          </motion.div>
        )}

        {/* Modal */}
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center px-4"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="bg-[#f7efec] rounded-lg p-6 max-w-4xl w-full shadow-xl relative flex flex-col md:flex-row gap-6"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="md:w-[45%] rounded">
                <div className="p-[5px]">
                  {selected.imageUrl && (
                    <img
                      src={selected.imageUrl}
                      alt={selected.title}
                      className="w-full h-auto object-cover rounded"
                    />
                  )}
                </div>
              </div>

              <div className="flex-1 text-light-textPrimary dark:text-dark-textPrimary">
                <h3 className="text-2xl font-semibold mb-4">{selected.title}</h3>
                <p className="mb-6 whitespace-pre-line text-light-textSecondary dark:text-dark-textSecondary">
                  {selected.description}
                </p>

                {selected.skills && (
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold mb-2 text-accent">
                      Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selected.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs px-3 py-1 rounded-full bg-dark-background-alt text-accent border border-accent/30"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selected.liveUrl?.trim() && (
                  <div className="mt-6">
                    <a
                      href={selected.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-accent text-accent hover:bg-accent/10 rounded transition cursor-pointer"
                    >
                      Live Preview
                    </a>
                  </div>
                )}

                <button
                  onClick={handleClose}
                  className="absolute top-3 right-4 text-xl text-accent hover:opacity-75 cursor-pointer"
                >
                  &times;
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
