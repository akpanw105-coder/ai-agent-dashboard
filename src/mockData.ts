import { Metric, Agent, Swarm, LogEntry } from "./types/nexus";

export const initialMetrics: Metric[] = [
  {
    id: "active-swarms",
    label: "Active Swarms",
    value: "18",
    subValue: "42 Nodes Running",
    change: "+14% vs yesterday",
    isPositive: true,
    type: "swarms",
  },
  {
    id: "token-consumption",
    label: "Total Token Consumption",
    value: "4.2M",
    subValue: "3,420 tokens/sec • $124.50",
    change: "-4.2% cost eff.",
    isPositive: true,
    type: "tokens",
  },
  {
    id: "execution-rate",
    label: "Success Execution Rate",
    value: "99.4%",
    subValue: "1,842 completed • 11 retried",
    change: "+0.2% reliability",
    isPositive: true,
    type: "success",
  },
  {
    id: "mean-latency",
    label: "Mean Swarm Latency",
    value: "480ms",
    subValue: "P95: 820ms • TTFT: 120ms",
    change: "-45ms faster",
    isPositive: true,
    type: "latency",
  },
];

export const mockAgents: Agent[] = [
  {
    id: "DS-892",
    name: "DataScout-4",
    role: "Market Intelligence",
    status: "RUNNING",
    task: "Realtime Competitor Pricing Matrix",
    subtask: "Parsing dynamic headless DOM tree (Amazon, Walmart, Target)",
    progress: 78,
    cpu: 42,
    ram: "1.4GB / 4GB",
    latency: 310,
    cluster: "prod-us-east-1",
    tools: ["Headless Browser", "SerpAPI", "Vector DB"],
  },
  {
    id: "LE-104",
    name: "LeadEnrich-Alpha",
    role: "Sales Automation",
    status: "PAUSED",
    task: "CRM Batch Enrichment (Salesforce Sync)",
    subtask: "Waiting for API rate-limit window reset (02:14 remaining)",
    progress: 100,
    cpu: 4,
    ram: "512MB / 2GB",
    latency: 0,
    cluster: "prod-us-east-1",
    tools: ["Salesforce API", "Clearbit", "Email Verifier"],
  },
  {
    id: "SS-771",
    name: "Sentinel-Sec",
    role: "Security & Compliance",
    status: "MONITORING",
    task: "Zero-Day Log Triage & Anomaly Interception",
    subtask: "Analyzing Kubernetes audit stream (Vector-7 node probes)",
    progress: 99,
    cpu: 18,
    ram: "890MB / 4GB",
    latency: 45,
    cluster: "prod-us-west-2",
    tools: ["K8s Audit Stream", "eBPF Probe", "CVE-DB"],
  },
  {
    id: "CS-419",
    name: "CodeSynth-Beta",
    role: "DevOps Synthesis",
    status: "RUNNING",
    task: "Terraform Drift Auto-Remediation",
    subtask: "Generating PR #1042 for cross-region VPC Peering mesh",
    progress: 54,
    cpu: 68,
    ram: "2.1GB / 8GB",
    latency: 540,
    cluster: "staging-eu-central",
    tools: ["GitHub API", "Terraform CLI", "SonarQube"],
  },
];

