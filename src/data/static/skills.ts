export interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools' | 'languages';
  icon?: string;
}

export const skills: Skill[] = [
  // Frontend
  { name: 'React', level: 90, category: 'frontend' },
  { name: 'TypeScript', level: 85, category: 'frontend' },
  { name: 'Tailwind CSS', level: 88, category: 'frontend' },
  { name: 'Next.js', level: 80, category: 'frontend' },
  { name: 'Angular', level: 75, category: 'frontend' },
  { name: 'Vue.js', level: 70, category: 'frontend' },
  
  // Backend
  { name: 'Node.js', level: 85, category: 'backend' },
  { name: 'Python', level: 80, category: 'backend' },
  { name: 'ASP.NET Core', level: 85, category: 'backend' },
  { name: 'FastAPI', level: 75, category: 'backend' },
  { name: 'PostgreSQL', level: 80, category: 'backend' },
  { name: 'MongoDB', level: 75, category: 'backend' },
  
  // Tools
  { name: 'Git', level: 90, category: 'tools' },
  { name: 'Docker', level: 80, category: 'tools' },
  { name: 'AWS', level: 75, category: 'tools' },
  { name: 'CI/CD', level: 80, category: 'tools' },
  { name: 'Kubernetes', level: 70, category: 'tools' },
  { name: 'Linux', level: 85, category: 'tools' },
  
  // Languages
  { name: 'JavaScript', level: 90, category: 'languages' },
  { name: 'TypeScript', level: 85, category: 'languages' },
  { name: 'Python', level: 80, category: 'languages' },
  { name: 'C#', level: 85, category: 'languages' },
  { name: 'Java', level: 70, category: 'languages' },
  { name: 'SQL', level: 85, category: 'languages' },
];