"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar, NavTab } from "@/components/Sidebar";
import { MetricCard } from "@/components/MetricCard";
import { AgentCard } from "@/components/AgentCard";
import { SwarmCard } from "@/components/SwarmCard";
import { ThoughtStreamConsole } from "@/components/ThoughtStreamConsole";
import { TraceInspector } from "@/components/TraceInspector";
import { DeployAgentModal } from "@/components/DeployAgentModal";
import { 
  initialMetrics, 
  mockAgents, 
  mockSwarms, 
  mockLogs 
} from "@/mockData";
import { Agent, Swarm, LogEntry } from "@/types/nexus";
import { 
  Plus, 
  Search, 
  Filter, 
  Layers, 
  Terminal, 
  Sparkles, 
  Radio, 
  Cpu, 
  Workflow, 
  Database,
  ArrowUpRight
} from "lucide-react";

export default function NexusDashboard() {
  const [currentTab, setCurrentTab] = useState<NavTab>("overview");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeCluster, setActiveCluster] = useState("prod-us-east-1");
  const [agents, setAgents] = useState<Agent[]>(mockAgents);
  const [swarms, setSwarms] = useState<Swarm[]>(mockSwarms);
  const [logs, setLogs] = useState<LogEntry[]>(mockLogs);
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(mockLogs[0]);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);

  // Filters
  const [swarmFilter, setSwarmFilter] = useState("ALL");
  const [agentFilter, setAgentFilter] = useState("ALL");

  const handleToggleAgentStatus = (id: string) => {
    setAgents(
      agents.map((a) => {
        if (a.id === id) {
          const nextStatus = a.status === "RUNNING" ? "PAUSED" : "RUNNING";
          return { ...a, status: nextStatus };
        }
        return a;
      })
    );
  };

  const handleToggleSwarmStatus = (swarmId: string) => {
    setSwarms(
      swarms.map((s) => {
        if (s.id === swarmId) {
          const nextStatus = s.status === "PAUSED" ? "NOMINAL" : "PAUSED";
          return { ...s, status: nextStatus };
        }
        return s;
      })
    );
  };

  const handleDeployAgent = (newAgent: Agent) => {
    setAgents([newAgent, ...agents]);
  };

  const handleOpenTerminal = (agent: Agent) => {
    setCurrentTab("logs");
    const agentLog = logs.find((l) => l.agentId === agent.id);
    if (agentLog) setSelectedLog(agentLog);
  };

  const handleScaleSwarm = (swarm: Swarm) => {
    setSwarms(
      swarms.map((s) => {
        if (s.id === swarm.id) {
          return { ...s, agentsCount: s.agentsCount + 1 };
        }
        return s;
      })
    );
  };

  // Filtered views
  const filteredSwarms = swarms.filter((s) => {
    if (swarmFilter === "ALL") return true;
    return s.category === swarmFilter;
  });

  const filteredAgents = agents.filter((a) => {
    if (agentFilter === "ALL") return true;
    return a.status === agentFilter;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0d14] text-[#e1e2ec] font-sans antialiased">
      {/* Top Command Header */}
      <Header
        onOpenDeployModal={() => setIsDeployModalOpen(true)}
        activeCluster={activeCluster}
        setActiveCluster={setActiveCluster}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Persistent Collapsible Sidebar */}
        <Sidebar
          currentTab={currentTab}
          onTabChange={setCurrentTab}
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
        />

        {/* Main Operational Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* TAB 1: OVERVIEW DASHBOARD */}
          {currentTab === "overview" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Header Welcome Ribbon */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-violet-950/40 via-[#111726]/80 to-cyan-950/30 border border-white/[0.08] backdrop-blur-xl">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                      LIVE CLUSTERS: 4
                    </span>
                    <span className="text-xs text-gray-400 font-mono">
                      Last synchronized: Just now (WebSocket)
                    </span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                    Autonomous Swarm Orchestration
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-300 mt-0.5">
                    Real-time monitoring, inter-agent consensus, and automated token economics across distributed nodes.
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => setCurrentTab("swarms")}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-gray-200 border border-white/10 transition-colors"
                  >
                    <Layers className="w-3.5 h-3.5 text-violet-400" />
                    <span>View All Swarms (18)</span>
                  </button>
                  <button
                    onClick={() => setIsDeployModalOpen(true)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white text-xs font-mono font-bold shadow-glow-violet transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Deploy Agent</span>
                  </button>
                </div>
              </div>

              {/* 1. Executive Telemetry Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {initialMetrics.map((metric) => (
                  <MetricCard key={metric.id} metric={metric} />
                ))}
              </div>

              {/* 2. Active Autonomous Agents Grid */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-white font-sans tracking-tight">
                      Active Autonomous Agents
                    </h2>
                    <span className="px-2 py-0.5 rounded text-xs font-mono bg-violet-500/20 text-violet-300 border border-violet-500/30 font-semibold">
                      {agents.length} Nodes
                    </span>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-mono">
                    {["ALL", "RUNNING", "PAUSED", "MONITORING"].map((status) => (
                      <button
                        key={status}
                        onClick={() => setAgentFilter(status)}
                        className={`px-2.5 py-1 rounded-lg transition-colors ${
                          agentFilter === status
                            ? "bg-violet-600/30 text-cyan-300 border border-violet-500/40 font-bold"
                            : "bg-white/[0.04] text-gray-400 hover:text-white border border-white/5"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                  {filteredAgents.map((agent) => (
                    <AgentCard
                      key={agent.id}
                      agent={agent}
                      onToggleStatus={handleToggleAgentStatus}
                      onOpenTerminal={handleOpenTerminal}
                    />
                  ))}
                </div>
              </div>

              {/* 3. Live Thought Stream & Activity Console */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-cyan-400" />
                    <h2 className="text-base font-bold text-white tracking-tight">
                      Live Telemetry & Reasoning Stream
                    </h2>
                  </div>
                  <button
                    onClick={() => setCurrentTab("logs")}
                    className="flex items-center gap-1 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <span>Full Log Inspector</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <ThoughtStreamConsole
                  logs={logs}
                  onSelectLog={(log) => {
                    setSelectedLog(log);
                    setCurrentTab("logs");
                  }}
                  selectedLogId={selectedLog?.id}
                />
              </div>
            </div>
          )}

          {/* TAB 2: AGENT SWARMS ORCHESTRATION */}
          {currentTab === "swarms" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-violet-400 font-bold uppercase tracking-wider">
                      Fleet Cluster Management
                    </span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                    Agent Swarms & Fleet Clusters
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-300">
                    Distributed multi-agent orchestration, consensus routing, and inter-agent communication matrices.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsDeployModalOpen(true)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white text-xs font-mono font-bold shadow-glow-violet transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Create New Swarm</span>
                  </button>
                </div>
              </div>

              {/* Status Chips Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-lg bg-[#141b2d]/80 border border-white/[0.08] font-mono">
                  <span className="text-[10px] text-gray-400 uppercase block">Active Swarms</span>
                  <span className="text-lg font-bold text-white">{swarms.length} Swarms</span>
                </div>
                <div className="p-3 rounded-lg bg-[#141b2d]/80 border border-white/[0.08] font-mono">
                  <span className="text-[10px] text-gray-400 uppercase block">Deployed Nodes</span>
                  <span className="text-lg font-bold text-cyan-400">42 Nodes</span>
                </div>
                <div className="p-3 rounded-lg bg-[#141b2d]/80 border border-white/[0.08] font-mono">
                  <span className="text-[10px] text-gray-400 uppercase block">Deadlocks Detected</span>
                  <span className="text-lg font-bold text-emerald-400">0 Deadlocks</span>
                </div>
                <div className="p-3 rounded-lg bg-[#141b2d]/80 border border-white/[0.08] font-mono">
                  <span className="text-[10px] text-gray-400 uppercase block">Consensus Efficiency</span>
                  <span className="text-lg font-bold text-violet-400">99.4%</span>
                </div>
              </div>

              {/* Category Segmented Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono">
                {[
                  { id: "ALL", label: "All Swarms" },
                  { id: "Multi-Agent Reasoning", label: "Multi-Agent Reasoning" },
                  { id: "DevSecOps", label: "DevSecOps" },
                  { id: "Data Extraction", label: "Data Extraction" },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSwarmFilter(cat.id)}
                    className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                      swarmFilter === cat.id
                        ? "bg-violet-600/30 text-cyan-300 border border-violet-500/40 font-bold"
                        : "bg-white/[0.04] text-gray-400 hover:text-white border border-white/5"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Swarm Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredSwarms.map((swarm) => (
                  <SwarmCard
                    key={swarm.id}
                    swarm={swarm}
                    onScale={handleScaleSwarm}
                    onToggleStatus={handleToggleSwarmStatus}
                  />
                ))}
              </div>

              {/* Inter-Agent Communication Matrix & Routing */}
              <div className="p-5 rounded-xl bg-[#0c101a] border border-white/[0.08]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Workflow className="w-4 h-4 text-violet-400" />
                    <h3 className="text-sm font-bold text-white font-sans">
                      Live Inter-Agent Message Routing & Consensus Quorum
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-cyan-400">
                    Throughput: 480 msgs/sec • 12ms ACK
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 font-mono text-xs">
                  <div className="p-3 rounded-lg bg-[#111726]/60 border border-white/5 space-y-2">
                    <span className="text-[10px] text-gray-400 uppercase font-semibold block">
                      Lead Dispatchers
                    </span>
                    <div className="p-2 rounded bg-white/5 text-violet-300">Master-Planner-v4</div>
                    <div className="p-2 rounded bg-white/5 text-violet-300">Sentinel-Director</div>
                    <div className="p-2 rounded bg-white/5 text-violet-300">CodeSynth-Master</div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#111726]/60 border border-white/5 flex flex-col justify-center items-center text-center space-y-2">
                    <span className="text-[10px] text-gray-400 uppercase font-semibold">
                      Consensus Bus (Raft / JSON-RPC)
                    </span>
                    <div className="w-full py-2 px-3 rounded-lg bg-violet-950/40 border border-violet-500/30 text-cyan-300 animate-pulse">
                      ⚡ [STATE_SYNC] ↔ [CONSENSUS_VOTE]
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold">5/5 Quorum Verified</span>
                  </div>

                  <div className="p-3 rounded-lg bg-[#111726]/60 border border-white/5 space-y-2">
                    <span className="text-[10px] text-gray-400 uppercase font-semibold block">
                      Subagent Executors
                    </span>
                    <div className="p-2 rounded bg-white/5 text-cyan-300">MarketScout-1</div>
                    <div className="p-2 rounded bg-white/5 text-cyan-300">SentimentAnalyzer</div>
                    <div className="p-2 rounded bg-white/5 text-cyan-300">Synthesizer-X</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: EXECUTION LOGS & DEEP TRACE INSPECTOR */}
          {currentTab === "logs" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                      STREAMING • 1,240 events/sec
                    </span>
                    <span className="text-xs text-gray-400 font-mono">WebSocket: 14ms</span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                    Execution Logs & Neural Reasoning Traces
                  </h1>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const newLog: LogEntry = {
                        id: `tr-${Math.floor(100000 + Math.random() * 900000)}`,
                        timestamp: new Date().toLocaleTimeString() + ".012",
                        agentId: "DS-892",
                        agentName: "DataScout-4",
                        eventType: "THOUGHT",
                        summary: "Evaluated dynamic pricing matrix arbitrage across vendor nodes.",
                        durationMs: 240,
                        cost: "$0.0012",
                        confidence: 97.4,
                      };
                      setLogs([newLog, ...logs]);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-gray-300 border border-white/10 transition-colors"
                  >
                    + Simulate Event
                  </button>
                </div>
              </div>

              {/* Dual-Pane Layout: Left Stream, Right Deep Inspector */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[600px]">
                {/* Left Stream Pane (5 cols) */}
                <div className="lg:col-span-6">
                  <ThoughtStreamConsole
                    logs={logs}
                    onSelectLog={(log) => setSelectedLog(log)}
                    selectedLogId={selectedLog?.id}
                  />
                </div>

                {/* Right Inspector Pane (6 cols) */}
                <div className="lg:col-span-6">
                  <TraceInspector log={selectedLog} />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: WORKFLOW STUDIO */}
          {currentTab === "studio" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="pb-4 border-b border-white/[0.08]">
                <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  Visual Workflow Studio & DAG Canvas
                </h1>
                <p className="text-xs sm:text-sm text-gray-300 mt-1">
                  Design, simulate, and deploy multi-agent computational graphs with branching logic and human-in-the-loop gates.
                </p>
              </div>

              <div className="h-[480px] rounded-xl bg-[#0c101a] border border-white/[0.08] relative overflow-hidden flex items-center justify-center">
                {/* Background grid */}
                <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>

                <div className="relative z-10 flex flex-col items-center text-center p-6 max-w-md">
                  <div className="p-3 rounded-2xl bg-violet-600/20 text-violet-400 border border-violet-500/30 mb-3 shadow-glow-violet">
                    <Workflow className="w-8 h-8" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">
                    Visual DAG Flow Engine
                  </h3>
                  <p className="text-xs text-gray-400 font-mono mb-4">
                    Drag-and-drop agent nodes, configure tool pipelines, and verify acyclic graph dependencies.
                  </p>
                  <button
                    onClick={() => setCurrentTab("swarms")}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-xs font-mono font-bold shadow-glow-violet"
                  >
                    Inspect Active Swarm Graphs
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: INTEGRATIONS */}
          {currentTab === "integrations" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="pb-4 border-b border-white/[0.08]">
                <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  Tool & Cluster Integrations
                </h1>
                <p className="text-xs sm:text-sm text-gray-300 mt-1">
                  Connect vector databases, headless browsers, LLM endpoints, and enterprise authorization providers.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: "Milvus / Pinecone Vector Store", status: "Connected", desc: "Index embeddings for semantic retrieval & RAG." },
                  { name: "Puppeteer / Playwright Headless", status: "Active (12 Workers)", desc: "Autonomous DOM extraction and browser tooling." },
                  { name: "Kubernetes Audit & eBPF", status: "Active (prod-us-east)", desc: "Zero-day telemetry and runtime inspection." },
                  { name: "GitHub & Terraform Sync", status: "Authorized", desc: "Automated PR synthesizers & infrastructure remediation." },
                  { name: "Salesforce & Clearbit API", status: "Rate Limited (2m)", desc: "Lead enrichment and CRM state updates." },
                  { name: "Anthropic & OpenAI SDK", status: "Latency 180ms", desc: "Foundational LLM routing with fallback failover." },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#141b2d]/80 border border-white/[0.08]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-white">{item.name}</span>
                      <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                        {item.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: ANALYTICS & COSTS */}
          {currentTab === "analytics" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="pb-4 border-b border-white/[0.08]">
                <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  Token Economics & Compute Allocation
                </h1>
                <p className="text-xs sm:text-sm text-gray-300 mt-1">
                  Granular cost attribution per agent, token burn rates, and GPU efficiency profiling.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 font-mono">
                <div className="p-5 rounded-xl bg-[#141b2d]/80 border border-white/[0.08]">
                  <span className="text-xs text-gray-400 uppercase block mb-1">Today's Token Burn</span>
                  <span className="text-2xl font-bold text-white">4,210,892</span>
                  <span className="text-xs text-cyan-400 block mt-1">Estimated Cost: $124.50</span>
                </div>
                <div className="p-5 rounded-xl bg-[#141b2d]/80 border border-white/[0.08]">
                  <span className="text-xs text-gray-400 uppercase block mb-1">Cost Per Successful Task</span>
                  <span className="text-2xl font-bold text-emerald-400">$0.067</span>
                  <span className="text-xs text-gray-400 block mt-1">-18% vs last month</span>
                </div>
                <div className="p-5 rounded-xl bg-[#141b2d]/80 border border-white/[0.08]">
                  <span className="text-xs text-gray-400 uppercase block mb-1">Active GPU Allocation</span>
                  <span className="text-2xl font-bold text-violet-400">32 H100 SXM5</span>
                  <span className="text-xs text-gray-400 block mt-1">Load Factor: 76%</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: SETTINGS */}
          {currentTab === "settings" && (
            <div className="space-y-6 animate-in fade-in duration-300 max-w-3xl">
              <div className="pb-4 border-b border-white/[0.08]">
                <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  Platform & Security Settings
                </h1>
                <p className="text-xs sm:text-sm text-gray-300 mt-1">
                  Manage cluster boundaries, zero-trust policies, and API keys.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#141b2d]/80 border border-white/[0.08] flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">Zero-Trust Agent Isolation</h4>
                    <p className="text-xs text-gray-400">Enforce gVisor and eBPF syscall containment on all headless tools.</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                    ENFORCED
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#141b2d]/80 border border-white/[0.08] flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">Autonomous Kill Switch Quorum</h4>
                    <p className="text-xs text-gray-400">Require multi-operator signatures to terminate active swarms.</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold">
                    ENABLED
                  </span>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Deploy Agent Modal */}
      <DeployAgentModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
        onDeploy={handleDeployAgent}
      />
    </div>
  );
}