export const mockSwarms: Swarm[] = [
  {
    id: "swarm-alpha",
    name: "Alpha-Intelligence-Swarm",
    category: "Multi-Agent Reasoning",
    status: "NOMINAL",
    coordinator: "Master Planner Agent (Orchestrator-v4)",
    agentsCount: 5,
    subagents: ["MarketScout-1", "WebCrawler-9", "SentimentAnalyzer", "Synthesizer-X", "Validator-3"],
    tools: ["Headless Browser", "Vector DB", "Python Sandbox", "SerpAPI"],
    mission: "Continuous Multi-Vendor Price Arbitrage & Sentiment Convergence",
    throughput: 142,
    tokenBurn: "128k tokens/hr ($3.84/hr)",
    latencyP95: 320,
    consensusEfficiency: "99.4%",
  },
  {
    id: "swarm-sec",
    name: "Security-Guardians",
    category: "DevSecOps",
    status: "NOMINAL",
    coordinator: "Sentinel-Director (Zero-Trust Core)",
    agentsCount: 4,
    subagents: ["PenTest-Alpha", "AuditStream-02", "VulnScanner", "PolicyEnforcer"],
    tools: ["K8s Audit Stream", "AWS GuardDuty", "eBPF Probe", "CVE-DB"],
    mission: "Real-time Zero-Day Infiltration Defense & K8s Runtime Remediation",
    throughput: 890,
    tokenBurn: "84k tokens/hr ($2.52/hr)",
    latencyP95: 42,
    consensusEfficiency: "100%",
  },
  {
    id: "swarm-devops",
    name: "Auto-DevOps-Pipeline",
    category: "DevSecOps",
    status: "ACTIVE BUSY",
    coordinator: "CodeSynth-Master (PR Dispatcher)",
    agentsCount: 6,
    subagents: ["TerraformSynthesizer", "LintBot", "UnitTester", "DiffAnalyzer", "SecurityChecker", "PRReviewer"],
    tools: ["GitHub API", "Terraform CLI", "Docker Daemon", "SonarQube"],
    mission: "Automated Microservice Refactor & PR Drift Synthesis (PR #1042)",
    throughput: 48,
    tokenBurn: "310k tokens/hr ($9.30/hr)",
    latencyP95: 640,
    consensusEfficiency: "98.8%",
  },
  {
    id: "swarm-scout",
    name: "Nexus-DataScout-Cluster",
    category: "Data Extraction",
    status: "NOMINAL",
    coordinator: "Scout-Prime (DOM Graph Traversal)",
    agentsCount: 8,
    subagents: ["Dynamic DOM Parser", "Anti-Bot Bypass", "JSON Normalizer", "Schema Validator", "ProxyPool Manager"],
    tools: ["Puppeteer Headless", "Residential Proxies", "Redis Buffer"],
    mission: "Streaming 14 Enterprise SaaS Portals Competitor Telemetry",
    throughput: 1240,
    tokenBurn: "195k tokens/hr ($5.85/hr)",
    latencyP95: 180,
    consensusEfficiency: "99.9%",
  },
];

