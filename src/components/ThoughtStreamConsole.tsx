"use client";

import React, { useState, useEffect } from "react";
import { LogEntry } from "../types/nexus";
import { 
  Terminal, 
  Play, 
  Pause, 
  RotateCcw, 
  Download, 
  Sparkles, 
  Code2, 
  CheckCircle2, 
  Clock 
} from "lucide-react";

interface ThoughtStreamConsoleProps {
  logs: LogEntry[];
  onSelectLog: (log: LogEntry) => void;
  selectedLogId?: string;
}

export const ThoughtStreamConsole: React.FC<ThoughtStreamConsoleProps> = ({
  logs,
  onSelectLog,
  selectedLogId,
}) => {
  const [isStreaming, setIsStreaming] = useState(true);
  const [speed, setSpeed] = useState<"1x" | "2x">("1x");

  const getBadgeColor = (type: LogEntry["eventType"]) => {
    switch (type) {
      case "THOUGHT":
        return "bg-violet-500/20 text-violet-300 border-violet-500/30";
      case "TOOL_CALL":
        return "bg-cyan-500/20 text-cyan-300 border-cyan-500/30";
      case "VECTOR_SEARCH":
        return "bg-amber-500/20 text-amber-300 border-amber-500/30";
      case "DAG_DISPATCH":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
      case "ERROR":
        return "bg-rose-500/20 text-rose-300 border-rose-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  return (
    <div className="rounded-xl bg-[#0c101a] border border-white/[0.08] overflow-hidden shadow-2xl backdrop-blur-2xl">
      {/* Console Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#111726]/90 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
          </div>
          <div className="h-4 w-px bg-white/10"></div>
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono font-bold text-gray-200">
              Agent Thought Stream & Reasoning Trace
            </span>
            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <span className={`w-1.5 h-1.5 rounded-full bg-emerald-400 ${isStreaming ? "animate-pulse" : ""}`}></span>
              {isStreaming ? "LIVE" : "PAUSED"}
            </span>
          </div>
        </div>

        {/* Speed Controls & Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSpeed(speed === "1x" ? "2x" : "1x")}
            className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10"
          >
            {speed}
          </button>

          <button
            onClick={() => setIsStreaming(!isStreaming)}
            className="p-1.5 rounded text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            title={isStreaming ? "Pause Live Stream" : "Resume Stream"}
          >
            {isStreaming ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          <button
            className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 transition-colors"
            title="Export JSON Logs"
          >
            <Download className="w-3 h-3 text-gray-400" />
            <span className="text-[11px] hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Terminal Stream Feed */}
      <div className="p-3 font-mono text-xs max-h-[380px] overflow-y-auto space-y-2 select-text">
        {logs.map((log) => {
          const isSelected = selectedLogId === log.id;
          return (
            <div
              key={log.id}
              onClick={() => onSelectLog(log)}
              className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                isSelected
                  ? "bg-violet-950/40 border-violet-500/60 shadow-glow-violet/20"
                  : "bg-[#111726]/40 hover:bg-[#141c2e]/70 border-white/[0.04] hover:border-white/10"
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] text-gray-500 font-mono">
                    {log.timestamp}
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/5 text-violet-300 font-semibold border border-white/10">
                    {log.agentName}
                  </span>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider font-bold border ${getBadgeColor(log.eventType)}`}>
                    [{log.eventType}]
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-gray-400">
                  <span className="text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-gray-500" />
                    {log.durationMs}ms
                  </span>
                  <span className="text-cyan-400 font-semibold">{log.cost}</span>
                </div>
              </div>

              <div className="text-xs text-gray-300 pl-1 font-mono leading-relaxed">
                {log.summary}
              </div>

              {log.confidence && (
                <div className="mt-2 flex items-center gap-2 text-[10px] text-gray-400 pl-1">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span>Cognitive Confidence:</span>
                  <span className="text-emerald-400 font-bold">{log.confidence}%</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
