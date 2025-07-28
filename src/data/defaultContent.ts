export const heroContent = {
    intro: "Hi, my name is",
    name: "Gideon Cameron.",
    subtitle: "I build things for the web.",
    description: `I'm a frontend developer specializing in building (and occasionally designing) exceptional, responsive,
    high-performance digital experiences. Currently, I’m focused on building accessible, well designed and user friendly projects.`,
  };
  
  export const aboutContent = {
    title: "About Me",
    paragraphs: [
      "Hello! My name is Gideon and I enjoy creating things that live on the internet. My interest in web development started back in 2020 when I took my first online course — turns out styling and coding fit me like a glove, and I haven’t stopped since.",
      "Fast-forward to today, I’ve had the opportunity to work on freelance projects, collaborate with other developers, and bring ideas to life from scratch.",
      "My current focus is building accessible, responsive, and user-friendly digital experiences using tools like React, TypeScript, and Tailwind CSS.",
    ],
    imageUrl: "/assets/profile.jpg", // Replace with Firebase URL later
    imageAlt: "Gideon Cameron",
  };
  

  export const experienceContent = {
    sectionTitle: "Where I've Worked",
    experienceData: {
      Freelance: {
        title: "Frontend Developer",
        context: "Freelance / Self-employed",
        date: "2023 – Present",
        points: [
          "Built and deployed custom landing pages and portfolios using React and Tailwind.",
          "Worked directly with clients to translate design ideas into responsive web interfaces.",
          "Maintained accessibility and performance best practices in all projects.",
        ],
      },
      Collaborative: {
        title: "Collaborator",
        context: "Open Source / Teams",
        date: "2022 – 2023",
        points: [
          "Contributed to team-based projects with GitHub and version control.",
          "Worked on frontend logic, styling, and component structure.",
          "Participated in issue triage and feature planning in dev teams.",
        ],
      },
      Personal: {
        title: "Solo Developer",
        context: "Self-led Projects",
        date: "Ongoing",
        points: [
          "Built several full-stack applications to improve personal productivity.",
          "Explored advanced React patterns, performance optimization, and deployment pipelines.",
          "Designed and developed high-fidelity frontend UIs with React, TypeScript, and Tailwind CSS.",
          "Completed projects like Space Tourism and Weather App to demonstrate responsive layout, accessibility, and component-driven design.",
        ],
      },
    },
  };
  


  export const skillsContent = {
    sectionTitle: "Skills & Tools",
    skillGroups: {
      Frontend: [
        "HTML5",
        "CSS3",
        "JavaScript (ES6+)",
        "TypeScript",
        "React.js",
        "Tailwind CSS",
        "Responsive Design",
        "UI/UX Design",
      ],
      Backend: [
        "Node.js",
        "Express.js",
        "RESTful APIs",
        "JWT Authentication",
        "Jest (Testing)",
      ],
      "Version Control & Tools": ["Git", "GitHub", "VS Code"],
    },
  };

  
  

  import {
    SiHtml5,
    SiReact,
    SiTailwindcss,
    SiTypescript,
    SiMongodb,
    SiExpress,
    SiNodedotjs,
    SiJsonwebtokens,
    SiGithub,
  } from "react-icons/si";
//   import type { IconType } from "react-icons";
  
