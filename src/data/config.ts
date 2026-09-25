export interface SiteConfig {
  site: {
    title: string;
    description: string;
    author: string;
    baseUrl: string;
  };
  theme: {
    colors: {
      background: string;
      surface: string;
      muted: string;
      primary: string;
      accent: string;
    };
    lightColors: {
      background: string;
      surface: string;
      muted: string;
      primary: string;
      accent: string;
    };
  };
  hero: {
    name: string;
    role: string;
    tagline: string;
    ctas: Array<{ label: string; href: string }>;
    profileImage: string;
  };
  projects: Array<{
    title: string;
    description: string;
    tech: string[];
    demo: string;
    repo: string;
    images: string[];
    details: string;
  }>;
  skills: {
    frontend: string[];
    backend: string[];
    tools: string[];
  };
  learning: {
    title: string;
    items: string[];
  };
  about: {
    summary1: string;
    summary2: string;
    roleLine: string;
  };
  blog: {
    enabled: boolean;
    posts: any[];
  };
  contact: {
    email: string;
    linkedin: string;
    github: string;
    resumeUrl: string;
  };
}

const config: SiteConfig = {
  site: {
    title: 'PORTFOLIO',
    description: 'GTA V Inspired Portfolio | Full-Stack Developer',
    author: 'Jaydeep Chaudhari',
    baseUrl: 'https://jaydeepchaudhari.dev',
  },

  theme: {
    colors: {
      background: '#0a0515',
      surface: '#1a0b2e',
      muted: '#9ca3af',
      primary: '#d97bb6', // GTA V pink
      accent: '#ffc8b4', // GTA V orange
    },
    lightColors: {
      background: '#f8fafc',
      surface: '#ffffff',
      muted: '#475569',
      primary: '#b06ab3',
      accent: '#ffa94d',
    },
  },

  hero: {
    name: 'Jaydeep Chaudhari',
    role: 'Full-Stack Developer',
    tagline:
      'Hi, I am Jaydeep Chaudhari, a passionate and dedicated Software Developer. I specialize in creating innovative solutions with expertise in front-end and back-end development. With hands-on experience in frameworks like Django and Spring Boot.',
    ctas: [],
    profileImage: '/profile_img.jpg',
  },

  projects: [
    {
      title: 'HRMS (Human Resource Management System)',
      description:
        'A full-stack HRMS application for employee and leave management built using Spring Boot and React.js.',
      tech: ['Spring Boot', 'React.js', 'MySQL', 'Bootstrap'],
      demo: '#',
      repo: 'https://github.com/jaydeep9881/HRMS',
      images: ['/hrms.png'],
      details:
        'Developed a secure backend with REST APIs and an interactive frontend dashboard for employee management. Integrated authentication and role-based access using Spring Security.',
    },
    {
      title: 'Personalized Diet Planner',
      description:
        'A web application that allows users to create custom diet plans, calculate BMI, and track daily nutrition with an intuitive user interface.',
      tech: ['Python', 'Django', 'JavaScript', 'HTML', 'CSS', 'Bootstrap', 'MySQL'],
      demo: '#',
      repo: 'https://github.com/jaydeep9881/diet-planner',
      images: ['/dietplanner.png'],
      details:
        'Developed a personalized diet planner with dynamic meal tracking, BMI calculation, and responsive design. Implemented Django for backend logic and MySQL for efficient data management, ensuring a smooth and secure user experience.',
    },
    {
      title: 'E-commerce Website',
      description:
        'An online shopping platform with secure authentication, product catalog, and admin management.',
      tech: ['Java', 'Spring Boot', 'MySQL', 'Spring Security', 'Bootstrap'],
      demo: '#',
      repo: 'https://github.com/jaydeep9881/ecommerce',
      images: ['/ecommerce.png'],
      details:
        'Implemented product search, cart, and payment integration with secure login. Used Spring Security for authentication and role management.',
    },
    {
      title: 'BookNest',
      description:
        'A full-featured online bookstore for browsing and purchasing books with a clean user interface.',
      tech: ['Django', 'REST API', 'PostgreSQL', 'Bootstrap'],
      demo: '#',
      repo: 'https://github.com/jaydeep9881/booknest',
      images: ['/booknest.png'],
      details:
        'Developed backend APIs and integrated PostgreSQL for efficient data handling. Focused on smooth navigation and secure transactions.',
    },
  ],

  skills: {
    frontend: ['React.js', 'HTML', 'CSS', 'Bootstrap', 'Tailwind CSS'],
    backend: ['Java', 'Spring Boot', 'Hibernate', 'Python', 'Django', 'MySQL', 'PostgreSQL'],
    tools: ['Git', 'GitHub', 'Postman', 'VS Code', 'Docker'],
  },

  learning: {
    title: 'Currently Learning',
    items: ['Machine Learning', 'Data Science', 'AI Agents', 'Web Design'],
  },

  about: {
    summary1:
      'I\'m a passionate backend developer focused on building scalable APIs and performant backend systems using Java and Spring Boot.',
    summary2:
      'Currently pursuing my M.Sc. in Computer Science from Savitribai Phule Pune University, I have hands-on experience with Spring Boot, React.js, and Django projects.',
    roleLine: 'Backend Developer | Java • Spring Boot • React.js',
  },

  blog: {
    enabled: false,
    posts: [],
  },

  contact: {
    email: 'jaydeepc9881@gmail.com',
    linkedin: 'https://www.linkedin.com/in/jaydeep-chaudhari-6b6ba2250/',
    github: 'https://github.com/jaydeep9881',
    resumeUrl: '/Jaydeep_Chaudhari_Resume.pdf',
  },
};

export default config;
