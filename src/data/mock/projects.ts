export interface VideoItem {
  embedUrl: string;
  type: 'youtube' | 'facebook' | 'gdrive';
  title: string;
}

export interface Project {
  id: number;
  title: string;
  subtitle: string;
  organization: string;
  status: 'Production' | 'Research' | 'Commercialized' | 'Personal';
  startDate: string;
  endDate: string;
  stack: string[];
  highlights: string[];
  links?: {
    label: string;
    url: string;
  }[];
  videos?: VideoItem[];
}

export const projects: Project[] = [
  // ── Top 4 CV Projects ──────────────────────────────────────────────────────
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
      'Deployed 6 models in parallel across 3 Basler cameras/line on Jetson Orin Nano/NX, inspecting 30,000–50,000 products/line/day at 70–180 products/min',
      'Achieved 99%+ detection accuracy and 0.4% false positive rate via TensorRT FP16/INT8 optimization',
      'Built React + FastAPI operations dashboard with LLM-powered agent — operators query production data and control AI modules via natural language (<5s response)',
      'Replaced 100% manual QC inspection solo within 3 months, deployed across 7+ production lines'
    ]
  },
  {
    id: 2,
    title: 'Event-Based Eye Gaze Estimation & Pupil Segmentation with SNNs',
    subtitle: 'Spiking Neural Network architectures for PROPHESEE EVS camera data',
    organization: 'NCU Deep Learning Lab',
    status: 'Research',
    startDate: '2024',
    endDate: '2025',
    stack: ['PyTorch', 'SNNTorch', 'PROPHESEE Metavision SDK', 'OpenCV', 'Jetson', 'GPU Server'],
    highlights: [
      'Designed three SNN architectures from scratch — PureSpikingGazeNet, SpikingEfficientGazeNet (gaze regression), and SNNUltraLightMobileNet (pupil segmentation) — built on Leaky Integrate-and-Fire (LIF) neurons with surrogate gradient (fast sigmoid) training',
      'Implemented rate, latency, and temporal spike encoding strategies; custom combined loss functions for both tasks: Euclidean + angular loss for gaze regression, and Weighted CE + Dice + Focal loss for pupil segmentation',
      'Collected and processed hundreds of hours of EVS recordings from 25+ subjects — full pipeline from PROPHESEE hardware setup to real-time inference deployment on GPU server and Jetson edge hardware',
      'Achieved substantial error reduction with real-time inference across both tasks vs. baseline'
    ],
    videos: [
      { embedUrl: 'https://drive.google.com/file/d/1XsxSc0_fXKirsG994k08lBxj_kqYKDUi/preview', type: 'gdrive', title: 'Eye Gaze Demo 1' },
      { embedUrl: 'https://drive.google.com/file/d/1bNwilr4LmGBT5CWpPjM6GpBmWft-LiVX/preview', type: 'gdrive', title: 'Eye Gaze Demo 2' }
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
    ],
    videos: [
      { embedUrl: 'https://www.youtube.com/embed/h9SG3g7DQt4?start=4&autoplay=1', type: 'youtube', title: 'i-PPE Product Demo' }
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
    ],
    videos: [
      { embedUrl: 'https://www.youtube.com/embed/BeA65X_Bj84', type: 'youtube', title: 'Demo 1' },
      { embedUrl: 'https://www.youtube.com/embed/syNw548Czgs', type: 'youtube', title: 'Demo 2' },
      { embedUrl: 'https://www.youtube.com/embed/1AeSrHn4_bQ', type: 'youtube', title: 'Demo 3' },
      { embedUrl: 'https://www.youtube.com/embed/dJ771qxSohM', type: 'youtube', title: 'Demo 4' },
      { embedUrl: 'https://www.youtube.com/embed/JisG9nGxftE', type: 'youtube', title: 'Demo 5' },
      { embedUrl: 'https://www.youtube.com/embed/ruHM1q_-Nv0', type: 'youtube', title: 'Demo 6' },
      { embedUrl: 'https://www.youtube.com/embed/P9HAf5GFZK8', type: 'youtube', title: 'Demo 7' }
    ]
  },
  // ── Additional Projects ────────────────────────────────────────────────────
  {
    id: 5,
    title: 'Fall Detection & Object Tracking with Radar',
    subtitle: 'EVS camera + radar fusion for real-time fall detection and object tracking',
    organization: 'NCU Deep Learning Lab',
    status: 'Research',
    startDate: '2024',
    endDate: '2025',
    stack: ['PROPHESEE Metavision SDK', 'EVS Camera', 'Radar Sensor', 'PyTorch', 'Jetson', 'GPU Server'],
    highlights: [
      'Designed fall detection and multi-object tracking system using PROPHESEE event-based camera fused with radar sensor data',
      'Achieved low false positive rate in real-time detection on Jetson edge device',
      'Leveraged EVS camera\'s microsecond temporal resolution for high-speed motion capture without motion blur',
      'Full pipeline from EVS data preprocessing via Metavision SDK to real-time inference deployment'
    ],
    videos: [
      { embedUrl: 'https://drive.google.com/file/d/1WpBoKFJoz6AbCE4UUD7dUszqyzAwn7Cg/preview', type: 'gdrive', title: 'Fall Detection & Tracking Demo' }
    ]
  },
  {
    id: 6,
    title: 'Agent VLM — AI-Powered Video Intelligence',
    subtitle: 'Natural language search across continuous multi-camera footage using CLIP + SAM3 hybrid pipeline',
    organization: 'NCU Deep Learning Lab',
    status: 'Research',
    startDate: '2024',
    endDate: '2025',
    stack: ['CLIP (ViT-B-32)', 'SAM3', 'Qdrant', 'FastAPI', 'React', 'PyTorch', 'Ollama', 'Claude API', 'Docker', 'AWS S3'],
    highlights: [
      'Two-stage hybrid search: CLIP embeddings for fast semantic retrieval + SAM3 for precise object detection & bounding box verification',
      'Natural language queries in Vietnamese & English — searches large frame archives across continuous multi-camera footage',
      'Real-time result streaming via WebSocket + SSE; supports both Ollama (local LLM) and Claude API for query parsing',
      'Full-stack: FastAPI backend, React dashboard, Qdrant vector DB, AWS S3 cloud storage — containerized with CUDA-optimized Docker'
    ],
    videos: [
      { embedUrl: 'https://drive.google.com/file/d/1yT1rOYZOmHMEe8-J4r_ZnzBXRxfyoxH7/preview', type: 'gdrive', title: 'Agent VLM Demo' }
    ]
  },
  {
    id: 7,
    title: 'GraphGuard — Graph-Based Fraud Detection',
    subtitle: 'GNN system for transaction fraud & anomaly detection with continual learning',
    organization: 'NCU — AI for Security R&D',
    status: 'Research',
    startDate: '2025',
    endDate: '2025',
    stack: ['Python', 'PyTorch', 'RGTAN', 'Graph Neural Network', 'EWC', 'Feature Engineering'],
    highlights: [
      'Implemented RGTAN (Relational Graph Temporal Attention Network) for transaction fraud detection on financial graph data',
      'Extended with EWC (Elastic Weight Consolidation) for continual learning — prevents catastrophic forgetting across evolving fraud patterns',
      'Built end-to-end pipeline: feature engineering, graph construction, model training, and automated report generation',
      'Applied in coursework for NCU AI for Security R&D — covers real-world financial fraud detection scenarios'
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/ngocthien2306/GraphGuard' }
    ]
  },
  {
    id: 8,
    title: 'Task Agent — AI Scheduling with 3D Avatar',
    subtitle: 'Natural language task scheduling, reminders, and 3D avatar AI agent',
    organization: 'Personal Project',
    status: 'Personal',
    startDate: '2025',
    endDate: '2025',
    stack: ['Node.js', 'React', 'React Native', 'LLM', '3D Avatar', 'Docker', 'REST API'],
    highlights: [
      'Built a cross-platform AI agent (web + mobile) that creates tasks, sets reminders, and manages schedules via natural language input',
      'Integrated 3D avatar as the interactive AI interface — responds and communicates task updates visually',
      'Full-stack architecture: Node.js backend, React web frontend, React Native mobile app, all containerized with Docker',
      'Designed for real-world daily productivity use with NLP-driven intent parsing'
    ],
    links: [
      { label: 'Backend', url: 'https://github.com/ngocthien2306/task-agent-backend' },
      { label: 'Frontend', url: 'https://github.com/ngocthien2306/task-agent-frontend' },
      { label: 'Mobile', url: 'https://github.com/ngocthien2306/task-agent-native' }
    ]
  },
  {
    id: 9,
    title: 'Android PPE Detection — Mobile Edge AI',
    subtitle: 'Real-time PPE compliance detection on Android using YOLO + C++ NDK',
    organization: 'Personal Project',
    status: 'Personal',
    startDate: '2024',
    endDate: '2024',
    stack: ['YOLO', 'C++ NDK', 'Android', 'OpenCV', 'TFLite / ONNX'],
    highlights: [
      'Ported YOLO object detection to Android using C++ NDK for native inference performance',
      'Detects PPE compliance (helmet, vest, gloves) in real time directly on mobile device — no server required',
      'Optimized for mobile hardware constraints: low latency inference with minimal memory footprint',
      'Extends i-PPE concept to mobile deployment, enabling portable safety inspection on the factory floor'
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/ngocthien2306/android-yolo' }
    ]
  },
  {
    id: 10,
    title: 'RAG Pipeline — Retrieval-Augmented Generation',
    subtitle: 'Modular RAG system with embedding, retrieval, and LLM integration',
    organization: 'Personal Project',
    status: 'Personal',
    startDate: '2024',
    endDate: '2025',
    stack: ['Python', 'LangChain / LangGraph', 'Vector DB', 'Embeddings', 'LLM', 'FastAPI'],
    highlights: [
      'Built modular RAG pipeline: document preprocessing → embedding generation → vector indexing → context retrieval → LLM response',
      'Designed with clean separation of concerns: config, data, embedding, retrieval, and utils modules',
      'Supports pluggable embedding models and retrieval strategies for different document domains',
      'Foundation for LLM-powered query agents used in production QA/QC dashboard'
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/ngocthien2306/rag-pipeline' }
    ]
  }
];