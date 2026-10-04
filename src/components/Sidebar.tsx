"use client";

import React from "react";
import { 
  LayoutDashboard, 
  Layers, 
  Terminal, 
  Workflow, 
  Puzzle, 
  BarChart3, 
  Settings, 
  BookOpen, 
  Cpu,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Zap
} from "lucide-react";

export type NavTab = "overview" | "swarms" | "logs" | "studio" | "integrations" | "analytics" | "settings";

interface SidebarProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onTabChange,
  isCollapsed,
  setIsCollapsed,
  isMobileOpen = false,
  onCloseMobile
}) => {
  const navItems: { id: NavTab; label: string; icon: any; badge?: string }[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "swarms", label: "Agent Swarms", icon: Layers, badge: "18" },
    { id: "logs", label: "Execution Logs", icon: Terminal, badge: "LIVE" },
    { id: "studio", label: "Workflow Studio", icon: Workflow },
    { id: "integrations", label: "Integrations", icon: Puzzle },
    { id: "analytics", label: "Analytics & Costs", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const handleNavClick = (tab: NavTab) => {
    onTabChange(tab);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/75 backdrop-blur-sm lg:hidden animate-in fade-in duration-200"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 lg:static flex flex-col justify-between border-r border-white/[0.08] bg-[#0c101a] lg:bg-[#0c101a]/95 backdrop-blur-xl transition-all duration-300 select-none shadow-2xl lg:shadow-none ${
          /* Mobile slide-in behavior */
          isMobileOpen 
            ? "translate-x-0 w-72 max-w-[85vw]" 
            : "-translate-x-full lg:translate-x-0"
        } ${
          /* Desktop collapsed vs expanded */
          isCollapsed ? "lg:w-16" : "lg:w-64"
        }`}
      >
        {/* Top Nav List */}
        <div className="p-3">
          <div className="flex items-center justify-between mb-4 px-2">
            {(!isCollapsed || isMobileOpen) && (
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-gray-400 font-semibold">
                  Control Plane
                </span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  ACTIVE
                </span>
              </div>
            )}

            {/* Desktop Collapse / Expand Button */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex p-1 rounded-md text-gray-400 hover:text-white hover:bg-white/5 transition-colors ml-auto"
              title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>

            {/* Mobile Close Button */}
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors ml-auto"
              aria-label="Close menu"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all group min-h-[42px] ${
                    isActive
                      ? "bg-gradient-to-r from-violet-600/25 to-cyan-500/15 text-white border-l-2 border-violet-400 shadow-sm"
                      : "text-gray-400 hover:text-gray-200 hover:bg-white/[0.04] active:bg-white/[0.08]"
                  }`}
                  title={isCollapsed && !isMobileOpen ? item.label : undefined}
                >
                  <Icon
                    className={`w-4 h-4 transition-colors flex-shrink-0 ${
                      isActive ? "text-cyan-400" : "text-gray-400 group-hover:text-gray-200"
                    }`}
                  />
                  
                  {(!isCollapsed || isMobileOpen) && (
                    <span className="flex-1 text-left tracking-tight truncate">{item.label}</span>
                  )}

                  {(!isCollapsed || isMobileOpen) && item.badge && (
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-tight ${
                        item.badge === "LIVE"
                          ? "bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse"
                          : "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Telemetry & Resource Monitor */}
        <div className="p-3 border-t border-white/[0.08] space-y-3">
          {(!isCollapsed || isMobileOpen) ? (
            <>
              {/* Compute Quota Mini Card */}
              <div className="p-3 rounded-lg bg-[#141b2d]/80 border border-white/[0.08]">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-gray-300 font-medium flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-cyan-400" />
                    Cluster GPU Quota
                  </span>
                  <span className="text-[11px] font-mono text-cyan-400 font-bold">76%</span>
                </div>
                <div className="w-full bg-[#0a0d14] rounded-full h-1.5 overflow-hidden border border-white/5">
                  <div 
                    className="bg-gradient-to-r from-violet-500 to-cyan-400 h-full rounded-full transition-all duration-500"
                    style={{ width: "76%" }}
                  ></div>
                </div>
                <div className="flex items-center justify-between mt-2 text-[10px] text-gray-400 font-mono">
                  <span>32 H100 SXM5</span>
                  <span>4.8ms sync</span>
                </div>
              </div>

              {/* Docs link */}
              <a
                href="#docs"
                className="flex items-center gap-2 px-2 py-1.5 text-xs text-gray-400 hover:text-white transition-colors min-h-[36px]"
              >
                <BookOpen className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                <span className="truncate">API & Agent SDK Docs</span>
              </a>
            </>
          ) : (
            <div className="flex flex-col items-center gap-2 py-1">
              <div className="w-8 h-8 rounded-lg bg-[#141b2d] flex items-center justify-center text-cyan-400 border border-white/10" title="GPU Load 76%">
                <Zap className="w-4 h-4" />
              </div>
              <div className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors" title="Documentation">
                <BookOpen className="w-4 h-4" />
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
