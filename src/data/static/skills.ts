export interface Skill {
  name: string;
  category: 'ai_ml' | 'multimodal_llm' | 'edge_ai' | 'fullstack' | 'devops_cloud';
  verified?: boolean;
}

export const skills: Skill[] = [
  // AI & Machine Learning
  { name: 'Machine Learning', category: 'ai_ml', verified: true },
  { name: 'Deep Learning', category: 'ai_ml' },
  { name: 'Computer Vision', category: 'ai_ml', verified: true },
  { name: 'PyTorch', category: 'ai_ml' },
  { name: 'TensorFlow', category: 'ai_ml' },
  { name: 'YOLO', category: 'ai_ml' },
  { name: 'OpenCV', category: 'ai_ml' },
  { name: 'TensorRT', category: 'ai_ml' },
  { name: 'ONNX Runtime', category: 'ai_ml' },
  { name: 'Scikit-learn', category: 'ai_ml' },
  { name: 'LangGraph', category: 'ai_ml' },

  // Multimodal / LLM
  { name: 'Qwen2-VL', category: 'multimodal_llm' },
  { name: 'LLaVA', category: 'multimodal_llm' },
  { name: 'CLIP', category: 'multimodal_llm' },
  { name: 'SAM', category: 'multimodal_llm' },
  { name: 'vLLM', category: 'multimodal_llm' },
  { name: 'Ollama', category: 'multimodal_llm' },
  { name: 'Agentic AI', category: 'multimodal_llm' },

  // Edge AI & Hardware
  { name: 'Jetson Orin Nano/NX', category: 'edge_ai' },
  { name: 'PROPHESEE Metavision SDK', category: 'edge_ai' },
  { name: 'Basler / HikVision Cameras', category: 'edge_ai' },
  { name: 'Raspberry Pi', category: 'edge_ai' },
  { name: 'PLC (Modbus TCP/RTU)', category: 'edge_ai' },

  // Full-Stack
  { name: 'Python', category: 'fullstack', verified: true },
  { name: 'FastAPI', category: 'fullstack' },
  { name: 'React', category: 'fullstack' },
  { name: 'TypeScript', category: 'fullstack', verified: true },
  { name: 'Angular', category: 'fullstack' },
  { name: 'C#', category: 'fullstack', verified: true },
  { name: '.NET 8', category: 'fullstack' },
  { name: 'MongoDB', category: 'fullstack' },
  { name: 'MSSQL', category: 'fullstack' },
  { name: 'Entity Framework', category: 'fullstack' },

  // DevOps / Cloud
  { name: 'Docker', category: 'devops_cloud' },
  { name: 'GitHub Actions CI/CD', category: 'devops_cloud' },
  { name: 'Kubernetes', category: 'devops_cloud' },
  { name: 'AWS', category: 'devops_cloud' },
  { name: 'Azure', category: 'devops_cloud' },
  { name: 'GCP', category: 'devops_cloud' },
];
