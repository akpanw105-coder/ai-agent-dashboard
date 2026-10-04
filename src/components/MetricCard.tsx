"use client";

import React from "react";
import { Metric } from "../types/nexus";
import { Layers, Coins, CheckCircle2, Clock, TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  metric: Metric;
}

export const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  const getIcon = () => {
    switch (metric.type) {
      case "swarms":
        return <Layers className="w-5 h-5 text-violet-400" />;
      case "tokens":
        return <Coins className="w-5 h-5 text-cyan-400" />;
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case "latency":
        return <Clock className="w-5 h-5 text-amber-400" />;
      default:
        return <Layers className="w-5 h-5 text-violet-400" />;
    }
  };

  return (
    <div className="relative group p-3.5 sm:p-5 rounded-xl bg-[#141b2d]/70 hover:bg-[#182138]/90 border border-white/[0.08] hover:border-violet-500/30 transition-all duration-200 backdrop-blur-xl shadow-lg hover:shadow-glow-violet/20">
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-xs font-medium text-gray-400 font-sans tracking-wide truncate">
          {metric.label}
        </span>
        <div className="p-1.5 sm:p-2 rounded-lg bg-white/[0.04] border border-white/[0.06] group-hover:scale-105 transition-transform flex-shrink-0">
          {getIcon()}
        </div>
      </div>

      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight font-sans truncate">
          {metric.value}
        </span>
      </div>

      {metric.subValue && (
        <div className="text-[11px] sm:text-xs text-gray-400 font-mono mb-3 truncate">
          {metric.subValue}
        </div>
      )}

      <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
        <div className="flex items-center gap-1 text-[11px] sm:text-xs font-medium">
          {metric.isPositive ? (
            <span className="flex items-center text-emerald-400">
              <TrendingUp className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
              <span>{metric.change}</span>
            </span>
          ) : (
            <span className="flex items-center text-rose-400">
              <TrendingDown className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
              <span>{metric.change}</span>
            </span>
          )}
        </div>
        <span className="text-[9px] sm:text-[10px] text-gray-500 font-mono uppercase">Telemetry</span>
      </div>
    </div>
  );
};
