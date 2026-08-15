export interface VideoItem {
  /** Embed URL for youtube/facebook/gdrive, or a file path (relative to BASE_URL) for `local`. */
  embedUrl: string;
  type: 'youtube' | 'facebook' | 'gdrive' | 'local';
  title: string;
  /** Poster frame — shown before playback and in the thumbnail strip. Used by `local` videos. */
  poster?: string;
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

const base = import.meta.env.BASE_URL || './';

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
      'Deployed 5 models in parallel across 3 Basler cameras/line on Jetson Orin Nano/NX, inspecting 30,000–50,000 products/line/day at 70–180 products/min',
      'Achieved 99%+ detection accuracy and 0.4% false positive rate via TensorRT FP16/INT8 optimization',
      'Built React + FastAPI operations dashboard with an LLM-powered agent; operators query production data and control AI modules in natural language (<5s response)',
      'Replaced 100% manual QC inspection solo within 3 months, deployed across 7+ production lines'
    ],
    videos: [
      {
        embedUrl: `${base}videos/qaqc-realtime-monitor.mp4`,
        poster: `${base}videos/qaqc-realtime-monitor.jpg`,
        type: 'local',
        title: 'Realtime Inference Monitor'
      },
      {
        embedUrl: `${base}videos/qaqc-line-inspection.mp4`,
        poster: `${base}videos/qaqc-line-inspection.jpg`,
        type: 'local',
        title: 'Production Line Inspection'
      },
      {
        embedUrl: `${base}videos/qaqc-onsite-monitor.mp4`,
        poster: `${base}videos/qaqc-onsite-monitor.jpg`,
        type: 'local',
        title: 'On-Site Multi-Camera Result'
      }
    ]
  },
  {
    id: 2,
    title: 'Event-Based Eye Gaze Estimation & Pupil Segmentation with SNNs',
    subtitle: 'Custom Spiking Neural Network research on event-camera (EVS) data',
    organization: 'NCU Deep Learning Lab',
    status: 'Research',
    startDate: '2024',
    endDate: '2025',
    stack: ['PyTorch', 'SNNTorch', 'Event-Based Vision (EVS)', 'OpenCV', 'Jetson', 'GPU Server'],
    highlights: [
      'Designed custom Spiking Neural Network architectures from scratch (no pretrained backbone) for two tasks: gaze regression and pupil segmentation',
      'Built on Leaky Integrate-and-Fire (LIF) neurons with surrogate-gradient training; explored several spike-encoding strategies and task-specific composite loss functions',
      'Owned the full research pipeline: event-camera capture rig, dataset collection and preprocessing, training, and real-time inference deployment on GPU server and Jetson edge hardware',
      'Delivered real-time inference on edge hardware for both tasks'
    ],
    videos: [
      { embedUrl: 'https://drive.google.com/file/d/1XsxSc0_fXKirsG994k08lBxj_kqYKDUi/preview', type: 'gdrive', title: 'Eye Gaze Demo 1' },
      { embedUrl: 'https://drive.google.com/file/d/1bNwilr4LmGBT5CWpPjM6GpBmWft-LiVX/preview', type: 'gdrive', title: 'Eye Gaze Demo 2' }
    ]
  },
  {
    id: 3,
    title: 'i-PPE: ISO 45001 PPE Compliance Detection',
    subtitle: 'Commercialized AI safety product for factory door/machine access control',
    organization: 'i-SOFT JSC',
    status: 'Commercialized',
    startDate: 'Nov 2023',
    endDate: 'Jun 2024',
    stack: ['YOLO', 'TensorRT', 'Jetson Edge Device', 'FastAPI', 'Python'],
    highlights: [
      'Built an AI system enforcing ISO 45001 compliance: gate and machine access is granted only on real-time PPE detection at entry points of hazardous zones',
      'Achieved 99% accuracy and <1% false positive rate at 30 FPS on Jetson. Runs fully on the edge, with no cloud dependency',
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
    title: 'Safety AI CCTV',
    subtitle: '8-module safety platform running 8+ AI models across 13 cameras',
    organization: 'i-SOFT JSC',
    status: 'Production',
    startDate: 'Sep 2023',
    endDate: 'Feb 2024',
    stack: ['YOLO', 'Pose Estimation', 'OCR', 'PyTorch', 'GPU Server', 'FastAPI', 'React', 'PLC'],
    highlights: [
      'Engineered 8-module safety platform running 8+ AI models in parallel across 13 cameras at 20–30 FPS: handrail compliance, zone intrusion, AGV proximity, smart lighting',
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
    subtitle: 'Event-camera + radar sensor fusion for real-time fall detection and object tracking',
    organization: 'NCU Deep Learning Lab',
    status: 'Research',
    startDate: '2024',
    endDate: '2025',
    stack: ['Event-Based Vision (EVS)', 'Radar Sensor', 'Sensor Fusion', 'PyTorch', 'Jetson', 'GPU Server'],
    highlights: [
      'Designed a fall detection and multi-object tracking system fusing an event-based camera with radar sensor data',
      'Used the event camera\'s microsecond temporal resolution to capture high-speed motion without motion blur',
      'Built the full pipeline from event-stream preprocessing to real-time inference on Jetson edge hardware',
      'Privacy-friendly: event streams contain motion data only, with no identifiable imagery'
    ],
    videos: [
      { embedUrl: 'https://drive.google.com/file/d/1WpBoKFJoz6AbCE4UUD7dUszqyzAwn7Cg/preview', type: 'gdrive', title: 'Fall Detection & Tracking Demo' }
    ]
  },
  {
    id: 6,
    title: 'Agent VLM',
    subtitle: 'Natural language search across continuous multi-camera footage via a hybrid retrieval + segmentation pipeline',
    organization: 'NCU Deep Learning Lab',
    status: 'Research',
    startDate: '2024',
    endDate: '2025',
    stack: ['Vision-Language Models', 'Vector Search (Qdrant)', 'FastAPI', 'React', 'PyTorch', 'Ollama', 'Claude API', 'Docker', 'AWS S3'],
    highlights: [
      'Two-stage hybrid search: vision-language embeddings for fast semantic retrieval, then a promptable segmentation stage for precise object localization and verification',
      'Natural language queries in Vietnamese & English across large frame archives from continuous multi-camera footage',
      'Real-time result streaming via WebSocket + SSE; pluggable query parsing on either a local LLM (Ollama) or a hosted API',
      'Full-stack: FastAPI backend, React dashboard, vector DB and S3 storage, all containerized with CUDA-optimized Docker'
    ],
    videos: [
      { embedUrl: 'https://drive.google.com/file/d/1yT1rOYZOmHMEe8-J4r_ZnzBXRxfyoxH7/preview', type: 'gdrive', title: 'Agent VLM Demo' }
    ]
  },
  {
    id: 7,
    title: 'GraphGuard',
    subtitle: 'GNN system for transaction fraud & anomaly detection with continual learning',
    organization: 'NCU, AI for Security R&D',
    status: 'Research',
    startDate: '2025',
    endDate: '2025',
    stack: ['Python', 'PyTorch', 'Graph Neural Networks', 'Continual Learning', 'Feature Engineering'],
    highlights: [
      'Implemented a relational graph attention architecture for transaction fraud detection on financial graph data',
      'Extended it with continual-learning regularization to prevent catastrophic forgetting as fraud patterns evolve',
      'Built the end-to-end pipeline: feature engineering, graph construction, model training, and automated report generation',
      'Developed for NCU AI for Security R&D coursework on financial fraud detection'
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/ngocthien2306/GraphGuard' }
    ]
  },
  {
    id: 8,
    title: 'Task Agent',
    subtitle: 'Natural language task scheduling, reminders, and 3D avatar AI agent',
    organization: 'Personal Project',
    status: 'Personal',
    startDate: '2025',
    endDate: '2025',
    stack: ['Node.js', 'React', 'React Native', 'LLM', '3D Avatar', 'Docker', 'REST API'],
    highlights: [
      'Built a cross-platform AI agent (web + mobile) that creates tasks, sets reminders, and manages schedules via natural language input',
      'Integrated a 3D avatar as the interactive AI interface. It responds to the user and shows task updates visually',
      'Full-stack architecture: Node.js backend, React web frontend, React Native mobile app, all containerized with Docker',
      'Uses NLP intent parsing to turn free-form text into scheduled tasks and reminders'
    ],
    links: [
      { label: 'Backend', url: 'https://github.com/ngocthien2306/task-agent-backend' },
      { label: 'Frontend', url: 'https://github.com/ngocthien2306/task-agent-frontend' },
      { label: 'Mobile', url: 'https://github.com/ngocthien2306/task-agent-native' }
    ]
  },
  {
    id: 9,
    title: 'Android PPE Detection',
    subtitle: 'Real-time PPE compliance detection on Android using YOLO + C++ NDK',
    organization: 'Personal Project',
    status: 'Personal',
    startDate: '2024',
    endDate: '2024',
    stack: ['YOLO', 'C++ NDK', 'Android', 'OpenCV', 'TFLite / ONNX'],
    highlights: [
      'Ported YOLO object detection to Android using C++ NDK for native inference performance',
      'Detects PPE compliance (helmet, vest, gloves) in real time directly on the device, with no server required',
      'Optimized for mobile hardware constraints: low latency inference with minimal memory footprint',
      'A mobile version of the i-PPE concept, for walk-around safety inspection on the factory floor'
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/ngocthien2306/android-yolo' }
    ]
  },
  {
    id: 10,
    title: 'RAG Pipeline',
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