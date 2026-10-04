"use client";

import React from "react";
import { Swarm } from "../types/nexus";
import { 
  Layers, 
  Cpu, 
  Users, 
  Zap, 
  Pause, 
  Play, 
  Sliders, 
  Activity, 
  ShieldCheck, 
  ArrowRight,
  TrendingUp
} from "lucide-react";

interface SwarmCardProps {
  swarm: Swarm;
  onScale: (swarm: Swarm) => void;
  onToggleStatus: (swarmId: string) => void;
}

export const SwarmCard: React.FC<SwarmCardProps> = ({ swarm, onScale, onToggleStatus }) => {
  const getCategoryBadge = () => {
    switch (swarm.category) {
      case "Multi-Agent Reasoning":
        return "bg-violet-500/10 text-violet-400 border-violet-500/20";
      case "DevSecOps":
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
      case "Data Extraction":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  const getStatusBadge = () => {
    switch (swarm.status) {
      case "NOMINAL":
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            NOMINAL
          </span>
        );
      case "ACTIVE BUSY":
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-violet-500/10 text-violet-300 border border-violet-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse"></span>
            ACTIVE BUSY
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/20">
            STANDBY
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col justify-between p-4 sm:p-5 rounded-xl bg-[#141b2d]/80 hover:bg-[#182138]/95 border border-white/[0.08] hover:border-violet-500/30 transition-all duration-200 backdrop-blur-xl">
      <div>
        {/* Header: Category & Status */}
        <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
          <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono uppercase font-bold border truncate max-w-[160px] ${getCategoryBadge()}`}>
            {swarm.category}
          </span>
          <div className="flex-shrink-0">
            {getStatusBadge()}
          </div>
        </div>

        {/* Swarm Name */}
        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight font-sans mb-1 truncate">
          {swarm.name}
        </h3>

        {/* Lead Coordinator */}
        <div className="flex items-center gap-1.5 sm:gap-2 mb-3 text-xs text-gray-300 font-mono">
          <span className="text-gray-500">Coordinator:</span>
          <span className="text-cyan-300 font-semibold truncate">{swarm.coordinator}</span>
        </div>

        {/* Subagents Grid / Topology Stack */}
        <div className="mb-4 p-2.5 sm:p-3 rounded-lg bg-[#0b0f1a] border border-white/[0.04]">
          <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 mb-2 flex-wrap gap-1">
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-violet-400" />
              Agent Topology ({swarm.agentsCount})
            </span>
            <span className="text-emerald-400 font-semibold text-[10px] sm:text-[11px]">Consensus: {swarm.consensusEfficiency}</span>
          </div>
          <div className="flex flex-wrap gap-1 sm:gap-1.5">
            {swarm.subagents.map((sa, idx) => (
              <span 
                key={idx} 
                className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.05] text-gray-300 border border-white/5"
              >
                {sa}
              </span>
            ))}
          </div>
        </div>

        {/* Current Mission */}
        <div className="mb-4">
          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block mb-1">
            Active Mission
          </span>
          <p className="text-xs text-gray-200 font-sans leading-relaxed line-clamp-3">
            {swarm.mission}
          </p>
        </div>

        {/* Live Metrics Row */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 p-2 sm:p-2.5 rounded-lg bg-[#0e1424] border border-white/[0.05] mb-4 text-center font-mono">
          <div className="min-w-0">
            <span className="text-[9px] sm:text-[10px] text-gray-500 block">Throughput</span>
            <span className="text-xs font-bold text-cyan-400 truncate block">{swarm.throughput} req/s</span>
          </div>
          <div className="min-w-0">
            <span className="text-[9px] sm:text-[10px] text-gray-500 block">Token Burn</span>
            <span className="text-xs font-bold text-gray-200 truncate block">{swarm.tokenBurn}</span>
          </div>
          <div className="min-w-0">
            <span className="text-[9px] sm:text-[10px] text-gray-500 block">P95 Latency</span>
            <span className="text-xs font-bold text-violet-400 truncate block">{swarm.latencyP95}ms</span>
          </div>
        </div>
      </div>

      {/* Quick Action Footer */}
      <div className="flex items-center justify-between gap-2 pt-3 border-t border-white/[0.08]">
        <button
          onClick={() => onScale(swarm)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium bg-white/[0.06] hover:bg-violet-600/25 text-gray-200 hover:text-white border border-white/10 transition-colors min-h-[36px]"
        >
          <Sliders className="w-3.5 h-3.5 text-violet-400 flex-shrink-0" />
          <span className="truncate">Scale Agents ({swarm.agentsCount})</span>
        </button>

        <button
          onClick={() => onToggleStatus(swarm.id)}
          className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/10 text-gray-300 border border-white/10 transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center flex-shrink-0"
          title={swarm.status === "PAUSED" ? "Resume Swarm" : "Pause Swarm"}
        >
          {swarm.status === "PAUSED" ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5 text-amber-400" />}
        </button>
      </div>
    </div>
  );
};
