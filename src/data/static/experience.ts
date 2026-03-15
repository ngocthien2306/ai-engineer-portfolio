// src/data/static/experience.ts
export interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | 'Present';
  description: string[];
  technologies: string[];
  type: 'research' | 'ai' | 'fullstack' | 'software';
  highlights?: string[];
}

export const experiences: Experience[] = [
  {
    id: 1,
    title: 'Research Assistant',
    company: 'Deep Learning & Media System Laboratory',
    location: 'National Central University, Taiwan',
    startDate: '2024-08',
    endDate: 'Present',
    type: 'research',
    description: [
      'Led multiple AI research projects using event-based camera technology',
      'Designed and implemented data collection pipelines for specialized datasets',
      'Developed deep learning models for eye gaze tracking with EVS cameras',
      'Created algorithms for fingertip detection and human movement analysis',
      'Built audio-to-3D animation conversion systems',
      'Implemented fall detection systems with high accuracy rates',
      'Optimized model performance for real-time applications',
      'Documented research findings and prepared technical reports',
      'Collaborated with cross-functional teams to integrate solutions'
    ],
    technologies: [
      'TensorFlow',
      'PyTorch',
      'Keras',
      'Python',
      'Computer Vision',
      'Event-based Cameras',
      'Deep Learning',
      'Real-time Processing',
      'PROPHESEE Metavision®',
      'EVS Cameras'
    ],
    highlights: [
      'Leading cutting-edge research in event-based computer vision',
      'Developing novel eye gaze tracking algorithms',
      'Publishing research findings in academic conferences'
    ]
  },
  {
    id: 2,
    title: 'AI Fullstack Engineer',
    company: 'i-SOFT JSC',
    location: 'Vietnam',
    startDate: '2023-08',
    endDate: '2024-08',
    type: 'ai',
    description: [
      'Analyzed and proposed solutions for specific challenges at the factory, from planning data collection to deploying AI models',
      'Planned and executed the data collection process, including labeling, augmentation, and noise reduction, to optimize data quality',
      'Selected and deployed suitable deep learning models, while evaluating results and planning model improvements as needed',
      'Deployed models in real-world environments, integrating with IP cameras to predict data and display results on user interfaces',
      'Communicated with PLC systems for tasks such as alerts and robot stops',
      'Implemented Docker containers for application deployment, ensuring consistency across development and production environments',
      'Set up CI/CD pipelines for automated testing and deployment, improving development workflow and reducing deployment errors',
      'Collaborated with the Frontend team to map APIs and construct a website managing violations',
      'Contributed to significant projects such as Oral Line 2, PPE detection systems',
      'Ensured system stability and performance through rigorous testing and source code optimization'
    ],
    technologies: [
      'TensorFlow',
      'PyTorch',
      'Python',
      'Computer Vision',
      'Docker',
      'CI/CD',
      'PLC Integration',
      'IP Cameras',
      'FastAPI',
      'React',
      'Deep Learning',
      'MLOps'
    ],
    highlights: [
      'Achieved a globally recognized certification, officially confirmed by Unilever',
      'Successfully deployed AI models in production factory environments',
      'Reduced manufacturing defects through automated quality control systems'
    ]
  },
  {
    id: 3,
    title: 'Fullstack Developer',
    company: 'New Ocean IS',
    location: 'Vietnam',
    startDate: '2023-02',
    endDate: '2023-08',
    type: 'fullstack',
    description: [
      'Design and implement APIs using design patterns in ASP.NET API to support the manufacturing process',
      'Utilize Entity Framework to interact with the MSSQL database, ensuring data performance and consistency',
      'Build and optimize stored procedures to execute complex queries and handle business logic on the database',
      'Develop user interfaces for screens using Angular, ensuring aesthetic appeal and a good user experience',
      'Implement data communication between the frontend and backend through APIs to ensure efficient data transfer',
      'Use Azure for deploying and maintaining services related to the application, ensuring system availability and security',
      'Collaborate closely with the team to design and deploy new features, and address issues arising during development'
    ],
    technologies: [
      '.NET 8.0 API',
      'Entity Framework',
      'Azure',
      'Angular',
      'Tailwind CSS',
      'Ant Design',
      'MSSQL',
      'C#',
      'TypeScript',
      'RESTful APIs'
    ],
    highlights: [
      'Successfully modernized legacy manufacturing systems',
      'Improved system performance and user experience',
      'Implemented scalable cloud-based solutions'
    ]
  },
  {
    id: 4,
    title: 'Software Engineer',
    company: 'THLONE Company',
    location: 'Vietnam',
    startDate: '2021-12',
    endDate: '2023-02',
    type: 'software',
    description: [
      'Worked on projects: Pleiger, Owlgardien, Higgs Korea SCM-MES',
      'Developed a user interface using the DevExtreme library and implemented the backend with ASP.NET MVC and MS SQL for factory production process management project',
      'Collaborated with a team of developers to design and implement features, debug and resolve software issues, ensuring stable and reliable operation',
      'Utilized the C# programming language to write efficient and scalable code, including the creation of Store Procedures for data retrieval',
      'Contributed to project documentation and training materials to ensure user-friendly implementation and effective utilization',
      'Continuously stayed abreast of new technologies and implemented improvements to enhance system functionality'
    ],
    technologies: [
      'DevExtreme',
      'ASP.NET MVC',
      'MS SQL Server',
      'C#',
      'EmguCV',
      'JavaScript',
      'HTML5',
      'CSS3',
      'Stored Procedures'
    ],
    highlights: [
      'Successfully delivered multiple enterprise-level manufacturing systems',
      'Implemented computer vision features using EmguCV',
      'Contributed to international projects (Korea SCM-MES)'
    ]
  }
];

