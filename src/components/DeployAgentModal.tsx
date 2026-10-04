"use client";

import React, { useState } from "react";
import { X, Sparkles, Plus, Layers, ShieldCheck, Database, Globe } from "lucide-react";
import { Agent } from "../types/nexus";

interface DeployAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeploy: (agent: Agent) => void;
}

export const DeployAgentModal: React.FC<DeployAgentModalProps> = ({
  isOpen,
  onClose,
  onDeploy,
}) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("Market Intelligence");
  const [task, setTask] = useState("");
  const [model, setModel] = useState("Claude 3.5 Sonnet");
  const [selectedTools, setSelectedTools] = useState<string[]>(["Headless Browser"]);

  if (!isOpen) return null;

  const availableTools = [
    "Headless Browser",
    "SerpAPI",
    "Vector DB",
    "GitHub API",
    "Terraform CLI",
    "eBPF Probe",
    "Salesforce Sync",
    "Python Sandbox"
  ];

  const toggleTool = (tool: string) => {
    if (selectedTools.includes(tool)) {
      setSelectedTools(selectedTools.filter((t) => t !== tool));
    } else {
      setSelectedTools([...selectedTools, tool]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newAgent: Agent = {
      id: `AG-${Math.floor(100 + Math.random() * 900)}`,
      name: name.trim(),
      role,
      status: "RUNNING",
      task: task.trim() || "Autonomous exploration & telemetry gathering",
      subtask: "Initializing runtime environment & vector index bindings",
      progress: 5,
      cpu: 12,
      ram: "512MB / 4GB",
      latency: 180,
      cluster: "prod-us-east-1",
      tools: selectedTools,
    };

    onDeploy(newAgent);
    setName("");
    setTask("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#0f1422] border border-violet-500/30 p-6 shadow-2xl shadow-violet-950/50">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-violet-600/20 text-violet-400 border border-violet-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-sans">
                Deploy Autonomous Agent
              </h3>
              <p className="text-xs text-gray-400 font-sans">
                Configure neural model, mission parameters, and tool authorizations.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="text-xs font-mono text-gray-300 block mb-1">
              Agent Designation / Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. PriceArbitrage-09"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#0a0d14] border border-white/10 text-white text-xs font-mono placeholder-gray-600 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-mono text-gray-300 block mb-1">
                Domain Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#0a0d14] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-cyan-400 transition-colors"
              >
                <option value="Market Intelligence">Market Intelligence</option>
                <option value="DevSecOps">DevSecOps</option>
                <option value="Sales Automation">Sales Automation</option>
                <option value="DevOps Synthesis">DevOps Synthesis</option>
                <option value="Data Extraction">Data Extraction</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-mono text-gray-300 block mb-1">
                Foundational Model
              </label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#0a0d14] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-cyan-400 transition-colors"
              >
                <option value="Claude 3.5 Sonnet">Claude 3.5 Sonnet</option>
                <option value="Gemini 1.5 Pro">Gemini 1.5 Pro</option>
                <option value="GPT-4o Mini">GPT-4o Mini (Cost-Optimized)</option>
                <option value="Nexus-LLM-v2">Nexus-LLM-v2 (Self-Hosted)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-gray-300 block mb-1">
              Autonomous Objective / Mission
            </label>
            <textarea
              rows={2}
              placeholder="Describe the autonomous objective, target systems, and verification criteria..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#0a0d14] border border-white/10 text-white text-xs font-mono placeholder-gray-600 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-gray-300 block mb-1.5">
              Authorized Tool Attachments
            </label>
            <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto p-2 rounded-lg bg-[#0a0d14] border border-white/5">
              {availableTools.map((tool) => {
                const isSelected = selectedTools.includes(tool);
                return (
                  <button
                    type="button"
                    key={tool}
                    onClick={() => toggleTool(tool)}
                    className={`flex items-center gap-2 p-2 rounded text-left text-xs font-mono transition-all ${
                      isSelected
                        ? "bg-violet-600/30 text-cyan-300 border border-violet-500/40 font-semibold"
                        : "bg-white/[0.03] text-gray-400 hover:text-white border border-transparent"
                    }`}
                  >
                    <div className={`w-3 h-3 rounded flex items-center justify-center border ${
                      isSelected ? "bg-cyan-500 border-cyan-400" : "border-white/20"
                    }`}>
                      {isSelected && <span className="text-[10px] text-black font-bold">✓</span>}
                    </div>
                    <span className="truncate">{tool}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/[0.08]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-mono text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white text-xs font-mono font-bold shadow-glow-violet transition-all active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              <span>Initialize Agent Swarm</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
