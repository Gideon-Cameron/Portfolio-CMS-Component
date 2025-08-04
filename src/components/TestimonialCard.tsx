type TestimonialProps = {
  name: string;
  imageUrl: string;
  quote: string;
  projectLink?: string;
};

const TestimonialCard = ({ name, imageUrl, quote, projectLink }: TestimonialProps) => {
  return (
    <div className="bg-white dark:bg-[#0a192f] rounded-lg shadow-md p-8 md:p-10 text-left">
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Profile Image */}
        <img
          src={imageUrl}
          alt={name}
          className="w-20 h-20 rounded-full object-cover border-2 border-[#64ffda]"
        />

        {/* Details */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-[#111827] dark:text-[#ccd6f6]">{name}</h3>
          <p className="text-base leading-relaxed text-[#4b5563] dark:text-[#8892b0] mt-2">
            “{quote}”
          </p>

          {projectLink && (
            <div className="mt-4">
              <a
                href={projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#64ffda] hover:opacity-80 underline"
              >
                View Project
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
