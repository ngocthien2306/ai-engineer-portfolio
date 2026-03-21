export interface Project {
  id: number;
  title: string;
  subtitle: string;
  organization: string;
  status: 'Production' | 'Research' | 'Commercialized';
  startDate: string;
  endDate: string;
  stack: string[];
  highlights: string[];
  links?: {
    label: string;
    url: string;
  }[];
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'AI QA/QC + Management System',
    subtitle: 'End-to-end AI quality inspection across 7+ production lines',
    organization: 'Suntech Automation',
    status: 'Production',
    startDate: 'Dec 2025',
    endDate: 'Mar 2026',
    stack: ['YOLO', 'TensorRT', 'ONNX', 'Jetson Orin Nano/NX', 'Basler Camera', 'React', 'FastAPI', 'MongoDB'],
    highlights: [
      'Deployed 6 models in parallel across 3 Basler cameras/line on Jetson Orin Nano/NX, inspecting 30,000–50,000 products/line/day at 70-180 products/min',
      'Achieved 99%+ detection accuracy and 0.4% false positive rate via TensorRT FP16/INT8 optimization',
      'Built React + FastAPI operations dashboard with LLM-powered agent — operators query production data and control AI modules via natural language (<5s response)',
      'Replaced 100% manual QC inspection solo within 3 months, deployed across 7+ production lines'
    ]
  },
  {
    id: 2,
    title: 'Event-Based Eye Gaze Estimation',
    subtitle: 'Custom deep learning model for PROPHESEE EVS camera data',
    organization: 'NCU Deep Learning Lab',
    status: 'Research',
    startDate: '2024',
    endDate: '2025',
    stack: ['PyTorch', 'PROPHESEE Metavision SDK', 'Custom CNN Architecture', 'Jetson', 'GPU Server'],
    highlights: [
      'Designed custom deep learning model from scratch on PROPHESEE EVS camera data — no pretrained backbone, trained on self-collected dataset of 25+ subjects',
      'Reduced gaze angular error from 5-6° to 1-2.5° (~70% improvement) with real-time inference at <50ms on Jetson + GPU server',
      'Collected and processed hundreds of hours of EVS recordings — full pipeline from hardware setup to real-time inference deployment'
    ]
  },
  {
    id: 3,
    title: 'i-PPE — ISO 45001 PPE Compliance Detection',
    subtitle: 'Commercialized AI safety product for factory door/machine access control',
    organization: 'i-SOFT JSC',
    status: 'Commercialized',
    startDate: 'Nov 2023',
    endDate: 'Jun 2024',
    stack: ['YOLO', 'TensorRT', 'Jetson Edge Device', 'FastAPI', 'Python'],
    highlights: [
      'Built AI system enforcing ISO 45001 compliance — gate/machine access based on real-time PPE detection at entry points of hazardous zones',
      'Achieved 99% accuracy and <1% false positive rate at 30 FPS on Jetson — no cloud dependency, fully edge-native',
      'Packaged and commercialized as standalone hardware + software product across 7 camera clusters in 2–3 factories',
      'Auto-generates SHE/EHS compliance reports for factory management'
    ],
    links: [
      { label: 'Product Page', url: 'https://ippe.i-soft.com.vn' }
    ]
  },
  {
    id: 4,
    title: 'Safety AI CCTV — AI Workplace Safety Platform',
    subtitle: '8-module safety platform running 8+ AI models across 13 cameras',
    organization: 'i-SOFT JSC',
    status: 'Production',
    startDate: 'Sep 2023',
    endDate: 'Feb 2024',
    stack: ['YOLO', 'Pose Estimation', 'OCR', 'PyTorch', 'GPU Server', 'FastAPI', 'React', 'PLC'],
    highlights: [
      'Engineered 8-module safety platform running 8+ AI models in parallel across 13 cameras at 20–30 FPS — handrail compliance, zone intrusion, AGV proximity, smart lighting',
      'Reduced workplace safety violations by ~90% post-deployment with <3% false positive rate',
      'PLC-integrated for automated shutdown and buzzer alerts; platform has operated continuously for 2+ years',
      'Certified by factory for production deployment'
    ],
    links: [
      { label: 'Platform (EN)', url: 'https://sac.i-soft.com.vn' }
    ]
  }
];
