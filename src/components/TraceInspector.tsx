"use client";

import React, { useState } from "react";
import { LogEntry } from "../types/nexus";
import { 
  Sparkles, 
  Copy, 
  Check, 
  Clock, 
  Coins, 
  Layers, 
  Workflow, 
  Database, 
  Code2, 
  Gauge, 
  ChevronRight,
  ShieldAlert
} from "lucide-react";

interface TraceInspectorProps {
  log: LogEntry | null;
}

export const TraceInspector: React.FC<TraceInspectorProps> = ({ log }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"reasoning" | "context" | "payload" | "waterfall">("reasoning");

  if (!log) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 rounded-xl bg-[#0c101a] border border-white/[0.08] text-center text-gray-500 font-mono text-xs">
        <Sparkles className="w-8 h-8 text-gray-600 mb-2 animate-pulse" />
        <p>Select a log event from the stream to inspect neural reasoning traces, token memory, and function payloads.</p>
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(log, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full rounded-xl bg-[#0c101a] border border-white/[0.08] overflow-hidden shadow-2xl backdrop-blur-2xl">
      {/* Top Inspector Bar */}
      <div className="p-4 bg-[#111726]/90 border-b border-white/[0.08]">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-gray-400">Trace ID:</span>
            <span className="px-2 py-0.5 rounded text-xs font-mono font-bold text-violet-300 bg-violet-950/40 border border-violet-500/30">
              {log.id}
            </span>
            <button
              onClick={handleCopy}
              className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              title="Copy Trace JSON"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              SUCCESS 200 OK
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs font-mono text-gray-400">
          <div>
            <span>Agent: </span>
            <span className="text-white font-semibold">{log.agentName}</span>
          </div>
          <div className="flex items-center gap-3">
            <span>Latency: <strong className="text-cyan-400">{log.durationMs}ms</strong></span>
            <span>Cost: <strong className="text-emerald-400">{log.cost}</strong></span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 mt-4 pt-3 border-t border-white/[0.06] text-xs font-mono">
          <button
            onClick={() => setActiveTab("reasoning")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "reasoning"
                ? "bg-violet-600/30 text-violet-300 border border-violet-500/40 font-bold"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            Neural Reasoning
          </button>
          <button
            onClick={() => setActiveTab("context")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "context"
                ? "bg-violet-600/30 text-violet-300 border border-violet-500/40 font-bold"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            Context Tokens
          </button>
          <button
            onClick={() => setActiveTab("payload")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "payload"
                ? "bg-violet-600/30 text-violet-300 border border-violet-500/40 font-bold"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            Tool Payload
          </button>
          <button
            onClick={() => setActiveTab("waterfall")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "waterfall"
                ? "bg-violet-600/30 text-violet-300 border border-violet-500/40 font-bold"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            Waterfall
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      <div className="p-4 flex-1 overflow-y-auto space-y-4 font-mono text-xs select-text">
        {/* TAB 1: Reasoning Chain */}
        {activeTab === "reasoning" && (
          <div className="space-y-4">
            {log.confidence && (
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
                <span className="text-emerald-300 font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  Cognitive Reasoning Confidence
                </span>
                <span className="text-sm font-bold text-emerald-400">{log.confidence}%</span>
              </div>
            )}

            <div>
              <span className="text-[11px] uppercase tracking-wider text-gray-400 block mb-2 font-semibold">
                Step-by-step cognitive deductions:
              </span>
              <div className="space-y-2">
                {log.fullThought && log.fullThought.length > 0 ? (
                  log.fullThought.map((thought, idx) => (
                    <div 
                      key={idx} 
                      className="p-3 rounded-lg bg-[#141b2d]/80 border border-white/[0.05] text-gray-200 leading-relaxed"
                    >
                      {thought}
                    </div>
                  ))
                ) : (
                  <div className="p-3 rounded-lg bg-[#141b2d]/80 border border-white/[0.05] text-gray-300">
                    {log.summary}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Context Window & Tokens */}
        {activeTab === "context" && (
          <div className="space-y-4">
            {log.contextTokens ? (
              <>
                <div className="p-4 rounded-lg bg-[#141b2d]/80 border border-white/[0.08]">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-gray-300 font-bold">Context Window Utilization</span>
                    <span className="text-cyan-400 font-bold">
                      {log.contextTokens.total.toLocaleString()} / {log.contextTokens.limit.toLocaleString()} tokens
                    </span>
                  </div>
                  {/* Segmented bar */}
                  <div className="w-full bg-[#0a0d14] rounded-full h-3 flex overflow-hidden border border-white/10">
                    <div 
                      style={{ width: `${(log.contextTokens.system / log.contextTokens.total) * 100}%` }} 
                      className="bg-violet-500" 
                      title={`System: ${log.contextTokens.system} tokens`}
                    ></div>
                    <div 
                      style={{ width: `${(log.contextTokens.history / log.contextTokens.total) * 100}%` }} 
                      className="bg-cyan-500" 
                      title={`History: ${log.contextTokens.history} tokens`}
                    ></div>
                    <div 
                      style={{ width: `${(log.contextTokens.tools / log.contextTokens.total) * 100}%` }} 
                      className="bg-emerald-500" 
                      title={`Tools: ${log.contextTokens.tools} tokens`}
                    ></div>
                  </div>
                  {/* Legend */}
                  <div className="flex items-center gap-4 mt-3 text-[11px] text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-violet-500"></span>
                      System ({log.contextTokens.system})
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                      History ({log.contextTokens.history})
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      Tools ({log.contextTokens.tools})
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#111726] border border-white/5">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">
                    System Instructions Active
                  </span>
                  <p className="text-gray-300 text-xs leading-relaxed font-mono">
                    You are NexusAI Operator Autonomous Agent Node {log.agentId}. Follow zero-trust constraint policies, optimize for deterministic consensus, and maintain strict token economy boundaries.
                  </p>
                </div>
              </>
            ) : (
              <div className="text-gray-500">No token breakdown recorded for this event span.</div>
            )}
          </div>
        )}

        {/* TAB 3: Tool Payload */}
        {activeTab === "payload" && (
          <div className="space-y-4">
            {log.toolDetails ? (
              <>
                <div>
                  <span className="text-[11px] text-gray-400 font-bold block mb-1.5">
                    Function Invoked: <code className="text-cyan-300">{log.toolDetails.name}</code>
                  </span>
                  <div className="p-3 rounded-lg bg-[#080b12] border border-white/10 text-gray-200 overflow-x-auto">
                    <span className="text-[10px] text-gray-500 uppercase block mb-1">Arguments:</span>
                    <pre className="text-cyan-300 text-xs">
                      {JSON.stringify(log.toolDetails.args, null, 2)}
                    </pre>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] text-gray-400 font-bold block mb-1.5">
                    Execution Response Payload:
                  </span>
                  <div className="p-3 rounded-lg bg-[#080b12] border border-white/10 text-gray-200 overflow-x-auto">
                    <pre className="text-emerald-300 text-xs">
                      {JSON.stringify(log.toolDetails.response, null, 2)}
                    </pre>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-gray-500">This event does not contain a tool execution payload.</div>
            )}
          </div>
        )}

        {/* TAB 4: Waterfall */}
        {activeTab === "waterfall" && (
          <div className="space-y-4">
            {log.performance ? (
              <div className="p-4 rounded-lg bg-[#141b2d]/80 border border-white/[0.08] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-300 font-bold">Total Latency Waterfall</span>
                  <span className="text-white font-bold">{log.performance.totalMs}ms</span>
                </div>

                {/* Timeline visual */}
                <div className="space-y-2 pt-2">
                  <div>
                    <div className="flex justify-between text-[11px] text-gray-400 mb-1">
                      <span>Network Gateway</span>
                      <span>{log.performance.networkMs}ms</span>
                    </div>
                    <div className="w-full bg-[#0a0d14] rounded-full h-1.5 overflow-hidden">
                      <div 
                        style={{ width: `${(log.performance.networkMs / log.performance.totalMs) * 100}%` }} 
                        className="bg-cyan-400 h-full"
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-gray-400 mb-1">
                      <span>Model Inference (Claude 3.5 Sonnet / Nexus-LLM)</span>
                      <span>{log.performance.inferenceMs}ms</span>
                    </div>
                    <div className="w-full bg-[#0a0d14] rounded-full h-1.5 overflow-hidden">
                      <div 
                        style={{ width: `${(log.performance.inferenceMs / log.performance.totalMs) * 100}%` }} 
                        className="bg-violet-500 h-full"
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-gray-400 mb-1">
                      <span>Tool Execution Runtime</span>
                      <span>{log.performance.toolMs}ms</span>
                    </div>
                    <div className="w-full bg-[#0a0d14] rounded-full h-1.5 overflow-hidden">
                      <div 
                        style={{ width: `${(log.performance.toolMs / log.performance.totalMs) * 100}%` }} 
                        className="bg-emerald-400 h-full"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-gray-500">Waterfall telemetry not captured for this span.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