export interface Education {
  id: number;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
  gpaScale: string;
  activities?: string;
  description?: string;
  images?: string[];
}

const base = import.meta.env.BASE_URL || './';

export const educations: Education[] = [
  {
    id: 1,
    school: 'National Central University',
    degree: 'Master of Science (MS)',
    field: 'Computer Science and Information Engineering',
    startDate: 'Aug 2024',
    endDate: 'Aug 2026',
    gpa: '93',
    gpaScale: '100',
    description: 'Deep Learning & Media System Laboratory — research in event-based computer vision, eye gaze tracking, and real-time AI systems.',
    images: [
      `${base}education/ncu/1.jpg`,
      `${base}education/ncu/2.jpg`,
      `${base}education/ncu/3.jpg`,
    ]
  },
  {
    id: 2,
    school: 'HCMC University of Technology and Engineering',
    degree: 'Bachelor of Science (BS)',
    field: 'Information Technology',
    startDate: 'Aug 2019',
    endDate: 'Apr 2024',
    gpa: '7.77',
    gpaScale: '10',
    activities: 'Football Club, Enrollment and Career Guidance',
    description: 'Strong foundation in software engineering, algorithms, databases, and computer networks.',
    images: [
      `${base}education/hcmute/1.jpg`,
      `${base}education/hcmute/2.jpg`,
      `${base}education/hcmute/3.jpg`,
    ]
  },
  {
    id: 3,
    school: 'FPT University (FUNiX)',
    degree: 'Certification',
    field: 'Data Science',
    startDate: 'Oct 2022',
    endDate: 'Apr 2023',
    gpa: '8.5',
    gpaScale: '10',
    description: 'Intensive data science program covering machine learning, data analysis, Python, and statistical modeling.',
    images: [
      `${base}education/fpt/1.jpg`,
      `${base}education/fpt/2.jpg`,
    ]
  }
];

// Additional certifications and achievements
export const certifications = [
  {
    name: 'TOEIC 500+',
    issuer: 'ETS',
    date: '2024-06',
    credentialId: null,
    verifyUrl: null
  },
  {
    name: 'CEFR B2 - EnglishScore Core Skills',
    issuer: 'British Council',
    date: '2023-11',
    credentialId: '3fb06da3',
    verifyUrl: 'https://api2.englishscore.com/verify/3fb06da3'
  },
  {
    name: 'Certified Data Scientist',
    issuer: 'FUNiX',
    date: '2023-06',
    credentialId: 'FUN230139',
    verifyUrl: 'https://drive.google.com/file/d/12cZa6XGPeKKp_hm9JWgPrLy0uZZGTttD/view?usp=sharing'
  },
  {
    name: 'Deep Learning Specialization',
    issuer: 'DeepLearning.AI on Coursera',
    date: '2023-03',
    credentialId: 'M78AK4DD8WT9',
    verifyUrl: 'https://www.coursera.org/account/accomplishments/specialization/certificate/M78AK4DD8WT9'
  },
  {
    name: 'Sequence Models in Deep Learning',
    issuer: 'Coursera',
    date: '2023-03',
    credentialId: 'JKV7ETVTBX8Z',
    verifyUrl: 'https://www.coursera.org/account/accomplishments/verify/JKV7ETVTBX8Z'
  },
  {
    name: 'Neural Networks and Deep Learning',
    issuer: 'Coursera',
    date: '2023-02',
    credentialId: 'RSRKAW2Z4EX3',
    verifyUrl: 'https://www.coursera.org/account/accomplishments/verify/RSRKAW2Z4EX3'
  },
  {
    name: 'Convolutional Neural Networks in Deep Learning',
    issuer: 'Coursera',
    date: '2023-02',
    credentialId: 'UN3KV7W659ME',
    verifyUrl: 'https://coursera.org/verify/UN3KV7W659ME'
  },
  {
    name: 'Big Data Machine Learning Fundamentals',
    issuer: 'Cloud Ace Google Cloud',
    date: '2023-02',
    credentialId: null,
    verifyUrl: null
  },
  {
    name: 'Google Cloud Fundamentals: Core Infrastructure',
    issuer: 'Cloud Ace Google Cloud',
    date: '2022-12',
    credentialId: null,
    verifyUrl: null
  }
];