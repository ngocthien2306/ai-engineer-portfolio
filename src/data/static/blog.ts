export interface LocalBlogPost {
  id: number;
  title: string;
  description: string;
  publishedAt: string;
  slug: string;
  readingTime: number;
  tags: string[];
  coverImage?: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
}

export const localBlogPosts: LocalBlogPost[] = [
  {
    id: 1,
    title: "Understanding Spiking Neural Networks: The Third Generation of Neural Networks",
    description: "Explore the fascinating world of Spiking Neural Networks (SNNs), their biological inspiration, advantages over traditional neural networks, and real-world applications in neuromorphic computing.",
    publishedAt: "2025-01-08",
    slug: "spiking-neural-networks-basics",
    readingTime: 12,
    tags: ["AI", "Machine Learning", "Spiking Neural Networks", "Neuroscience", "Neuromorphic Computing", "Deep Learning"],
    coverImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    author: {
      name: "Nguyen Ngoc Thien",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
    },
    content: `
# Understanding Spiking Neural Networks: The Third Generation of Neural Networks

As artificial intelligence continues to evolve, researchers are constantly seeking more efficient and biologically-inspired approaches to machine learning. Enter **Spiking Neural Networks (SNNs)** – often referred to as the "third generation" of neural networks. Unlike traditional artificial neural networks, SNNs more closely mimic the behavior of biological neurons by incorporating the concept of time into their computational model.

## What Are Spiking Neural Networks?

Spiking Neural Networks are a type of artificial neural network that models neurons using discrete events called "spikes" or "action potentials." Unlike conventional neural networks that use continuous activation functions, SNNs process information through temporal sequences of spikes, making them fundamentally different in how they encode and process information.

### Key Characteristics

1. **Temporal Dynamics**: SNNs incorporate time as a fundamental dimension
2. **Event-Driven Processing**: Information is encoded in the timing of spikes
3. **Biological Realism**: More closely mimics actual brain function
4. **Energy Efficiency**: Potentially more power-efficient than traditional ANNs

## How Do Spiking Neural Networks Work?

### Neuron Models

The most common neuron model used in SNNs is the **Leaky Integrate-and-Fire (LIF)** model:

\`\`\`python
# Simplified LIF neuron implementation
class LIFNeuron:
    def __init__(self, threshold=1.0, reset=0.0, decay=0.95):
        self.threshold = threshold
        self.reset = reset
        self.decay = decay
        self.membrane_potential = 0.0
        
    def update(self, input_current, dt=1.0):
        # Integrate input
        self.membrane_potential += input_current * dt
        
        # Apply decay
        self.membrane_potential *= self.decay
        
        # Check for spike
        if self.membrane_potential >= self.threshold:
            spike = True
            self.membrane_potential = self.reset
        else:
            spike = False
            
        return spike
\`\`\`

### Information Encoding

SNNs use several encoding schemes to convert input data into spike trains:

1. **Rate Coding**: Information encoded in the firing rate
2. **Temporal Coding**: Information encoded in precise spike timing
3. **Population Coding**: Information distributed across multiple neurons
4. **Phase Coding**: Information encoded in the phase of oscillatory activity

## Advantages of Spiking Neural Networks

### 1. Energy Efficiency
SNNs are inherently more energy-efficient because:
- Neurons only consume energy when they spike
- Sparse activity patterns reduce computational load
- Event-driven processing eliminates unnecessary calculations

### 2. Temporal Processing
- Natural handling of temporal sequences
- Ability to process time-varying signals
- Memory through dynamics rather than explicit storage

### 3. Biological Plausibility
- More realistic model of brain function
- Potential for better brain-computer interfaces
- Insights into neurological processes

### 4. Online Learning
- Continuous learning capabilities
- Real-time adaptation to new data
- No need for batch processing

## Challenges and Limitations

### 1. Training Complexity
Training SNNs is more challenging than traditional neural networks:
- Non-differentiable spike functions
- Credit assignment problem across time
- Limited availability of established training algorithms

### 2. Hardware Requirements
- Specialized neuromorphic hardware for optimal performance
- Current general-purpose processors not optimized for spike-based computation
- Limited software frameworks and tools

### 3. Performance Gap
- Often underperform compared to traditional deep networks on standard benchmarks
- Requires careful architecture design and hyperparameter tuning
- Limited theoretical understanding

## Training Spiking Neural Networks

### Surrogate Gradient Methods
\`\`\`python
import torch
import torch.nn as nn

class SpikingActivation(nn.Module):
    def __init__(self, threshold=1.0):
        super().__init__()
        self.threshold = threshold
        
    def forward(self, x):
        # Forward pass: Heaviside step function
        spikes = (x >= self.threshold).float()
        
        # Backward pass: Use surrogate gradient (sigmoid derivative)
        if self.training:
            surrogate_grad = torch.sigmoid(x)
            spikes = spikes.detach() + surrogate_grad - surrogate_grad.detach()
            
        return spikes
\`\`\`

### Conversion from ANNs
- Train conventional neural network first
- Convert activation functions to spiking equivalents
- Fine-tune the converted network

### Direct Training Methods
- Spike-Timing Dependent Plasticity (STDP)
- Evolutionary algorithms for weight optimization
- Reinforcement learning approaches

## Applications of Spiking Neural Networks

### 1. Neuromorphic Computing
- Intel's Loihi chip
- IBM's TrueNorth processor
- Ultra-low power edge computing

### 2. Sensory Processing
- Event-based vision systems
- Auditory signal processing
- Tactile sensing and robotics

### 3. Brain-Computer Interfaces
- Neural prosthetics
- Motor control systems
- Cognitive enhancement devices

### 4. Time-Series Analysis
- Financial market prediction
- Speech recognition
- Sensor data processing

## Getting Started with SNNs

### Popular Frameworks

1. **BindsNET**: PyTorch-based SNN simulation
2. **NEST**: Large-scale neural network simulation
3. **Brian2**: Python-based neural simulator
4. **SpyTorch**: PyTorch extension for SNNs

### Simple Example
\`\`\`python
import torch
import torch.nn as nn
from spytorch import functional as SF

class SimpleSNN(nn.Module):
    def __init__(self, input_size, hidden_size, output_size):
        super().__init__()
        self.fc1 = nn.Linear(input_size, hidden_size)
        self.fc2 = nn.Linear(hidden_size, output_size)
        
    def forward(self, x, time_steps=100):
        # Convert input to spike train
        spike_input = SF.rate_coding(x, time_steps)
        
        outputs = []
        membrane1 = torch.zeros(x.size(0), self.fc1.out_features)
        membrane2 = torch.zeros(x.size(0), self.fc2.out_features)
        
        for t in range(time_steps):
            # Layer 1
            membrane1 += self.fc1(spike_input[t])
            spikes1 = SF.lif_activation(membrane1)
            
            # Layer 2
            membrane2 += self.fc2(spikes1)
            output = SF.lif_activation(membrane2)
            
            outputs.append(output)
            
        return torch.stack(outputs)
\`\`\`

## Future Directions

### Research Areas
- Novel learning algorithms for SNNs
- Hybrid SNN-ANN architectures
- Improved neuromorphic hardware
- Better understanding of temporal coding

### Industry Applications
- Edge AI and IoT devices
- Autonomous vehicles
- Medical diagnostics
- Smart sensors and actuators

## Conclusion

Spiking Neural Networks represent a fascinating intersection of neuroscience and artificial intelligence. While they face current limitations in training complexity and performance on traditional benchmarks, their potential for energy-efficient, temporal processing makes them an exciting area of research.

As neuromorphic hardware continues to mature and training algorithms improve, SNNs may play a crucial role in the next generation of AI systems, particularly in applications requiring real-time processing, low power consumption, and biological compatibility.

The field is rapidly evolving, with new breakthroughs in both theory and application emerging regularly. For researchers and practitioners interested in bio-inspired computing, SNNs offer a rich and promising avenue for exploration.

---

*This post explores the fundamentals of Spiking Neural Networks, their advantages, challenges, and applications. As someone working with cutting-edge neural network technologies, I'm excited about the potential of SNNs to revolutionize how we approach artificial intelligence and neuromorphic computing.*
    `
  }
];

// Helper function to get blog post by slug
export const getBlogPostBySlug = (slug: string): LocalBlogPost | undefined => {
  return localBlogPosts.find(post => post.slug === slug);
};

// Helper function to get recent blog posts
export const getRecentBlogPosts = (limit: number = 3): LocalBlogPost[] => {
  return localBlogPosts
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
};