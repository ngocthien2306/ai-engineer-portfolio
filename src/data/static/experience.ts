export interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | 'Present';
  description: string[];
  technologies: string[];
}

export const experiences: Experience[] = [
  {
    id: 1,
    title: 'Senior Full Stack Developer',
    company: 'Tech Solutions Inc.',
    location: 'San Francisco, CA',
    startDate: '2022-01',
    endDate: 'Present',
    description: [
      'Led development of microservices architecture using Node.js and Kubernetes',
      'Implemented CI/CD pipelines reducing deployment time by 60%',
      'Mentored junior developers and conducted code reviews',
      'Designed and developed RESTful APIs serving 1M+ requests daily',
    ],
    technologies: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'PostgreSQL'],
  },
  {
    id: 2,
    title: 'Full Stack Developer',
    company: 'Digital Innovations',
    location: 'New York, NY',
    startDate: '2020-06',
    endDate: '2021-12',
    description: [
      'Developed responsive web applications using React and Redux',
      'Built RESTful APIs with Express.js and MongoDB',
      'Implemented real-time features using WebSockets',
      'Optimized application performance improving load times by 40%',
    ],
    technologies: ['React', 'Redux', 'Node.js', 'MongoDB', 'Socket.io', 'AWS'],
  },
];