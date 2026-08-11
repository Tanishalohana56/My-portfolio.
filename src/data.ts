import { PortfolioData } from "./types";

export const portfolioData: PortfolioData = {
  name: "TANISHA",
  title: "Computer Science Undergraduate | Full-Stack development & Data Science",
  subtitle: "BS Computer Science Undergraduate | Building intelligent, user-focused digital solutions",
  aboutSummary: "Dedicated BS Computer Science undergraduate passionate about Artificial Intelligence, Machine Learning, Data Analysis, and Full-Stack Development. Driven to build innovative, user focused solutions and apply technology to solve real world challenges. Seeking opportunities to grow professionally while contributing to impactful and technology driven projects.",
  socials: {
    email: "tanulohana51@gmail.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    location: "Karachi, Pakistan",
  },
  education: [
    {
      institution: "DHA Suffa University, Karachi",
      degree: "BS Computer Science",
      field: "Computer Science",
      duration: "2023 – 2027",
      location: "Karachi, Pakistan",
    },
    {
      institution: "Government Girls Degree College Mithi",
      degree: "Pre-Medical",
      field: "Science",
      duration: "2020 – 2022",
      location: "Mithi, Pakistan",
    },
    {
      institution: "Al Mehran Higher Secondary School Mithi",
      degree: "Matriculation, Science",
      field: "Science",
      duration: "2020",
      location: "Mithi, Pakistan",
    }
  ],
  skillGroups: [
    {
      category: "Web Development",
      skills: [
        { name: "HTML", level: 95 },
        { name: "CSS", level: 90 },
        { name: "React.js", level: 88 },
        { name: "Node.js", level: 82 },
        { name: "Express.js", level: 80 },
        { name: "REST APIs", level: 85 },
        { name: "Tailwind CSS", level: 90 },
        { name: "Responsive Design", level: 92 },
        { name: "Bootstrap", level: 85 }
      ]
    },
    {
      category: "Programming Languages",
      skills: [
        { name: "C", level: 80 },
        { name: "C++", level: 82 },
        { name: "Java", level: 78 },
        { name: "JavaScript", level: 88 }
      ]
    },
    {
      category: "Data Science / Analytics",
      skills: [
        { name: "Python", level: 88 },
        { name: "Pandas", level: 85 },
        { name: "NumPy", level: 82 },
        { name: "Matplotlib", level: 80 },
        { name: "Seaborn", level: 80 },
        { name: "Scikit-learn", level: 78 },
        { name: "TensorFlow", level: 75 },
        { name: "Machine Learning", level: 82 },
        { name: "Power BI", level: 75 },
        { name: "Excel", level: 85 }
      ]
    },
    {
      category: "Tools Platforms",
      skills: [
        { name: "GitHub", level: 88 },
        { name: "VS Code", level: 90 },
        { name: "Vercel", level: 85 },
        { name: "Firebase", level: 78 },
        { name: "Supabase", level: 75 },
        { name: "Netlify", level: 82 },
        { name: "Lovable", level: 80 },
        { name: "Cursor", level: 85 },
        { name: "Google AI Studio", level: 85 },
        { name: "Google Antigravity", level: 82 },
        { name: "Docker", level: 72 }
      ]
    },
    {
      category: "Databases",
      skills: [
        { name: "SQL", level: 82 },
        { name: "MySQL", level: 80 },
        { name: "MongoDB", level: 78 },
        { name: "Firebase", level: 78 }
      ]
    }
  ],
  experience: [
    {
      company: "High Tech Software House",
      role: "Frontend Developer Intern",
      duration: "2025",
      location: "Karachi, Pakistan",
      points: [
        "Developed responsive and user-friendly web pages using HTML, CSS, and JavaScript",
        "Collaborated with the team to implement UI designs and improve website performance",
        "Debugged and optimized frontend code to ensure cross-browser compatibility"
      ],
      techUsed: ["HTML", "CSS", "JavaScript", "Bootstrap"]
    },
    {
      company: "Nftcipher",
      role: "Data analyst and AI developer",
      duration: "Oct 2025 – Feb 2026",
      location: "Karachi, Pakistan",
      points: [
        "Analyzed and processed data to generate insights and support decision-making",
        "Designed and implemented machine learning models for AI-based solutions",
        "Contributed to Frontend and Backend development for data-driven applications"
      ],
      techUsed: ["Python", "Machine Learning", "Data Analysis", "React.js"]
    }
  ],
  projects: [
    {
      id: "chat-network",
      title: "Chat Application & Network Log Monitoring",
      description: "Developed an interactive web-based network simulation and log monitoring tool to visualize Data Communication & Computer Networks concepts.",
      techUsed: ["React.js", "Tailwind CSS", "Computer Networks"],
      liveUrl: "https://chat-application-network-log-monito-pi.vercel.app/"
    },
    {
      id: "greenverse",
      title: "GreenVerse",
      description: "Developed a responsive web application promoting environmental awareness and sustainable living with a modern, user-friendly interface.",
      techUsed: ["React.js", "Tailwind CSS", "Motion"],
      liveUrl: "https://greenverse-j2k4.vercel.app/"
    }
  ],
  certifications: [
    {
      title: "Completed IBM Data Science course on Coursera",
      issuer: "IBM / Coursera",
      year: "2025"
    },
    {
      title: "Completed Aptech Web Development course",
      issuer: "Aptech",
      year: "2025"
    },
    {
      title: "Completed Code in Place by Stanford University",
      issuer: "Stanford University",
      year: "2026"
    }
  ]
};

