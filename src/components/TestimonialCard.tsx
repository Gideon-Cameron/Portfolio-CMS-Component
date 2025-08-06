type TestimonialProps = {
  name: string;
  imageUrl: string;
  quote: string;
  projectLink?: string;
};

const TestimonialCard = ({ name, imageUrl, quote, projectLink }: TestimonialProps) => {
  return (
    <div className="bg-white dark:bg-dark-background rounded-lg shadow-md p-8 md:p-10 text-left">
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Profile Image */}
        <img
          src={imageUrl}
          alt={name}
          className="w-20 h-20 rounded-full object-cover border-2 border-dark-accent"
        />

        {/* Details */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-light-textPrimary dark:text-dark-textPrimary">
            {name}
          </h3>
          <p className="text-base leading-relaxed text-light-textSecondary dark:text-dark-textSecondary mt-2">
            “{quote}”
          </p>

          {projectLink && (
            <div className="mt-4">
              <a
                href={projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-dark-accent hover:opacity-80 underline"
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
