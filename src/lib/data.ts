// Sample data for portfolio sections

// Site-level configuration
export const siteConfig = {
  // Set your GitHub username to surface repos on the Works page
  githubUsername: "melihzafer",
  contactEmail: "mzhyusein@gmail.com",
  linkedinUrl: "https://linkedin.com/in/melihzafer/"
}

export const heroData = {
  name: "Melih Zafer Hyusein",
  tagline: "Software Developer — Web & Mobile",
  description: "I craft digital experiences that blend beautiful design with powerful functionality. Specializing in React, Next.js, and modern web technologies.",
  statusText: "Available for new projects",
  ctaPrimary: {
    text: "View My Work",
    href: "/works"
  },
  ctaSecondary: {
    text: "Get In Touch",
    href: "/contact"
  },
  socialLinks: [
  { icon: "Github", href: siteConfig.githubUsername ? `https://github.com/${siteConfig.githubUsername}` : "https://github.com", label: "GitHub Profile" },
  { icon: "Linkedin", href: siteConfig.linkedinUrl || "https://linkedin.com/in/melihzafer/", label: "LinkedIn Profile" },
    { icon: "Mail", href: `mailto:${siteConfig.contactEmail}` , label: "Email Contact" },
    { icon: "Instagram", href: "https://instagram.com/melihzafer_", label: "Instagram Profile" }
  ]
}

export const featuresData = [
  {
    icon: "Code2",
    title: "Frontend Development",
    description: "Building responsive, performant web applications with React, Next.js, and TypeScript."
  },
  {
    icon: "Palette",
    title: "UI/UX Design",
    description: "Creating intuitive user interfaces and experiences that users love to interact with."
  },
  {
    icon: "Server",
    title: "Backend Integration",
    description: "Developing robust APIs and integrating with various backend services and databases."
  },
  {
    icon: "Rocket",
    title: "Performance Optimization",
    description: "Ensuring fast load times and smooth user experiences across all devices."
  }
]

export const aboutData = {
  title: "About Me",
  description: "I'm a passionate full-stack developer with over 5 years of experience creating digital solutions that make a difference. I love working with modern technologies and always strive to write clean, maintainable code.",
  highlights: [
    "5+ years of professional experience",
    "50+ projects delivered successfully",
    "Expert in React & Next.js ecosystems",
    "Strong focus on accessibility & performance"
  ],
  skills: [
    { name: "C", level: 100 },
    { name: "C++", level: 95 },
    { name: "React", level: 95 },
    { name: "SQL", level: 93 },
    { name: "Next.js", level: 90 },
    { name: "C#", level: 90 },
    { name: "TypeScript", level: 88 },
    { name: "PHP", level: 88 },
    { name: "Node.js", level: 85 },
    { name: "Python", level: 80 },
    { name: "UI/UX Design", level: 75 }
  ],
  detailedSkills: [
    // Frontend
    { name: "React", level: 95, category: 'frontend' as const, icon: "⚛️", experience: "5+ years" },
    { name: "Next.js", level: 90, category: 'frontend' as const, icon: "🔺", experience: "3+ years" },
    { name: "TypeScript", level: 88, category: 'frontend' as const, icon: "📘", experience: "4+ years" },
    { name: "JavaScript", level: 92, category: 'frontend' as const, icon: "🟨", experience: "5+ years" },
    { name: "CSS/SCSS", level: 85, category: 'frontend' as const, icon: "🎨", experience: "5+ years" },
    { name: "Tailwind CSS", level: 90, category: 'frontend' as const, icon: "💨", experience: "3+ years" },
    
    // Backend
    { name: "C", level: 100, category: 'backend' as const, icon: "🔥", experience: "6+ years" },
    { name: "C++", level: 95, category: 'backend' as const, icon: "⚡", experience: "5+ years" },
    { name: "C#", level: 90, category: 'backend' as const, icon: "🟦", experience: "4+ years" },
    { name: "Node.js", level: 85, category: 'backend' as const, icon: "🟢", experience: "4+ years" },
    { name: "Python", level: 80, category: 'backend' as const, icon: "🐍", experience: "3+ years" },
    { name: "PHP", level: 88, category: 'backend' as const, icon: "🐘", experience: "4+ years" },
    { name: "SQL", level: 93, category: 'backend' as const, icon: "🗄️", experience: "5+ years" },
    { name: "PostgreSQL", level: 78, category: 'backend' as const, icon: "🐘", experience: "3+ years" },
    { name: "MongoDB", level: 75, category: 'backend' as const, icon: "🍃", experience: "2+ years" },
    { name: "Express.js", level: 82, category: 'backend' as const, icon: "🚀", experience: "3+ years" },
    
    // Mobile
    { name: "React Native", level: 80, category: 'mobile' as const, icon: "📱", experience: "2+ years" },
    { name: "Expo", level: 75, category: 'mobile' as const, icon: "🔧", experience: "2+ years" },
    
    // AI & ML
    { name: "OpenAI APIs", level: 85, category: 'ai' as const, icon: "🤖", experience: "1+ year" },
    { name: "LangChain", level: 70, category: 'ai' as const, icon: "🔗", experience: "1+ year" },
    
    // Tools & DevOps
    { name: "Git", level: 90, category: 'tools' as const, icon: "📚", experience: "5+ years" },
    { name: "Docker", level: 75, category: 'tools' as const, icon: "🐳", experience: "2+ years" },
    { name: "AWS", level: 70, category: 'tools' as const, icon: "☁️", experience: "2+ years" },
    { name: "Vercel", level: 85, category: 'tools' as const, icon: "⚡", experience: "3+ years" }
  ]
}

export const testimonialsData = [
  {
    content: "Melih delivered an exceptional website for Restaurant Deliorman that truly captured our essence. His professionalism and vision were so impressive that we've expanded our partnership to have him develop our complete brand webpage. He's an invaluable asset to our digital growth.",
    author: "Mert Adil",
    role: "General Manager",
    company: "Restaurant Deliorman",
    avatar: undefined as unknown as string
  },
  {
    content: "As a core collaborator at OMNI Tech Solutions, Melih's talent and dedication are foundational to our success. He consistently brings complex technical visions to life with precision and creativity, making him an absolutely fundamental part of our team.",
    author: "Deniz Memduev",
    role: "Founder/CEO",
    company: "OMNI Tech Solutions",
    avatar: undefined as unknown as string
  },
  {
    content: "Melih designed the logo for S&S Garage, and he absolutely captured the spirit of our brand. He has a sharp eye for design and instantly understood our vision, delivering a powerful and professional identity that perfectly represents us.",
    author: "Seid Seidov",
    role: "Founder",
    company: "S&S Garage",
    avatar: undefined as unknown as string
  }
]

export const experienceData = [
  {
    period: "2025 - Present",
    role: "Senior Full-Stack and Mobile Developer",
    company: "Freelance / OMNI Tech Solutions",
    description: "Leading development of complex web and mobile applications and mentoring computer science stundets"
  },
  {
    period: "2022 - 2025",
    role: "Frontend Developer",
    company: "Digital Agency Pro",
    description: "Specialized in React development and creating responsive user interfaces."
  },
  {
    period: "2018 - 2022",
    role: "Web Developer",
    company: "Freelance",
    description: "Worked with various clients to build custom websites and web applications."
  }
]

// Site-level configuration
// end site config
