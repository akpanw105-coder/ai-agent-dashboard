export interface Metric {
  id: string;
  label: string;
  value: string;
  subValue?: string;
  change: string;
  isPositive: boolean;
  type?: "swarms" | "tokens" | "success" | "latency";
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  status: "RUNNING" | "PAUSED" | "MONITORING" | "ERROR";
  task: string;
  subtask: string;
  progress: number;
  cpu: number;
  ram: string;
  latency: number;
  cluster: string;
  tools: string[];
}

export interface Swarm {
  id: string;
  name: string;
  category: "Multi-Agent Reasoning" | "Data Extraction" | "DevSecOps" | "Customer Ops";
  status: "NOMINAL" | "ACTIVE BUSY" | "PAUSED" | "WARNING";
  coordinator: string;
  agentsCount: number;
  subagents: string[];
  tools: string[];
  mission: string;
  throughput: number;
  tokenBurn: string;
  latencyP95: number;
  consensusEfficiency: string;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  agentId: string;
  agentName: string;
  eventType: "THOUGHT" | "TOOL_CALL" | "VECTOR_SEARCH" | "OUTPUT" | "ERROR" | "DAG_DISPATCH";
  summary: string;
  durationMs: number;
  cost: string;
  confidence?: number;
  fullThought?: string[];
  contextTokens?: {
    system: number;
    history: number;
    tools: number;
    total: number;
    limit: number;
  };
  toolDetails?: {
    name: string;
    args: Record<string, any>;
    response: Record<string, any>;
  };
  performance?: {
    networkMs: number;
    inferenceMs: number;
    toolMs: number;
    totalMs: number;
  };
}
