export interface Skill {
  name: string;
  category: 'ai_ml' | 'programming' | 'web_development' | 'tools_frameworks';
  verified?: boolean;
}

export const skills: Skill[] = [
  // AI & Machine Learning
  { name: 'Machine Learning', category: 'ai_ml', verified: true },
  { name: 'Deep Learning', category: 'ai_ml' },
  { name: 'Computer Vision', category: 'ai_ml' },
  { name: 'TensorFlow', category: 'ai_ml' },
  { name: 'PyTorch', category: 'ai_ml' },
  { name: 'Keras', category: 'ai_ml' },
  { name: 'OpenCV', category: 'ai_ml' },
  { name: 'Scikit-Learn', category: 'ai_ml' },
  { name: 'Convolutional Neural Networks (CNN)', category: 'ai_ml' },
  { name: 'Natural Language Processing (NLP)', category: 'ai_ml' },
  { name: 'Spiking Neural Network', category: 'ai_ml' },
  { name: 'Pattern Recognition', category: 'ai_ml' },
  { name: 'Image Processing', category: 'ai_ml' },
  { name: 'Predictive Modeling', category: 'ai_ml' },
  { name: 'Data Science', category: 'ai_ml' },
  { name: 'Data Analytics', category: 'ai_ml' },
  { name: 'Data Visualization', category: 'ai_ml' },
  { name: 'Data Engineering', category: 'ai_ml' },
  
  // Programming Languages
  { name: 'Python', category: 'programming' },
  { name: 'C#', category: 'programming', verified: true },
  { name: 'JavaScript', category: 'programming', verified: true },
  { name: 'C++', category: 'programming', verified: true },
  { name: 'SQL', category: 'programming' },
  
  // Web Development
  { name: 'ASP.NET MVC', category: 'web_development' },
  { name: 'ASP.NET', category: 'web_development' },
  { name: '.NET Framework', category: 'web_development', verified: true },
  { name: 'Angular', category: 'web_development' },
  { name: 'Angular Material', category: 'web_development' },
  { name: 'jQuery', category: 'web_development', verified: true },
  { name: 'Model-View-Controller (MVC)', category: 'web_development' },
  
  // Tools & Frameworks
  { name: 'DevExpress', category: 'tools_frameworks' },
  { name: 'Unity', category: 'tools_frameworks' },
  { name: 'Pandas', category: 'tools_frameworks' },
  { name: 'NumPy', category: 'tools_frameworks' },
  { name: '3D Modeling', category: 'tools_frameworks' },
  { name: '3D Animation', category: 'tools_frameworks' },
  { name: 'Data Management', category: 'tools_frameworks' },
  { name: 'Object-Oriented Programming (OOP)', category: 'tools_frameworks', verified: true },
  { name: 'Algorithms', category: 'tools_frameworks' },
  { name: 'Statistics', category: 'tools_frameworks' },
  { name: 'Mathematics', category: 'tools_frameworks' },
  { name: 'Problem Solving', category: 'tools_frameworks' },
];