type TestimonialProps = {
    name: string;
    title: string;
    image: string;
    text: string;
    links: {
      label: string;
      url: string;
    }[];
  };
  
  const TestimonialCard = ({ name, title, image, text, links }: TestimonialProps) => {
    return (
      <div className="bg-white dark:bg-[#0a192f] rounded-lg shadow-md p-8 md:p-10 text-left">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Profile Image */}
          <img
            src={image}
            alt={name}
            className="w-20 h-20 rounded-full object-cover border-2 border-[#64ffda]"
          />
  
          {/* Details */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-[#111827] dark:text-[#ccd6f6]">{name}</h3>
            <p className="text-sm text-[#4b5563] dark:text-[#8892b0] mb-2">{title}</p>
            <p className="text-base leading-relaxed text-[#4b5563] dark:text-[#8892b0]">
              “{text}”
            </p>
  
            {/* Links */}
            <div className="mt-4 flex gap-4">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  className="text-sm text-[#64ffda] hover:opacity-80"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default TestimonialCard;
  