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
    id: 0,
    title: 'AI Fullstack Engineer (Freelance)',
    company: 'Suntech Automation',
    location: 'Vietnam',
    startDate: '2025-12',
    endDate: '2026-03',
    type: 'ai',
    description: [
      'Architected and deployed end-to-end AI QA/QC system across 7+ production lines at a global agri-commodity processing facility, eliminating 100% manual inspection (sole developer)',
      'Optimized YOLO inference pipeline on Jetson Orin Nano/NX via TensorRT + ONNX, achieving 99%+ accuracy and 0.4% false positive rate at 70–180 products/minute',
      'Deployed 6 models in parallel across 3 Basler cameras per line on Jetson Orin Nano/NX, inspecting 30,000–50,000 products/line/day',
      'Built React + FastAPI operations dashboard with 6 modules: live camera feed, AI toggle, audit log, historical analytics, and LLM-powered agent for operator queries',
      'Delivered full system in 3 months, from model training to multi-line production rollout across 7+ lines',
      'LLM-powered agent enables operators to query production data and control AI modules via natural language (<5s response)'
    ],
    technologies: [
      'YOLO',
      'TensorRT',
      'ONNX Runtime',
      'Jetson Orin Nano/NX',
      'Basler Camera',
      'React',
      'FastAPI',
      'MongoDB',
      'Python',
      'LLM Agent'
    ],
    highlights: [
      '99%+ accuracy and 0.4% false positive rate at 70–180 products/minute',
      '100% manual QC inspection replaced across 7+ production lines',
      'Full system delivered solo in 3 months from training to rollout'
    ]
  },
  {
    id: 1,
    title: 'Research Assistant',
    company: 'Deep Learning & Media System Laboratory',
    location: 'National Central University, Taiwan',
    startDate: '2024-08',
    endDate: 'Present',
    type: 'research',
    description: [
      'Designed event-based eye gaze estimation and pupil segmentation systems from scratch using PROPHESEE EVS camera and Metavision SDK, implementing SNN architectures (PureSpikingGazeNet, SpikingEfficientGazeNet, SNNUltraLightMobileNet) with LIF neurons, surrogate gradient training, and custom loss functions',
      'Achieved substantial angular error reduction with real-time inference on Jetson edge hardware and GPU server',
      'Optimized AVSR data pipeline via parallelization, batch inference, and architecture improvements, achieving order-of-magnitude throughput improvement for large-scale audio-visual speech data processing',
      'Researching multi-camera scene understanding using multimodal VLM/LLM systems (Qwen2-VL, LLaVA, VILA) to enable natural language queries over continuous multi-camera footage',
      'Collected and processed hundreds of hours of EVS recordings — full pipeline from hardware setup to real-time inference deployment',
      'Fine-tuned a large language model on low-resource Hakka language (Sixian/Hailu dialects) via LoRA, achieving significant BLEU score improvements in both translation directions over zero-shot baseline'
    ],
    technologies: [
      'PyTorch',
      'SNNTorch',
      'Python',
      'PROPHESEE Metavision SDK',
      'EVS Cameras',
      'Qwen2-VL',
      'LLaVA',
      'VILA',
      'Jetson',
      'Computer Vision',
      'Deep Learning'
    ],
    highlights: [
      'Substantial angular error reduction in event-based eye gaze estimation',
      'Order-of-magnitude throughput improvement in AVSR data pipeline',
      'Researching multi-camera VLM/LLM scene understanding'
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
      'Developed 4 production Vision AI systems end-to-end (data collection → 50,000+ labeled images → training → deployment) in a team of 1–3 engineers',
      'Co-developed Safety AI CCTV and i-PPE 2 flagship products certified by a Fortune 500 FMCG manufacturer, deployed across 3+ factories, contributing to 100% revenue growth for the company',
      'Packaged i-PPE as a standalone ISO 45001-compliant hardware + software product, deployed to 2–3 factories',
      'Established Docker containerization and GitHub Actions CI/CD pipeline, reducing deployment errors across all projects',
      'Deployed models in real-world environments, integrating with IP cameras to predict data and display results on user interfaces',
      'Communicated with PLC systems for tasks such as alerts and automated robot stops',
      'Collaborated with the frontend team to map APIs and construct a violations management dashboard'
    ],
    technologies: [
      'YOLO',
      'TensorRT',
      'PyTorch',
      'Python',
      'Computer Vision',
      'Docker',
      'GitHub Actions CI/CD',
      'PLC Integration',
      'FastAPI',
      'React',
      'Jetson'
    ],
    highlights: [
      'Commercialized i-PPE as an ISO 45001-compliant hardware + software product',
      'Safety AI CCTV platform operating continuously for 2+ years in production',
      'Established CI/CD pipeline reducing deployment errors across all projects'
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
      'Built 10+ Angular modules and .NET 8 backend APIs for a manufacturing management system, collaborating within a cross-functional team of 15+ engineers',
      'Utilized Entity Framework to interact with MSSQL database, ensuring data performance and consistency',
      'Built and optimized stored procedures for 4–5M record datasets; co-deployed and maintained production services on Microsoft Azure',
      'Developed user interfaces using Angular, ensuring aesthetic appeal and good user experience',
      'Implemented data communication between frontend and backend through RESTful APIs',
      'Collaborated closely with the team to design and deploy new features, and address issues during development'
    ],
    technologies: [
      '.NET 8',
      'Entity Framework',
      'Azure',
      'Angular',
      'MSSQL',
      'C#',
      'TypeScript',
      'RESTful APIs'
    ],
    highlights: [
      'Built 10+ Angular modules in a cross-functional team of 15+ engineers',
      'Optimized stored procedures for 4–5M record datasets on Azure',
      'Co-deployed and maintained production services on Microsoft Azure'
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
      'Built full-stack features across 3 factory management projects — frontend (DevExtreme), backend (ASP.NET MVC), and database (MS SQL) in a team of 6–10 engineers',
      'Reduced purchase order query time by 90% on 1M+ records via index tuning and stored procedure refactoring',
      'Maintained 60+ stored procedures supporting 10,000–100,000 daily transactions',
      'Utilized C# to write efficient and scalable code, including the creation of stored procedures for data retrieval',
      'Worked on projects: Pleiger, Owlgardien, Higgs Korea SCM-MES (international collaboration)',
      'Continuously learned new technologies and implemented improvements to enhance system functionality'
    ],
    technologies: [
      'DevExtreme',
      'ASP.NET MVC',
      'MS SQL Server',
      'C#',
      'JavaScript',
      'HTML5',
      'CSS3',
      'Stored Procedures'
    ],
    highlights: [
      'Reduced purchase order query time by 90% on 1M+ records',
      'Maintained 60+ SPs supporting 10,000–100,000 daily transactions',
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
    degree: 'Master of Science (M.S.)',
    field: 'Computer Science',
    startDate: 'Aug 2024',
    endDate: 'Jun 2026',
    gpa: '93',
    gpaScale: '100',
    description: 'Deep Learning & Media System Laboratory — research in event-based computer vision, spiking neural networks, eye gaze tracking, and multimodal AI. Courses: NLP, AI for Security R&D, Data Science, Machine Learning. Expected graduation: June 2026.',
    images: [
      `${base}education/ncu/1.jpg`,
      `${base}education/ncu/2.jpg`,
      `${base}education/ncu/3.jpg`,
    ]
  },
  {
    id: 2,
    school: 'University of Technology & Education, Vietnam',
    degree: 'Bachelor of Engineering (B.Eng.)',
    field: 'Software Engineering',
    startDate: 'Aug 2019',
    endDate: 'Mar 2024',
    gpa: '3.1',
    gpaScale: '4.0',
    activities: 'Football Club, Enrollment and Career Guidance',
    description: 'Thesis: AI-powered Parking Management System (9.6/10). EUREKA Competition Semi-finalist. Strong foundation in software engineering, algorithms, databases, and computer networks.',
    images: [
      `${base}education/hcmute/1.jpg`,
      `${base}education/hcmute/2.jpg`,
      `${base}education/hcmute/3.jpg`,
    ]
  },
  {
    id: 3,
    school: 'FUNiX FPT, Vietnam',
    degree: 'Certification',
    field: 'Data Science',
    startDate: 'Sep 2022',
    endDate: 'Jun 2023',
    gpa: '3.4',
    gpaScale: '4.0',
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