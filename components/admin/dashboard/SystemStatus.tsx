"use client";

import React, { useEffect, useState } from "react";
import { Server, Database, HardDrive, Clock, Zap, Wifi, Activity } from "lucide-react";

interface StatusItem {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  status: "ok" | "warn" | "error";
  detail?: string;
}

function StatusDot({ status }: { status: "ok" | "warn" | "error" }) {
  const cls = status === "ok" ? "bg-emerald-500" : status === "warn" ? "bg-amber-500" : "bg-rose-500";
  return <div className={`h-2 w-2 rounded-full ${cls} ${status === "ok" ? "animate-pulse" : ""}`} />;
}

function UsageBar({ value, max = 100 }: { value: number; max?: number }) {
  const pct = (value / max) * 100;
  const color = pct > 80 ? "bg-rose-500" : pct > 60 ? "bg-amber-500" : "bg-emerald-500";
  return (
    <div className="h-1.5 w-24 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
      <div className={`h-full rounded-full transition-all duration-700 ${color}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

export function SystemStatus() {
  const [mounted, setMounted] = useState(false);
  const [cpu, setCpu] = useState(14);
  const [memory, setMemory] = useState(48);
  const [storage, setStorage] = useState(62);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCpu((p) => Math.max(5, Math.min(35, p + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 4))));
      setMemory((p) => Math.max(42, Math.min(56, p + (Math.random() > 0.5 ? 1 : -1))));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 animate-pulse h-full">
        <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-800 rounded mb-4" />
        <div className="space-y-3">{Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-10 bg-zinc-100 dark:bg-zinc-800 rounded-xl" />
        ))}</div>
      </div>
    );
  }

  const items: StatusItem[] = [
    { label: "Database", value: "Connected", icon: Database, status: "ok", detail: "PostgreSQL 15.4" },
    { label: "API Server", value: "Operational", icon: Server, status: "ok", detail: "99.9% uptime" },
    { label: "Last Backup", value: "3h ago", icon: HardDrive, status: "ok", detail: "Auto-backup" },
    { label: "Response Time", value: "142ms", icon: Zap, status: "ok", detail: "avg p95" },
    { label: "Network", value: "Stable", icon: Wifi, status: "ok", detail: "No alerts" },
    { label: "Uptime", value: "14d 6h 22m", icon: Clock, status: "ok", detail: "Since last restart" },
  ];

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 shadow-sm hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <Activity className="h-4 w-4 text-emerald-500" />
            <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">System Health</h3>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Live infrastructure status</p>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 px-2.5 py-1">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">All systems operational</span>
        </div>
      </div>

      <div className="space-y-2 flex-1">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50/80 dark:bg-zinc-800/30 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/60 transition-colors duration-150">
              <div className="h-7 w-7 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center shrink-0">
                <Icon className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">{item.value}</p>
                <p className="text-[10px] text-zinc-400 dark:text-zinc-500">{item.label} · {item.detail}</p>
              </div>
              <StatusDot status={item.status} />
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-2.5">
        {[{ label: "CPU", value: cpu }, { label: "Memory", value: memory }, { label: "Storage", value: storage }].map((r) => (
          <div key={r.label} className="flex items-center justify-between gap-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 w-14 shrink-0">{r.label}</span>
            <UsageBar value={r.value} />
            <span className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400 tabular-nums w-8 text-right">{r.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
