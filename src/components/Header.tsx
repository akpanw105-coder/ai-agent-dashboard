"use client";

import React, { useState } from "react";
import { 
  Cpu, 
  Search, 
  Bell, 
  Terminal, 
  Plus, 
  ChevronDown, 
  Activity, 
  Layers, 
  Radio, 
  Sparkles,
  Command
} from "lucide-react";

interface HeaderProps {
  onOpenDeployModal: () => void;
  activeCluster: string;
  setActiveCluster: (cluster: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onOpenDeployModal, 
  activeCluster, 
  setActiveCluster 
}) => {
  const [showClusterMenu, setShowClusterMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const clusters = ["prod-us-east-1", "prod-us-west-2", "staging-eu-central", "dev-edge-cluster"];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#0a0d14]/80 backdrop-blur-xl px-4 lg:px-6 py-3 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Logo & Operational Status */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 shadow-glow-violet">
              <Cpu className="w-5 h-5 text-white" />
              <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-500 opacity-40 blur-sm"></div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-white font-sans">NexusAI</span>
                <span className="px-1.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase font-mono rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">
                  v4.2 PRO
                </span>
              </div>
              <span className="text-[11px] text-gray-400 hidden sm:inline-block">Autonomous Agent Swarm Console</span>
            </div>
          </div>

          <div className="h-6 w-px bg-white/10 hidden md:block"></div>

          {/* Live Cluster Operational Status Beacon */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono text-emerald-400 font-medium tracking-tight">
              99.98% Operational • 42 Active Nodes
            </span>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search swarms, agents, execution logs..."
              className="w-full pl-9 pr-14 py-1.5 bg-[#111726]/80 text-sm text-gray-200 placeholder-gray-500 rounded-lg border border-white/10 focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/40 transition-all font-sans"
            />
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-gray-400 font-mono">
              <Command className="w-3 h-3" />
              <span>K</span>
            </div>
          </div>
        </div>

        {/* Action Controls & Profile */}
        <div className="flex items-center gap-3">
          {/* Cluster Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowClusterMenu(!showClusterMenu)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#161f36]/70 border border-white/10 hover:border-violet-500/40 text-xs font-mono text-gray-300 transition-colors"
            >
              <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
              <span>{activeCluster}</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>

            {showClusterMenu && (
              <div className="absolute right-0 mt-1.5 w-48 py-1 bg-[#161f36] border border-white/15 rounded-lg shadow-xl backdrop-blur-xl z-50 font-mono text-xs">
                <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-gray-400 font-semibold border-b border-white/5">
                  Cluster Regions
                </div>
                {clusters.map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setActiveCluster(c);
                      setShowClusterMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-violet-600/20 transition-colors ${
                      activeCluster === c ? "text-cyan-400 bg-violet-600/10 font-bold" : "text-gray-300"
                    }`}
                  >
                    <span>{c}</span>
                    {activeCluster === c && <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Terminal Trigger */}
          <button 
            title="Open Quick Console"
            className="hidden sm:flex items-center justify-center w-8 h-8 rounded-lg bg-[#161f36]/70 border border-white/10 hover:border-cyan-500/40 text-gray-300 hover:text-cyan-300 transition-colors"
          >
            <Terminal className="w-4 h-4" />
          </button>

          {/* Notification Bell */}
          <button 
            title="System Alerts"
            className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-[#161f36]/70 border border-white/10 hover:border-violet-500/40 text-gray-300 hover:text-white transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white shadow-glow-emerald">
              3
            </span>
          </button>

          {/* Primary CTA - Deploy Agent */}
          <button
            onClick={onOpenDeployModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white text-xs font-semibold shadow-glow-violet hover:shadow-glow-cyan transition-all active:scale-[0.98]"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Deploy Autonomous Agent</span>
            <span className="sm:hidden">Deploy</span>
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-2 pl-1 border-l border-white/10">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-600 to-violet-600 p-0.5">
                <div className="w-full h-full rounded-full bg-[#111726] flex items-center justify-center font-bold text-xs text-cyan-300">
                  NX
                </div>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#0a0d14]"></div>
            </div>
            <div className="hidden xl:flex flex-col text-left">
              <span className="text-xs font-medium text-white leading-tight">Alex Vance</span>
              <span className="text-[10px] text-violet-400 font-mono leading-none">Super Admin</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
