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
      'Architected and deployed an end-to-end AI QA/QC system across 7+ production lines at a global agri-commodity processing facility, eliminating 100% of manual inspection (sole developer)',
      'Optimized YOLO inference pipeline on Jetson Orin Nano/NX via TensorRT + ONNX, achieving 99%+ accuracy and 0.4% false positive rate at 70–180 products/minute',
      'Deployed 5 models in parallel across 3 Basler cameras per line on Jetson Orin Nano/NX, inspecting 30,000–50,000 products/line/day',
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
      'Designed event-based eye gaze estimation and pupil segmentation systems from scratch on event-camera (EVS) data, with no pretrained backbone',
      'Built custom Spiking Neural Network architectures on LIF neurons, with surrogate-gradient training and task-specific loss functions',
      'Delivered real-time inference for both tasks on Jetson edge hardware and GPU server',
      'Optimized a large-scale audio-visual speech data pipeline via parallelization, batch inference, and architecture improvements, which increased preprocessing throughput',
      'Researching multi-camera scene understanding with open-weights multimodal VLM/LLM systems to enable natural language queries over continuous multi-camera footage',
      'Owned the full research pipeline for event-based vision: capture rig setup, dataset collection and preprocessing, training, and deployment',
      'Deployed lab research services on Google Cloud Platform: containerized inference APIs and demo frontends with Docker, plus object storage for datasets and model checkpoints',
      'Fine-tuned a large language model with LoRA for a low-resource regional language pair. Translation quality beat the zero-shot baseline in both directions'
    ],
    technologies: [
      'PyTorch',
      'SNNTorch',
      'Python',
      'Event-Based Vision (EVS)',
      'Spiking Neural Networks',
      'Multimodal VLM / LLM',
      'LLM Fine-Tuning (LoRA)',
      'Jetson',
      'Google Cloud Platform',
      'Docker',
      'Computer Vision',
      'Deep Learning'
    ],
    highlights: [
      'Custom SNN architectures for event-based gaze estimation and pupil segmentation',
      'Real-time inference on Jetson edge hardware and GPU server',
      'Deployed containerized research services on GCP'
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
      'Built the entire software stack for i-PPE and co-developed Safety AI CCTV: 2 flagship products certified by a Fortune 500 FMCG manufacturer and deployed across 3+ factories',
      'Packaged i-PPE as a standalone hardware + software product supporting customers\' ISO 45001 programmes, deployed to 3 factories',
      'Set up Docker containerization and a GitHub Actions CI/CD pipeline, adopted by every project on the team',
      'Deployed models on-site, integrating with IP camera streams and surfacing detections in the violations management dashboard',
      'Integrated with PLC systems to trigger alerts and automated robot stops',
      'Worked with the frontend team to map APIs and build the violations management dashboard'
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
      'Sole software developer on i-PPE, commercialized as a hardware + software product',
      'Safety AI CCTV platform operating continuously for 2+ years in production',
      'Set up the Docker + CI/CD pipeline adopted across the team'
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
      'Used Entity Framework over MSSQL for data access',
      'Built and optimized stored procedures for 4–5M record datasets; co-deployed and maintained production services on Microsoft Azure',
      'Implemented data communication between frontend and backend through RESTful APIs'
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
      'Built full-stack features across 3 factory management projects: frontend (DevExtreme), backend (ASP.NET MVC), and database (MS SQL), in a team of 6–10 engineers',
      'Reduced purchase order query time by 90% on 1M+ records via index tuning and stored procedure refactoring',
      'Maintained 60+ stored procedures supporting 10,000–100,000 daily transactions',
      'Worked on projects: Pleiger, Owlgardien, Higgs Korea SCM-MES (international collaboration)'
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
    endDate: 'Jul 2026',
    gpa: '93',
    gpaScale: '100',
    description: 'Deep Learning & Media System Laboratory: research in event-based computer vision, spiking neural networks, eye gaze tracking, and multimodal AI. Courses: NLP, AI for Security R&D, Data Science, Machine Learning. Thesis defended and passed in July 2026; diploma pending.',
    images: [
      // Graduation 2026 — newest first
      `${base}education/ncu/grad-1.jpg`,
      `${base}education/ncu/grad-2.jpg`,
      `${base}education/ncu/grad-3.jpg`,
      `${base}education/ncu/grad-4.jpg`,
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
    description: 'Thesis: AI-powered Parking Management System (9.6/10). EUREKA Competition Semi-finalist. Coursework: software engineering, algorithms, databases, computer networks.'
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
    description: 'Data science program: machine learning, data analysis, Python, and statistical modeling.'
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