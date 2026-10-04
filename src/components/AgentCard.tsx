"use client";

import React from "react";
import { Agent } from "../types/nexus";
import { 
  Play, 
  Pause, 
  Terminal, 
  Settings, 
  Cpu, 
  Database, 
  Gauge,
  Sparkles,
  ExternalLink
} from "lucide-react";

interface AgentCardProps {
  agent: Agent;
  onToggleStatus: (id: string) => void;
  onOpenTerminal: (agent: Agent) => void;
}

export const AgentCard: React.FC<AgentCardProps> = ({ 
  agent, 
  onToggleStatus, 
  onOpenTerminal 
}) => {
  const getStatusBadge = () => {
    switch (agent.status) {
      case "RUNNING":
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-glow-emerald/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            RUNNING
          </span>
        );
      case "PAUSED":
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            PAUSED
          </span>
        );
      case "MONITORING":
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            MONITORING
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
            ERROR
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col justify-between p-4 sm:p-5 rounded-xl bg-[#141b2d]/80 hover:bg-[#182138]/95 border border-white/[0.08] hover:border-violet-500/30 transition-all duration-200 backdrop-blur-xl">
      <div>
        {/* Header: ID, Role, Status */}
        <div className="flex items-start justify-between gap-2 sm:gap-3 mb-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 sm:gap-2 mb-1 flex-wrap">
              <span className="text-xs font-mono font-bold text-violet-400 tracking-wider">
                #{agent.id}
              </span>
              <span className="px-1.5 sm:px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-gray-300 border border-white/10 truncate max-w-[130px]">
                {agent.role}
              </span>
            </div>
            <h4 className="text-sm sm:text-base font-bold text-white tracking-tight font-sans truncate">
              {agent.name}
            </h4>
          </div>
          <div className="flex-shrink-0">
            {getStatusBadge()}
          </div>
        </div>

        {/* Current Mission & Subtask */}
        <div className="mb-4 space-y-1">
          <div className="text-xs font-medium text-gray-200 line-clamp-2">
            {agent.task}
          </div>
          <div className="text-[11px] text-gray-400 font-mono line-clamp-2 break-all sm:break-normal">
            ↳ {agent.subtask}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
            <span className="text-gray-400">Execution Progress</span>
            <span className="text-cyan-400 font-bold">{agent.progress}%</span>
          </div>
          <div className="w-full bg-[#0a0d14] rounded-full h-2 overflow-hidden border border-white/5">
            <div
              className="bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${agent.progress}%` }}
            ></div>
          </div>
        </div>

        {/* Hardware & Latency Telemetry Gauges */}
        <div className="grid grid-cols-3 gap-1 sm:gap-2 p-2 sm:p-2.5 rounded-lg bg-[#0b0f1a] border border-white/[0.05] mb-4 text-center font-mono">
          <div className="min-w-0">
            <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase block">CPU</span>
            <span className="text-xs font-bold text-gray-200">{agent.cpu}%</span>
          </div>
          <div className="min-w-0">
            <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase block">Memory</span>
            <span className="text-xs font-bold text-gray-200 truncate block">{agent.ram}</span>
          </div>
          <div className="min-w-0">
            <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase block">Latency</span>
            <span className="text-xs font-bold text-cyan-400">{agent.latency}ms</span>
          </div>
        </div>

        {/* Attached Tools */}
        <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-4">
          {agent.tools.map((t, idx) => (
            <span 
              key={idx} 
              className="px-1.5 sm:px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] text-gray-300 border border-white/5"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Operator Action Bar */}
      <div className="flex items-center justify-between pt-3 border-t border-white/[0.08] gap-2">
        <button
          onClick={() => onToggleStatus(agent.id)}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium transition-all min-h-[36px] ${
            agent.status === "RUNNING"
              ? "bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30"
              : "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
          }`}
        >
          {agent.status === "RUNNING" ? (
            <>
              <Pause className="w-3.5 h-3.5" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" />
              <span>Resume</span>
            </>
          )}
        </button>

        <button
          onClick={() => onOpenTerminal(agent)}
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium bg-white/[0.05] hover:bg-violet-600/20 text-gray-300 hover:text-violet-300 border border-white/10 transition-colors min-h-[36px]"
          title="Open Reasoning Terminal"
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>Trace</span>
        </button>
      </div>
    </div>
  );
};
