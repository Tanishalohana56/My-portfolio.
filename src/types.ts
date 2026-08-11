export interface SocialLinks {
  email: string;
  github: string;
  linkedin: string;
  location: string;
  phone?: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  duration: string;
  location: string;
  description?: string;
}

export interface SkillItem {
  name: string;
  level: number; // 0 - 100 for visual indicator
  iconName?: string;
}

export interface SkillGroup {
  category: string;
  skills: SkillItem[];
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  location?: string;
  points: string[];
  techUsed: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  highlights?: string[];
  demoType?: "chat-network" | "gpa-calculator" | "greenverse" | string;
  techUsed: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface Certification {
  title: string;
  issuer: string;
  year: string;
  credentialUrl?: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  subtitle: string;
  aboutSummary: string;
  socials: SocialLinks;
  education: Education[];
  skillGroups: SkillGroup[];
  experience: Experience[];
  projects: Project[];
  certifications: Certification[];
}