//   type StackItem = {
//     name: string;
//     icon: IconType; // <— Not JSX! Just the React component reference
//   };
  
  import spaceTourismImg from "../assets/space-tourism.png";
  import devDashImg from "../assets/dev-dash.png";
  import weatherAppImg from "../assets/weather-app.png";
  import fluentwaveImg from "../assets/fluentwave.png";
  import jobTrackerImg from "../assets/job-tracker.png";
  import calculatorImg from "../assets/calculator-app.png";
  
  export const projectsContent = {
    sectionTitle: "Some Things I’ve Built",
  
    projects: [
      {
        id: 1,
        name: "Space Tourism Website",
        image: spaceTourismImg,
        description: `
  A multi-page website simulating a futuristic space tourism brand.
  
  🚀 What it does: Provides destination info, crew bios, and vehicle pages using animated tab-based navigation and responsive layouts.
  
  🎯 Problem it solves: Mimics a real-world product site to demonstrate advanced UI fidelity and responsive design.
  
  🧩 My role: Sole developer — handled layout design, accessibility, React routing, and animation logic.
  
  💡 Technical highlights: Pixel-perfect Tailwind styling, accessible tab interfaces, mobile-first design with smooth transitions.`,
        github: "https://github.com/Gideon-Cameron/Space-Tourism",
        live: "https://space-tourism-main1.netlify.app/",
        stack: [
            { name: "HTML", icon: SiHtml5 },
            { name: "React", icon: SiReact },
            { name: "TailwindCSS", icon: SiTailwindcss },
          ]
      },
      {
        id: 2,
        name: "Dev Dash",
        image: devDashImg,
        description: `
  A customizable developer dashboard combining GitHub stats, quotes, and personal widgets.
  
  🚀 What it does: Displays user GitHub metrics, dynamic quotes, and remembers UI preferences between sessions.
  
  🎯 Problem it solves: Helps developers stay inspired and track progress in a unified, visually appealing tool.
  
  🧩 My role: Built every feature — from REST API integration and theming logic to UX layout and state management.
  
  💡 Technical highlights: GitHub REST API integration, global theming, persistence with localStorage, modular React components.`,
        github: "https://github.com/Gideon-Cameron/Dev-Dash",
        live: "https://dev-dash-gc.netlify.app/",
        stack: [
          { name: "React", icon: SiReact},
          { name: "TypeScript", icon: SiTypescript  },
          { name: "TailwindCSS", icon: SiTailwindcss },
          { name: "GitHub API", icon: SiGithub },
        ],
      },
      {
        id: 3,
        name: "React Weather App",
        image: weatherAppImg,
        description: `
  A real-time weather app using the OpenWeather API.
  
  🚀 What it does: Lets users search cities and view live weather data — temperature, humidity, wind speed, and more.
  
  🎯 Problem it solves: Offers instant access to weather with simple UI and fallback handling for edge cases.
  
  🧩 My role: Developed API integration, UI state transitions, loading/error handling, and responsive layout.
  
  💡 Technical highlights: OpenWeather API, responsive grid, dynamic icons, input validation.`,
        github: "https://github.com/Gideon-Cameron/React-Weather-App",
        live: "https://weather-app-xy.netlify.app/",
        stack: [
          { name: "React", icon: SiReact},
          { name: "TailwindCSS", icon: SiTailwindcss },
        ],
      },
      {
        id: 4,
        name: "Fluentwave Beta",
        image: fluentwaveImg,
        description: `
  A gamified language learning platform built as a full-stack web app.
  
  🚀 What it does: Lets users log in, take quizzes, earn XP, and track progress through a dynamic dashboard.
  
  🎯 Problem it solves: Makes language learning more engaging with gamified features and secure account management.
  
  🧩 My role: Full-stack developer — built backend, REST APIs, JWT auth, protected routes, and frontend UI/UX.
  
  💡 Technical highlights: MERN stack, JWT authentication, protected routes, real-time score tracking.`,
        github: "https://github.com/Gideon-Cameron/Fluentwave-beta",
        live: "https://fluentwave-beta.netlify.app/",
        stack: [
          { name: "MongoDB", icon: SiMongodb },
          { name: "Express", icon: SiExpress },
          { name: "React", icon: SiReact },
          { name: "Node.js", icon: SiNodedotjs },
          { name: "JWT", icon: SiJsonwebtokens },
        ],
      },
      {
        id: 5,
        name: "Job Tracker",
        image: jobTrackerImg,
        description: `
  A drag-and-drop Kanban board for managing job applications.
  
  🚀 What it does: Lets users move job cards between stages like 'Applied', 'Interviewing', and 'Offer'.
  
  🎯 Problem it solves: Keeps job seekers visually organized with persistent drag-and-drop state.
  
  🧩 My role: Implemented full UI logic, styled interaction feedback, and component state reuse.
  
  💡 Technical highlights: Drag-and-drop interaction, React component structure, localStorage persistence.`,
        github: "https://github.com/Gideon-Cameron/Job-Tracker",
        live: "https://job-trackerz.netlify.app/",
        stack: [
          { name: "React", icon: SiReact },
          { name: "TypeScript", icon: SiTypescript },
          { name: "TailwindCSS", icon: SiTailwindcss },
        ],
      },
      {
        id: 6,
        name: "Calculator App",
        image: calculatorImg,
        description: `
  A clean, responsive calculator with keyboard input and theming.
  
  🚀 What it does: Offers full arithmetic calculations with light/dark theming and keyboard shortcuts.
  
  🎯 Problem it solves: Demonstrates thoughtful UI design and precise logic control.
  
  🧩 My role: Built layout, key binding logic, display formatting, and mobile responsiveness.
  
  💡 Technical highlights: Keyboard event handling, conditional theming, separation of UI/logic.`,
        github: "https://github.com/Gideon-Cameron/Calculator-app",
        live: "https://calculator-app-xl.netlify.app/",
        stack: [
          { name: "React", icon: SiReact},
          { name: "TypeScript", icon: SiTypescript },
          { name: "TailwindCSS", icon: SiTailwindcss },
        ],
      },
    ],
  
    oneLiners: {
      1: "A slick multi-page website mimicking a luxury space travel company.",
      2: "Your all-in-one productivity dashboard tailored for developers.",
      3: "Check the weather anywhere with real-time updates and dynamic visuals.",
      4: "Gamified language learning powered by full-stack tech.",
      5: "Organize your job hunt with an intuitive Kanban board system.",
      6: "A clean, responsive calculator with keyboard support and theming.",
    },
  };
  

  import arielImg from "../assets/ariel.jpg";

export const testimonialsContent = {
  sectionTitle: "Testimonials",
  testimonials: [
    {
      name: "Ariel Candace",
      title: "Marketing Strategist · Former Client",
      image: arielImg,
      text:
        "Working with Gideon was a great experience from start to finish. I hired him to redesign and build a responsive personal portfolio website, and he delivered exactly what I needed — clean code, smooth animations, and a modern, user-friendly design. He was communicative throughout the process, took feedback seriously, and often went above and beyond to ensure perfection. I’d highly recommend him to anyone looking for a reliable and skilled frontend developer.",
      links: [
        {
          label: "View on LinkedIn",
          url: "https://www.linkedin.com/in/ariel-candace-646494272/",
        },
        {
          label: "View Project",
          url: "https://ariel-portfolio-ac.netlify.app/",
        },
      ],
    },
  ],
};