export const mockLogs: LogEntry[] = [
  {
    id: "tr-892401-ds4",
    timestamp: "14:02:19.412",
    agentId: "DS-892",
    agentName: "DataScout-4",
    eventType: "THOUGHT",
    summary: "Evaluating price disparity on SKU-8941 across 3 vendor nodes... confidence score 94.2%",
    durationMs: 412,
    cost: "$0.0034",
    confidence: 96.8,
    fullThought: [
      "1. Ingested raw price metadata for SKU-8941 across Amazon ($42.99), Walmart ($39.95), and Target ($44.00).",
      "2. Detected 7.1% arbitrage opportunity favoring automated supply re-route via API dispatch.",
      "3. Evaluated historic demand elasticity: high velocity clearance predicted with 94.2% statistical confidence.",
      "4. Formulating payload dispatch for LeadEnrich and Procurement swarms."
    ],
    contextTokens: {
      system: 820,
      history: 4120,
      tools: 1200,
      total: 6140,
      limit: 128000,
    },
    toolDetails: {
      name: "browser_navigate",
      args: {
        target: "https://vendor-api.internal/pricing/sku-8941",
        headers: { Authorization: "Bearer ***REDACTED***" },
        timeout_ms: 1200,
      },
      response: {
        status: 200,
        sku: "SKU-8941",
        quote_valid_until: "2026-10-04T15:00:00Z",
        in_stock: true,
        best_price: 39.95
      }
    },
    performance: {
      networkMs: 42,
      inferenceMs: 380,
      toolMs: 110,
      totalMs: 532,
    }
  },
  {
    id: "tr-892400-ds4",
    timestamp: "14:02:18.980",
    agentId: "DS-892",
    agentName: "DataScout-4",
    eventType: "TOOL_CALL",
    summary: "browser_navigate(target=\"https://vendor-api.internal/pricing\")",
    durationMs: 184,
    cost: "$0.0008",
    confidence: 99.1,
    fullThought: [
      "Executing HTTP request pipeline to vendor inventory service.",
      "Validating SSL certificates and token rate quotas."
    ],
    contextTokens: {
      system: 820,
      history: 3200,
      tools: 1200,
      total: 5220,
      limit: 128000,
    },
    toolDetails: {
      name: "browser_navigate",
      args: {
        target: "https://vendor-api.internal/pricing",
        method: "GET"
      },
      response: {
        status: 200,
        latency_ms: 184
      }
    },
    performance: {
      networkMs: 34,
      inferenceMs: 120,
      toolMs: 30,
      totalMs: 184,
    }
  },
  {
    id: "tr-892398-ss7",
    timestamp: "14:02:17.310",
    agentId: "SS-771",
    agentName: "Sentinel-Sec",
    eventType: "VECTOR_SEARCH",
    summary: "Query: CVE-2024-8172 signature pattern in milvus_k8s_index (top_k=5)",
    durationMs: 62,
    cost: "$0.0002",
    confidence: 98.4,
    fullThought: [
      "Extracted anomalous syscall sequence from ingress pod vector-7.",
      "Embedded sequence into 1536-dim vector via text-embedding-3-small.",
      "Queried known vulnerability vector store: no zero-day match, classified as benign telemetry drift."
    ],
    contextTokens: {
      system: 650,
      history: 1800,
      tools: 800,
      total: 3250,
      limit: 128000,
    },
    toolDetails: {
      name: "vector_similarity_search",
      args: {
        collection: "milvus_k8s_index",
        top_k: 5,
        metric: "COSINE"
      },
      response: {
        matches: 5,
        top_score: 0.71,
        verdict: "BENIGN"
      }
    },
    performance: {
      networkMs: 12,
      inferenceMs: 35,
      toolMs: 15,
      totalMs: 62,
    }
  },
  {
    id: "tr-892395-cs4",
    timestamp: "14:02:15.104",
    agentId: "CS-419",
    agentName: "CodeSynth-Beta",
    eventType: "TOOL_CALL",
    summary: "github_create_pr(repo=\"nexus/infra-mesh\", branch=\"fix/vpc-peer\")",
    durationMs: 310,
    cost: "$0.0019",
    confidence: 97.2,
    fullThought: [
      "Synthesized HCL terraform configuration for multi-region VPC peering.",
      "Ran tf validate and local lint tests: 0 warnings.",
      "Initiated automated Pull Request with description and dependency graph."
    ],
    contextTokens: {
      system: 1100,
      history: 6400,
      tools: 2400,
      total: 9900,
      limit: 128000,
    },
    toolDetails: {
      name: "github_create_pr",
      args: {
        repo: "nexus/infra-mesh",
        branch: "fix/vpc-peer",
        title: "fix(network): automated terraform VPC peering sync",
        draft: false
      },
      response: {
        pr_number: 1042,
        url: "https://github.com/nexus/infra-mesh/pull/1042",
        status: "OPEN"
      }
    },
    performance: {
      networkMs: 58,
      inferenceMs: 210,
      toolMs: 42,
      totalMs: 310,
    }
  },
  {
    id: "tr-892391-mp1",
    timestamp: "14:02:14.008",
    agentId: "MP-001",
    agentName: "Master-Planner-v4",
    eventType: "DAG_DISPATCH",
    summary: "Subagent quorum 5/5 validated. Delegating sentiment cluster analysis.",
    durationMs: 95,
    cost: "$0.0011",
    confidence: 99.8,
    fullThought: [
      "Checked Raft consensus quorum across Alpha-Intelligence-Swarm.",
      "Quorum verified with 5 healthy active subagents.",
      "Emitted state sync packet to WebSocket ledger."
    ],
    contextTokens: {
      system: 500,
      history: 2100,
      tools: 900,
      total: 3500,
      limit: 128000,
    },
    toolDetails: {
      name: "dag_broadcast",
      args: {
        swarm_id: "swarm-alpha",
        action: "DELEGATE_TASK",
        nodes: 5
      },
      response: {
        ack_count: 5,
        quorum_reached: true
      }
    },
    performance: {
      networkMs: 20,
      inferenceMs: 60,
      toolMs: 15,
      totalMs: 95,
    }
  }
];
