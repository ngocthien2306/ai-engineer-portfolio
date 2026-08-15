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

const B = import.meta.env.BASE_URL || './';
const AUTHOR_AVATAR = `${import.meta.env.BASE_URL || './'}profile1.jpg`;

export const localBlogPosts: LocalBlogPost[] = [
  {
    id: 3,
    title: "Putting Computer Vision on a Production Line",
    description: "Notes from deploying inspection and safety vision systems in factories: why a trained detector was the wrong tool for localisation, the physical detail that caused 500 false rejects an hour, and why accuracy is the wrong number to report.",
    publishedAt: "2026-08-16",
    slug: "computer-vision-production-line",
    readingTime: 9,
    tags: ["Computer Vision", "Industrial AI", "Edge AI", "Manufacturing", "OCR", "Jetson", "Machine Vision"],
    coverImage: `${B}blog/industrial-inspection-station.jpg`,
    author: {
      name: "Nguyen Ngoc Thien",
      avatar: AUTHOR_AVATAR
    },
    content: `

# Putting Computer Vision on a Production Line

The most useful thing I have learned about industrial computer vision is that the model is rarely the problem.

A while into one deployment, a station I had built was rejecting roughly 500 good products an hour. Not missing defects: rejecting perfectly fine product. The detection model was working exactly as trained. The problem was that the factory ran more than 200 container variants, I had training data for a fraction of them, and on an unseen shape the model put the object centre in the wrong place. Everything downstream of that wrong centre was arithmetic on a bad number.

That failure is a fair summary of the difference between a benchmark and a factory. On a benchmark you optimise a metric. On a line you are one component inside a machine that is already running, and the machine does not stop to accommodate you.

![Machine vision inspection station over a bottling conveyor](${B}blog/industrial-inspection-station.jpg)

## The constraints are the design

Four things shape every decision in this kind of work, and none of them appear in a paper.

**The line does not wait.** Products arrive at a fixed rate set by mechanical equipment. If a station runs at 180 products per minute, everything from trigger to actuator has to complete in roughly 330 ms, and the reject arm has to fire while the product is still in front of it. A model that is 2% more accurate and 200 ms slower is not a better model. It is an unusable one.

**There is no cloud.** Plant networks are segmented, often air-gapped, and a round trip to a server is a dependency that will eventually take the line down at 2am. Inference runs on hardware bolted to the machine, sharing a cabinet with a power supply and a PLC.

**The operators are not engineers.** When a new product runs, someone on shift has to set the station up. If that requires collecting images, labelling them, and retraining, it will not happen. It has to be something a person can do in a few minutes between batches.

**The two failure modes are not equal.** Missing a defect ships a bad unit. Falsely rejecting throws away a good one, and if it happens often enough the operators switch the system off, which is worse than not having built it. Which error you can afford depends entirely on the plant, and nobody in the plant will tell you in the units you want.

![The closed loop from encoder trigger to reject actuator](${B}blog/inspection-loop.svg)

Concretely, that loop runs on three cameras at once. Each one answers a different question, and a product only passes if all of them agree.

![Signal path from PLC trigger through three cameras to the reject actuator](${B}blog/station-signal-path.svg)

Splitting the work that way is what makes the deadline reachable. Each camera takes around 170 ms on its own, which does not fit three times over inside a 330 ms budget, so they run in parallel and the verdicts are combined once.

## Localisation: the part that is not machine learning

The station has to answer two questions: where is the thing, and what does it say. Almost all of the difficulty is in the first one.

The instinct is to train a detector. It is what the tooling is built for and it works well in general settings. But a production line is not a general setting, and that turns out to matter in both directions.

![Training a detector versus matching against the fixture](${B}blog/detector-vs-template.svg)

The line is a fixed fixture. The camera does not move. The light does not move. The product arrives in roughly the same place every time, held by mechanical guides. A detector spends most of its capacity learning to be robust to variation that has been engineered out of the problem, and then fails on the one axis that does vary, which is the product itself.

Template matching goes the other way. An operator draws the regions once on a reference image. At run time the system matches that reference against the incoming frame, solves a homography, and rectifies. Adding a product is drawing new boxes, not collecting a dataset. No labelling, no training run, no model to redeploy, and no risk that a new variant silently degrades a network that was fine yesterday.

It is a less interesting technique and a better fit. That trade comes up constantly in this work.

## The detail that no model saves you from

Here is a frame from the inspection camera. Look at the sides of the bottle.

![A transparent bottle under directional light showing two bright edges on each side](${B}blog/bottle-edge-problem.jpg)

Each side shows two bright vertical lines, not one. The plastic is transparent, so the camera sees the near wall and the far wall of the bottle as separate specular highlights. The outer line is the back of the bottle seen through the front of it. The inner line is the wall you actually care about.

My edge finder was taking the strongest response in the outer part of the search band, which meant it locked onto the outer line every time. The measurement was consistent, repeatable, and about a wall thickness wrong.

It got worse when the label was misaligned, which was the thing being measured. A shifted label moved the crop, the crop cut one side of the bottle out of frame entirely, and the algorithm went looking for an edge in a region that no longer contained one. The failure was largest exactly where the answer mattered most.

The eventual fix does not involve a neural network. Measure the inner width once on the reference image, find whichever edge is still visible in the crop, and extrapolate the other one. One stable measurement plus one observation, instead of two unreliable observations.

I have come to treat this as the shape of most industrial vision problems. The hard part is a physical fact about the object, the material, or the lighting, and the solution is usually geometry. Reaching for a bigger model is often a way of avoiding the twenty minutes it takes to understand what the camera is actually seeing.

## Reading is the easy half

Once the region is located and rectified, reading it is comparatively simple, and worth simplifying further.

A general OCR pipeline runs text detection and then text recognition. But the detection stage exists to answer "where is the text", and the template match has already answered that with better precision than a detector would. So the detection stage gets deleted and only the recognition model runs, on a fixed crop, batched across regions.

The result is faster, more predictable in latency, and easier to debug. When a read fails you know it is a recognition problem, because localisation is the deterministic step.

The general lesson: in a constrained environment, the components you can delete matter more than the ones you can add. Every stage you remove is a stage that cannot fail at 3am.

## Where the work actually goes

![Edge computing hardware and a PLC in a control cabinet beside the line](${B}blog/edge-cabinet.jpg)

Nothing about deploying to a cabinet is glamorous, and it is where a large share of the time goes.

It also helps to be clear about which parts of the system are actually on the critical path, because most of them are not.

![System functions grouped by audience: setup, run, and review](${B}blog/system-functions.svg)

Edge devices share memory between CPU and GPU, so the inference engines, the camera SDK, the application, and the database all draw from the same pool. On one deployment the fix was mundane: disable the default compressed-RAM swap, put a real swap file on the NVMe drive, and cap the database cache so it stopped competing with the model for the same memory. None of that is computer vision. All of it is the difference between a station that runs for a month and one that dies overnight.

The parts that are always underestimated: the triggering and lighting setup, the integration with the PLC that actually moves the reject arm, the interface an operator uses at 6am, and the audit trail that lets someone answer why a specific unit was rejected three weeks ago. The model is a small piece in the middle.

## Measuring it honestly

Accuracy is close to meaningless here, and it is the number everyone reports.

If the defect rate on a mature line is one percent, a system that passes everything scores 99% accuracy. That number is indistinguishable from not installing the system at all. It is also the number that is easiest to put on a slide, which is why it keeps appearing.

The numbers a plant actually needs are the two error rates, separately, in units they use:

- **Escape rate.** How many defective units get through, out of how many defective units. This is the one that reaches the customer.
- **False reject rate.** How many good units get thrown away, as a share of production. Multiply by volume before quoting it. Half a percent sounds small until you turn 50,000 units a day into 250 units in the reject bin.

Both depend on a threshold, and choosing that threshold is a business decision, not a technical one. The right way to set it is to sit with the quality lead, show them the trade curve, and let them choose. That conversation is also how you find out what the plant actually cares about, which is rarely what the specification said.

## Safety systems invert the asymmetry

Inspection is not the only place vision earns its keep. The other pattern I have worked on is safety: checking protective equipment at the entrance to a hazardous area, watching for people in the wrong zone, or gating a machine so it will not start unless the person in front of it is properly equipped.

The engineering rhymes, but the error asymmetry flips completely.

On an inspection station, a false reject costs one unit. On an access gate, the two errors are letting an unprotected person into a hazardous area, and locking out someone who is properly equipped. The first is a safety incident. The second, repeated a few times, is the reason the guard gets propped open and the system gets bypassed.

So the design questions change. You stop asking for one accuracy number and start asking which direction the system should fail in, how a person overrides it when it is wrong, and what happens on power loss. A safety system that is right 99% of the time and has no override is worse than a slightly less accurate one that people trust enough to leave switched on.

## If you are starting

Spend your first day on the camera and the light, not the model. Most of the difficulty you are about to have is being created right there, and most of it can be engineered away with a different illuminator or a mechanical guide.

Take the constraints seriously as design inputs rather than obstacles. The fixed fixture that makes the problem boring is the same fixed fixture that lets you delete the detector.

And when something behaves strangely, go and look at the raw frames before touching the model. The bottle had two edges the whole time. No amount of retraining would have found that, because nothing was wrong with the training.

---

*Based on production deployments in food processing and industrial safety. Specifics about customers and their processes are omitted.*
    `
  },
  {
    id: 2,
    title: "The Definitive Guide to Domain-Specific LLM Fine-Tuning",
    description: "A practical deep-dive into adapting open-weights foundation models for production use cases via PEFT, QLoRA, and open-source frameworks like Unsloth and Axolotl — with code, benchmarks, and a production checklist.",
    publishedAt: "2026-03-22",
    slug: "domain-specific-llm-fine-tuning",
    readingTime: 18,
    tags: ["LLM", "Fine-Tuning", "QLoRA", "PEFT", "LoRA", "Unsloth", "Axolotl", "Machine Learning", "NLP"],
    coverImage: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    author: {
      name: "Nguyen Ngoc Thien",
      avatar: AUTHOR_AVATAR
    },
    content: `
# The Definitive Guide to Domain-Specific LLM Fine-Tuning

When I first tried to get a general-purpose LLM to reliably output structured JSON for a production QA/QC dashboard, I hit the same wall everyone does: the model was smart but unpredictable. It paraphrased when I needed precision, hallucinated field names, and completely ignored formatting rules I'd spent hours engineering into prompts.

That was the moment I stopped asking *"can I prompt my way out of this?"* and started asking *"when do I actually fine-tune?"*

This guide is the distillation of what I've learned — covering the decision framework, the mechanics of PEFT and QLoRA, framework selection, hyperparameter tuning, and the production checklist you need before deploying a domain-adapted model.

---

## 1. The Decision Framework: Prompting vs RAG vs Fine-Tuning

Before writing a single training loop, you need to make the right architectural choice. These three approaches are not interchangeable — each excels in a distinct regime.

| | **Prompting** | **RAG** | **Fine-Tuning** |
|---|---|---|---|
| **Best for** | Fast iteration, prototyping | Massive, fast-changing external knowledge | Deep domain expertise, custom jargon, strict style alignment |
| **Compute** | Minimal | Medium (retrieval infra) | GPU training required |
| **Parameters updated** | None | None | Yes — model weights change |
| **Limitations** | Context window ceiling, formatting inconsistency | Retrieval latency, failure modes | Requires curated dataset, training compute |

### The Hybrid Sweet Spot

In practice, the most powerful production systems use **both** fine-tuning and RAG:

- **Fine-tune** to bake in stylistic behavior, output formatting, domain vocabulary, and reasoning patterns
- **RAG** to inject real-time factual grounding that would otherwise be frozen in model weights

Think of it this way: fine-tuning teaches the model *how to think and speak* in your domain. RAG gives it *what to say* at inference time. For my LLM-powered operator dashboard at Suntech, we fine-tuned a smaller model to correctly parse Vietnamese factory queries and produce structured API calls — then used RAG to pull live production data from MongoDB.

---

## 2. Why PEFT? The Bottleneck of Full Fine-Tuning

Full fine-tuning a 65B parameter model requires **>780GB of VRAM** across multiple A100s. Even for a 7B model, the compute requirement is prohibitive for most teams. More critically, full fine-tuning is prone to **catastrophic forgetting** — the model overwrites the broad capabilities it gained during pretraining while specializing.

**Parameter-Efficient Fine-Tuning (PEFT)** solves both problems by training only a tiny subset of parameters while keeping the original model weights frozen.

### The LoRA Mechanism

LoRA (Low-Rank Adaptation) is the dominant PEFT technique. The key insight: the weight updates during fine-tuning have a low intrinsic rank. Instead of updating the full weight matrix $W$, LoRA injects two small trainable matrices $A$ and $B$:

$$W' = W + \\Delta W = W + BA$$

where $B \\in \\mathbb{R}^{d \\times r}$, $A \\in \\mathbb{R}^{r \\times k}$, and rank $r \\ll \\min(d, k)$.

The original weights $W$ are frozen. Only $A$ and $B$ are trained — updating **<1% of total parameters**.

\`\`\`python
from peft import LoraConfig, get_peft_model, TaskType
from transformers import AutoModelForCausalLM

base_model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-3.1-8B")

lora_config = LoraConfig(
    r=16,                          # rank
    lora_alpha=32,                 # scaling factor (alpha/r = 2 is a good default)
    target_modules="all-linear",   # apply to ALL linear layers, not just q/v
    lora_dropout=0.05,
    bias="none",
    task_type=TaskType.CAUSAL_LM,
)

model = get_peft_model(base_model, lora_config)
model.print_trainable_parameters()
# trainable params: 41,943,040 || all params: 8,072,667,136 || trainable%: 0.52%
\`\`\`

> **Critical tip:** Always set \`target_modules="all-linear"\` rather than just \`["q_proj", "v_proj"]\`. Targeting all linear layers — including FFN layers — consistently produces higher task quality at minimal extra cost.

---

## 3. Pushing the Limits: QLoRA and Quantization

QLoRA (Quantized LoRA) takes this further by **quantizing the frozen base model to 4-bit** while keeping the LoRA adapters in BFloat16. This lets you fine-tune a 70B model on a single 48GB GPU — previously impossible.

Three innovations make this work:

### 4-bit NormalFloat (NF4)
An information-theoretically optimal data type for normally distributed weights. Empirically superior to standard INT4 — it preserves more of the weight distribution's shape since pretrained LLM weights are approximately normally distributed.

### Double Quantization
Quantizing the quantization constants themselves. Saves ~3GB of memory on a 65B model (0.37 bits per parameter). Essentially free memory savings.

### Paged Optimizers
Uses NVIDIA's unified memory to automatically page optimizer states to CPU RAM during gradient checkpointing spikes. Eliminates OOM crashes without sacrificing training quality.

\`\`\`python
import torch
from transformers import AutoModelForCausalLM, BitsAndBytesConfig

bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_use_double_quant=True,   # double quantization
    bnb_4bit_quant_type="nf4",        # NormalFloat4
    bnb_4bit_compute_dtype=torch.bfloat16,
)

model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-3.1-70B",
    quantization_config=bnb_config,
    device_map="auto",
)
\`\`\`

With QLoRA + a single H100 80GB, you can fine-tune a 70B model that would otherwise require a cluster.

---

## 4. Step 1 of the Pipeline: High-Quality Data Preparation

> *"Quality > Quantity."* — The LIMA principle

The LIMA paper (Less Is More for Alignment) demonstrated that **1,000 perfectly curated, diverse examples** can dramatically outperform 100,000 noisy samples. This is the most underrated lesson in LLM fine-tuning.

### The Cleaning Pipeline

Use **heuristic-based rules** over rigid classifiers. Why? Rigid classifiers often filter out valuable domain-specific language — unusual terminology, technical abbreviations, or non-standard phrasings that are actually the signal you're trying to train on.

Practical heuristics:
- Remove duplicates aggressively (exact + near-duplicate via MinHash)
- Filter by length (too short = no signal; too long = diluted supervision)
- Check output quality: does the response actually answer the instruction?
- Deduplicate by topic cluster to ensure diversity

### Prompt Symmetry — The Most Common Mistake

Your training data's input/output format must **exactly mirror** what the model will receive at inference time. If you use ChatML format in training but plain text at inference, the model will hallucinate stop tokens and break.

\`\`\`python
# Correct: ChatML format (matches inference)
def format_example(instruction: str, response: str) -> str:
    return (
        "<|im_start|>system\\n"
        "You are a factory operations assistant. Always respond in JSON.\\n"
        "<|im_end|>\\n"
        "<|im_start|>user\\n"
        f"{instruction}\\n"
        "<|im_end|>\\n"
        "<|im_start|>assistant\\n"
        f"{response}\\n"
        "<|im_end|>"
    )
\`\`\`

---

## 5. Framework Selection: Which Tool for Which Job?

| Framework | Best For | Key Strength |
|---|---|---|
| **Unsloth** | Single-GPU, speed-critical | 2x faster, 60% less VRAM via custom Triton kernels |
| **Axolotl** | Multi-GPU, enterprise scale | YAML config, DeepSpeed/FSDP integration, sample packing |
| **LlamaFactory** | Rapid prototyping, WebUI | 100+ model support, RAG+FT integration |
| **Torchtune** | PyTorch-native custom work | First-party PyTorch, maximum flexibility |

### Framework Spotlight: Unsloth

Unsloth rewrites heavy attention computations using custom Triton kernels — achieving massive speed improvements **without approximation or quantization accuracy degradation**. This is important: some fast fine-tuning libraries sacrifice numerical accuracy for speed. Unsloth doesn't.

\`\`\`python
from unsloth import FastLanguageModel
import torch

model, tokenizer = FastLanguageModel.from_pretrained(
    model_name="unsloth/Meta-Llama-3.1-8B",
    max_seq_length=4096,
    dtype=None,          # auto-detect: BF16 on Ampere+
    load_in_4bit=True,   # QLoRA
)

model = FastLanguageModel.get_peft_model(
    model,
    r=16,
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj",
                    "gate_proj", "up_proj", "down_proj"],
    lora_alpha=32,
    lora_dropout=0,      # Unsloth optimizes for dropout=0
    bias="none",
    use_gradient_checkpointing="unsloth",  # 30% more VRAM savings
    random_state=42,
)
\`\`\`

Performance profile: trains Llama 3.1 8B at ~2× standard HuggingFace speed while using ~60% less VRAM. Exports directly to GGUF (for llama.cpp/Ollama) or 16-bit safetensors.

### Framework Spotlight: Axolotl

Axolotl's philosophy is **configuration over code**. Your entire training run is defined in a YAML file — reproducible, version-controllable, shareable:

\`\`\`yaml
# axolotl_config.yml
base_model: meta-llama/Llama-3.1-8B
model_type: LlamaForCausalLM

datasets:
  - path: my_domain_data.jsonl
    type: alpaca

sequence_len: 4096
sample_packing: true          # packs short sequences → dramatic efficiency gain

adapter: lora
lora_r: 16
lora_alpha: 32
lora_target_linear: true      # all linear layers

bf16: true
gradient_checkpointing: true

deepspeed: deepspeed_configs/zero2.json   # multi-GPU scale-out
\`\`\`

The **sample packing** feature is a significant efficiency win: it packs multiple short training sequences into a single context window, dramatically reducing wasted padding tokens and improving GPU utilization.

---

## 6. Advanced: LoRAFusion for Multi-Job Throughput

Standard LoRA hits a bottleneck when running multiple fine-tuning jobs simultaneously: redundant memory access on large activation tensors crushes multi-job throughput.

**LoRAFusion** (EUROSYS '26) addresses this with a multi-level fusion system that splits the computation graph exactly where tensor size shrinks to rank $r$, fusing memory-bound operations without forcing recomputation.

The result: **up to 1.96× end-to-end speedup** over standard distributed LoRA training by dynamically grouping adapters into balanced microbatches.

This matters for teams running hyperparameter sweeps or training multiple task-specific adapters in parallel.

---

## 7. Hyperparameter Tuning: The Practical Guide

### LoRA Rank (r) and Alpha

| Rank | Use case | VRAM cost |
|---|---|---|
| r=8 | Simple tasks, style alignment | Minimal |
| r=16 | General domain adaptation (recommended default) | Low |
| r=32 | Complex reasoning tasks, large vocabulary shift | Medium |
| r=64+ | Rarely needed; diminishing returns | High |

**Rule of thumb:** Set \`alpha = 2 * r\`. This keeps the effective learning rate for the adapter stable across rank choices.

### Learning Rate

LoRA adapters are small — they don't need a large learning rate. Start at \`2e-4\` and decay with a cosine schedule. A common failure mode is using the same LR as full fine-tuning (1e-5 to 1e-4), which is usually too low and leads to underfitting.

\`\`\`python
from transformers import TrainingArguments

training_args = TrainingArguments(
    output_dir="./output",
    num_train_epochs=3,
    per_device_train_batch_size=4,
    gradient_accumulation_steps=8,     # effective batch = 32
    learning_rate=2e-4,
    lr_scheduler_type="cosine",
    warmup_ratio=0.05,
    bf16=True,
    logging_steps=10,
    save_strategy="epoch",
    report_to="wandb",                 # always monitor
)
\`\`\`

### Logging and Telemetry — Non-Negotiable

Always integrate experiment tracking. Catastrophic overfitting on small domain datasets is common and easy to miss without monitoring.

\`\`\`python
import wandb

wandb.init(
    project="llm-finetuning",
    config={
        "model": "llama-3.1-8b",
        "lora_r": 16,
        "dataset_size": 2500,
        "task": "factory-qa",
    }
)
# Monitor: training_loss (should decrease smoothly),
#          eval_loss (if it diverges from train_loss → overfitting)
\`\`\`

---

## 8. Evaluation: Beyond BLEU and ROUGE

Legacy metrics like BLEU and ROUGE measure token overlap — they completely miss semantic equivalence. A response can be factually correct and get a low BLEU score. Don't use them as your primary signal.

### Automated Benchmarking

For general capability regression testing, use **MMLU** (Massive Multitask Language Understanding) to confirm your fine-tuned model hasn't regressed on general knowledge.

\`\`\`python
from deepeval.benchmarks import MMLU
from deepeval.benchmarks.tasks import MMLUTask

benchmark = MMLU(tasks=[MMLUTask.MACHINE_LEARNING, MMLUTask.COMPUTER_SCIENCE])
results = benchmark.evaluate(model=your_model)
print(results.overall_score)
\`\`\`

### LLM-as-a-Judge

For domain-specific quality evaluation, deploy GPT-4 or Claude to rate fine-tuned responses against a baseline:

\`\`\`python
import anthropic

client = anthropic.Anthropic()

def judge_response(instruction: str, response_a: str, response_b: str) -> dict:
    """Tournament-style head-to-head evaluation."""
    prompt = f"""You are evaluating two AI responses to a factory operations query.

Query: {instruction}

Response A: {response_a}
Response B: {response_b}

Rate which response is better for a factory operator (accuracy, clarity, actionability).
Respond with JSON: {{"winner": "A" or "B" or "tie", "reasoning": "..."}}"""

    message = client.messages.create(
        model="claude-opus-4-6",
        max_tokens=256,
        messages=[{"role": "user", "content": prompt}]
    )
    return message.content[0].text

# Track Elo ratings across tournament matches for robust ranking
\`\`\`

### Domain Golden Dataset

This is the most important evaluation asset: a **human-annotated ground-truth dataset** specific to your exact production use case. No benchmark can substitute for real expert-labeled examples from your domain.

For my factory QA system: 200 real operator queries paired with ground-truth JSON responses, annotated by the factory floor manager. This dataset was more valuable than any automated metric.

---

## 9. Production Checklist

Before deploying a fine-tuned model to production, verify each of these:

**Data Fidelity**
- [ ] Dataset is heuristically curated and aggressively deduplicated
- [ ] Training prompts exactly mirror production inference format
- [ ] Diversity verified: no single topic dominates >20% of samples

**Method Selection**
- [ ] QLoRA/PEFT used to minimize compute (not full fine-tuning unless justified)
- [ ] \`target_modules="all-linear"\` for maximum task quality
- [ ] \`alpha = 2 * r\` scaling rule applied

**Framework Match**
- [ ] Single GPU → Unsloth; Multi-GPU → Axolotl; Custom work → Torchtune
- [ ] Sample packing enabled (Axolotl) or gradient checkpointing (Unsloth)
- [ ] Experiment tracking integrated (WandB / MLflow / SwanLab)

**Domain Evaluation**
- [ ] LLM-as-a-judge pipeline ready with Elo rating system
- [ ] Domain-specific golden dataset with human annotations
- [ ] MMLU regression check to confirm no general capability degradation
- [ ] Inference format tested end-to-end before rollout

---

## Conclusion

Fine-tuning is not the first tool you reach for — but when prompting and RAG hit their limits, it's the right one. The PEFT ecosystem has matured dramatically: QLoRA lets you fine-tune 70B models on a single GPU, Unsloth halves your training time, and Axolotl makes multi-GPU runs reproducible with a YAML file.

The most important lessons from my experience:
1. **Data quality beats data quantity** — 1,000 perfect examples > 50,000 noisy ones
2. **Prompt symmetry is critical** — training format must exactly match inference
3. **Target all linear layers** — not just attention projections
4. **LLM-as-a-judge + domain golden set** is the only evaluation that actually matters for production
5. **Monitor everything** — catastrophic overfitting on small datasets is silent without telemetry

The toolchain is ready. The hardware is accessible. The bottleneck is now data curation and evaluation rigor — which are human problems, not compute problems.

---

*References: QLoRA (Dettmers et al.), LIMA (Zhou et al.), LoRAFusion (Zhu et al., EUROSYS '26), HuggingFace PEFT, Unsloth, Axolotl, LlamaFactory.*
    `
  },
  {
    id: 1,
    title: "Understanding Spiking Neural Networks",
    description: "How LIF neurons and surrogate gradients actually work, why the energy-efficiency claim only holds on neuromorphic silicon, and the two implementation mistakes that quietly stop an SNN from being one. With working snnTorch code.",
    publishedAt: "2025-01-08",
    slug: "spiking-neural-networks-basics",
    readingTime: 12,
    tags: ["AI", "Machine Learning", "Spiking Neural Networks", "Neuroscience", "Neuromorphic Computing", "Deep Learning"],
    coverImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    author: {
      name: "Nguyen Ngoc Thien",
      avatar: AUTHOR_AVATAR
    },
    content: `
# Understanding Spiking Neural Networks

Spiking Neural Networks (SNNs) are often called the "third generation" of neural networks. The label oversells it a little, but the underlying idea is real: instead of passing a single number between layers, an SNN passes discrete events through time, and every neuron carries state between timesteps.

I work with SNNs on event-camera data, so most of what follows is written from the position of someone who has had to make these things actually train and actually run on a Jetson, rather than from the position of the survey papers. That means this post spends as much time on what does not work as on what does.

## What actually changes

An artificial neuron is a pure function. Give it the same input twice and you get the same output twice. A spiking neuron is not: it has a membrane potential that persists, so the same input arriving at a different moment produces a different result.

![Comparison of an artificial neuron and a spiking neuron](${B}blog/ann-vs-snn.svg)

That single change is the whole story. Everything else in this post is a consequence of it: the training difficulty, the hardware requirements, the temporal processing, and the energy argument.

### Key characteristics

1. **Time is part of the model.** There is no forward pass without a number of timesteps.
2. **Communication is binary.** A neuron either fires or it does not; there is no magnitude.
3. **State is local.** Each neuron remembers its own potential rather than relying on an explicit memory mechanism.

## The Leaky Integrate-and-Fire neuron

Almost everything practical uses the **Leaky Integrate-and-Fire (LIF)** model. Input current pushes the potential up, the potential leaks away between inputs, and when it crosses a threshold the neuron fires and the potential is knocked back down.

![Leaky integrate-and-fire dynamics over time](${B}blog/lif-dynamics.svg)

The discretisation matters more than people expect. The standard form decays the *previous* state and then adds the new input:

\`\`\`python
class LIFNeuron:
    """V[t] = beta * V[t-1] + I[t], fire when V >= threshold."""

    def __init__(self, threshold=1.0, beta=0.95, reset="subtract"):
        self.threshold = threshold
        self.beta = beta            # beta = exp(-dt / tau_m)
        self.reset = reset
        self.v = 0.0

    def step(self, input_current):
        # 1. Decay the existing potential, then integrate the new input.
        self.v = self.beta * self.v + input_current

        # 2. Fire if we crossed the threshold.
        spike = self.v >= self.threshold

        # 3. Reset. Subtracting the threshold preserves the overshoot,
        #    which loses less information than clamping to zero.
        if spike:
            if self.reset == "subtract":
                self.v -= self.threshold
            else:
                self.v = 0.0

        return spike
\`\`\`

Two details worth calling out, because getting them wrong is the most common way a hand-rolled SNN silently fails to be an SNN at all:

**Decay order.** If you write \`v += input\` and *then* \`v *= beta\`, you are decaying the current on the timestep it arrives, which is not the LIF equation. It will still train, badly, and you will spend a day wondering why.

**The reset is not optional.** Without it the potential stays above threshold once it gets there and the neuron fires on every subsequent timestep forever. A "LIF" implementation with no reset is not leaky, not integrate-and-fire, and not doing anything useful.

### Getting information in

Real-valued input has to become spikes somehow. The usual options:

1. **Rate coding.** Higher value, more spikes. Robust and simple, but it needs many timesteps to represent a value precisely, and timesteps are exactly what costs you.
2. **Latency coding.** Higher value, earlier spike. Far fewer spikes, much more sensitive to noise.
3. **Direct injection.** Feed the analogue value in as input current at every timestep and let the first layer do the encoding. In practice this trains best for vision tasks, and it is what most modern work uses.

Event-camera data is a special case: the sensor already emits asynchronous brightness-change events, so there is no encoding step in the usual sense. What you choose instead is a **representation**: how to bin events into timesteps, whether to use fixed time windows or fixed event counts, and whether to build event frames, voxel grids, or feed events in directly.

## Training: the non-differentiable problem

The forward pass contains a step function. Its derivative is zero everywhere it exists and undefined at the threshold, so gradients cannot flow. The standard fix is the **surrogate gradient**: keep the hard step in the forward pass, substitute a smooth function in the backward pass.

![Forward hard step versus smooth surrogate gradient in the backward pass](${B}blog/surrogate-gradient.svg)

\`\`\`python
import torch
import torch.nn as nn


class SurrogateSpike(torch.autograd.Function):
    """Heaviside forward, sigmoid-derivative backward."""

    @staticmethod
    def forward(ctx, v_minus_theta, k):
        ctx.save_for_backward(v_minus_theta)
        ctx.k = k
        return (v_minus_theta >= 0).float()

    @staticmethod
    def backward(ctx, grad_output):
        (v_minus_theta,) = ctx.saved_tensors
        k = ctx.k
        # Derivative of sigmoid(k * (V - theta)), peaked AT the threshold.
        sig = torch.sigmoid(k * v_minus_theta)
        return grad_output * k * sig * (1.0 - sig), None


class SpikingActivation(nn.Module):
    def __init__(self, threshold=1.0, k=10.0):
        super().__init__()
        self.threshold = threshold
        self.k = k  # surrogate steepness; 5-25 is the usual range

    def forward(self, v):
        return SurrogateSpike.apply(v - self.threshold, self.k)
\`\`\`

The argument is \`v - threshold\`, not \`v\`. This is worth being pedantic about because it is easy to get wrong and the failure is quiet. If you write \`torch.sigmoid(v)\` with a threshold of 1.0, the surrogate peaks at \`v = 0\`, which means the gradient is largest when the neuron is furthest from firing and smallest at the decision boundary. The network still trains. It just trains against a gradient pointing at the wrong place.

The steepness \`k\` is a real hyperparameter. Too flat and every neuron gets gradient regardless of whether it was close to firing; too sharp and you are back to a step function with vanishing gradients. Fast-sigmoid and arctan surrogates are common alternatives with slightly better-behaved tails.

### The other two options

**ANN-to-SNN conversion.** Train a normal network, then map ReLU activations onto firing rates. It reaches good accuracy without touching a surrogate gradient, but it needs a lot of timesteps to converge on the right rates, which makes it slow at inference.

**Local learning rules** such as STDP. Biologically motivated and genuinely online, but they do not currently reach competitive accuracy on anything non-trivial.

For most work today the answer is surrogate-gradient backpropagation through time. It is what the field runs on, and it is what the rest of this post assumes.

## What a forward pass actually looks like

![End-to-end spiking network pipeline unrolled over timesteps](${B}blog/snn-pipeline.svg)

Note what the diagram implies about cost. The network is unrolled T times, so a forward pass does roughly T times the work of an equivalent ANN, and backpropagation through time holds T timesteps of activations in memory. This is the fact that most introductions to SNNs quietly skip, and it shapes everything about when they are worth using.

## Honest advantages

### Energy efficiency, with a large asterisk

The usual claim is that SNNs are inherently more efficient because neurons only consume energy when they spike. That is true **on neuromorphic hardware**, where sparse activity maps directly onto skipped operations.

On a GPU or a Jetson it is generally false, and often backwards. A GPU executes dense matrix multiplications; a tensor of mostly zeros costs the same as a tensor of mostly non-zeros. Run that dense computation T times and an SNN is more expensive than the ANN you are comparing it to, not less.

So if you are deploying to conventional hardware, pick SNNs for their fit to the data, not for power. The energy argument is real but it is an argument about silicon.

### Temporal processing and event data

This is the advantage that survives on ordinary hardware. SNNs are a natural match for asynchronous, sparse, high-temporal-resolution input, which is exactly what event cameras produce. Neither the data nor the model has a notion of a frame, so nothing has to be forced into one.

### A note on biological plausibility

SNNs are frequently sold as the biologically realistic option. The neuron model is closer to biology than a ReLU, which is fair. But surrogate-gradient BPTT, the method that makes them work, requires weight transport, non-local credit assignment, and backpropagation through time, none of which the brain does.

You can have biological plausibility or you can have competitive accuracy. Current practice picks accuracy. That is a reasonable choice, but it is worth being clear-eyed that "trains with surrogate gradients" and "models the brain" are largely separate claims.

## Honest limitations

### There is a real accuracy gap

On standard vision benchmarks, deep SNNs land a few points behind comparable ANNs. Spiking ResNets reach roughly 95 to 96 percent on CIFAR-10, and current spiking architectures reach roughly 70 to 75 percent top-1 on ImageNet against 80 percent and up for comparable ANNs. The gap has narrowed considerably but it has not closed.

### Latency is a design constraint

Accuracy usually improves with more timesteps, and every timestep costs latency and memory. Choosing T is a genuine accuracy-versus-cost trade that has no equivalent in ANN work.

### Tooling is thinner

The ecosystem is small. Fewer pretrained backbones, fewer reference implementations, and far more opportunity to introduce a subtle bug in the neuron model itself, as the decay-order and reset problems above illustrate.

## Getting started

### Frameworks worth your time

1. **snnTorch.** PyTorch-native, surrogate gradients built in, the gentlest starting point. This is what I use.
2. **SpikingJelly.** PyTorch-based, faster CUDA kernels, more architectures, steeper learning curve.
3. **Norse.** PyTorch-based, cleaner functional API, good if you want to compose your own neuron models.
4. **Intel Lava.** The route to deploying on Loihi hardware rather than simulating on a GPU.

A note to save you time: **NEST** and **Brian2** come up constantly in search results, but they are computational-neuroscience simulators built for biophysical modelling. They are not gradient-based deep-learning tools and they are the wrong choice for this work. **SpyTorch** is a well-known tutorial repository on surrogate-gradient learning, worth reading, but it is not an installable package.

### A network that runs

\`\`\`python
import torch
import torch.nn as nn
import snntorch as snn
from snntorch import surrogate


class SimpleSNN(nn.Module):
    def __init__(self, input_size, hidden_size, output_size,
                 num_steps=25, beta=0.95):
        super().__init__()
        self.num_steps = num_steps
        spike_grad = surrogate.fast_sigmoid(slope=25)

        self.fc1 = nn.Linear(input_size, hidden_size)
        self.lif1 = snn.Leaky(beta=beta, spike_grad=spike_grad)
        self.fc2 = nn.Linear(hidden_size, output_size)
        self.lif2 = snn.Leaky(beta=beta, spike_grad=spike_grad)

    def forward(self, x):
        # Membrane state is initialised once per sample, not per timestep.
        mem1 = self.lif1.init_leaky()
        mem2 = self.lif2.init_leaky()
        spike_record = []

        for _ in range(self.num_steps):
            # Direct injection: feed the analogue input at every timestep
            # and let the first layer learn the encoding.
            cur1 = self.fc1(x)
            spk1, mem1 = self.lif1(cur1, mem1)

            cur2 = self.fc2(spk1)
            spk2, mem2 = self.lif2(cur2, mem2)

            spike_record.append(spk2)

        # [T, batch, classes] -- sum over T for a rate-coded readout.
        return torch.stack(spike_record)


model = SimpleSNN(784, 256, 10)
out = model(torch.rand(32, 784))     # [25, 32, 10]
logits = out.sum(dim=0)              # spike counts as class scores
\`\`\`

The state handling is the part to pay attention to. \`mem1\` and \`mem2\` are created once and threaded through the loop; if you reinitialise them inside the loop you have removed the only thing that made this a spiking network.

## Neuromorphic hardware

This is where the energy argument becomes true rather than aspirational.

- **Intel Loihi 2**, and the **Hala Point** system built from it, is the most accessible research platform, reachable through Lava.
- **IBM NorthPole** is the successor to the much-cited TrueNorth, which dates from 2014 and is no longer the state of the art.
- **SynSense Speck** integrates an event camera with a spiking processor on one chip, which is the most directly relevant option if you work on event-based vision.

The honest summary is that access remains the bottleneck. Most published SNN work, including mine, trains and evaluates on GPUs, which means most published efficiency claims are theoretical rather than measured.

## Where they make sense today

Reach for an SNN when the input is genuinely asynchronous and sparse, when you have event-based sensors, when latency matters more than peak accuracy, or when you have a path to neuromorphic silicon.

Do not reach for one because it sounds more brain-like. On static images, on conventional hardware, chasing benchmark numbers, a well-tuned CNN will beat it on accuracy, latency and power at the same time.

## Conclusion

SNNs are not a drop-in replacement for deep learning and the honest case for them is narrower than the enthusiasm suggests. But the narrow case is real. Event-based sensing produces data that conventional networks have to distort into frames before they can process it, and a model built around events rather than frames does not.

If you want to start: install snnTorch, implement LIF from scratch once so the decay and reset are in your fingers, then use the library version. Get the surrogate centred on the threshold. Everything after that is ordinary deep learning with an extra loop.

---

*Written from hands-on work with event-based vision and spiking architectures. Corrections welcome.*
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