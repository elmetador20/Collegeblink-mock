"use client";

import React, { useState } from "react";
import { CheckSquare, Square, AlertCircle, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  category: "Colleges" | "Reviews" | "Blogs" | "System";
  priority: "High" | "Medium" | "Low";
  dueDate: string;
  completed: boolean;
}

const initialTasks: Task[] = [
  {
    id: "task_1",
    title: "Verify IIT Delhi average package updates",
    category: "Colleges",
    priority: "High",
    dueDate: "Today",
    completed: false,
  },
  {
    id: "task_2",
    title: "Approve pending review for VIT Vellore",
    category: "Reviews",
    priority: "High",
    dueDate: "Today",
    completed: false,
  },
  {
    id: "task_3",
    title: "Review draft: 'Rise of AI & Data Science'",
    category: "Blogs",
    priority: "Medium",
    dueDate: "Tomorrow",
    completed: false,
  },
  {
    id: "task_4",
    title: "Perform scheduled PostgreSQL database backup",
    category: "System",
    priority: "Low",
    dueDate: "In 2 days",
    completed: false,
  },
];

export function PendingTasks() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const toggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const activeTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  return (
    <div className="rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between pb-4 border-b border-[#E3DFD6]/60 dark:border-zinc-800/60 mb-5">
        <div>
          <h3 className="font-serif text-lg font-semibold text-[#1C1B19] dark:text-zinc-100">
            Pending Tasks
          </h3>
          <p className="text-xs text-[#6B6660] dark:text-zinc-400 mt-1">
            System checklist and moderator queue
          </p>
        </div>
        <div className="text-[10px] font-bold bg-[#1F3A5C]/5 dark:bg-zinc-800 text-[#1F3A5C] dark:text-zinc-300 border border-[#1F3A5C]/15 dark:border-zinc-700 rounded-full px-2.5 py-0.5">
          {activeTasks.length} Pending
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto max-h-[300px] pr-1">
        <AnimatePresence initial={false}>
          {tasks.map((task) => {
            const isCompleted = task.completed;
            return (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                onClick={() => toggleTask(task.id)}
                className={cn(
                  "flex items-start gap-3 p-3.5 rounded-xl border transition-all duration-200 cursor-pointer select-none",
                  isCompleted
                    ? "bg-zinc-50/50 dark:bg-zinc-900/20 border-zinc-100 dark:border-zinc-900/60 opacity-60"
                    : "bg-white dark:bg-zinc-950/20 border-[#E3DFD6] dark:border-zinc-800 hover:border-[#1F3A5C]/30 dark:hover:border-zinc-700 hover:shadow-sm"
                )}
              >
                <div className="pt-0.5 text-[#1F3A5C] dark:text-zinc-400 shrink-0">
                  {isCompleted ? (
                    <CheckSquare className="h-4.5 w-4.5 text-emerald-500" />
                  ) : (
                    <Square className="h-4.5 w-4.5 text-[#6B6660]" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p
                    className={cn(
                      "text-xs font-semibold text-[#1C1B19] dark:text-zinc-200 leading-snug break-words",
                      isCompleted && "line-through text-[#6B6660] dark:text-zinc-500 font-medium"
                    )}
                  >
                    {task.title}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="text-[10px] font-bold text-[#8C6422] dark:text-amber-500 uppercase tracking-wider">
                      {task.category}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[#E3DFD6] dark:bg-zinc-800" />
                    
                    <span
                      className={cn(
                        "text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded",
                        task.priority === "High"
                          ? "bg-rose-50 text-rose-700 dark:bg-rose-950/20 dark:text-rose-400"
                          : task.priority === "Medium"
                          ? "bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400"
                          : "bg-blue-50 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400"
                      )}
                    >
                      {task.priority}
                    </span>

                    <span className="w-1 h-1 rounded-full bg-[#E3DFD6] dark:bg-zinc-800" />
                    <div className="flex items-center gap-1 text-[9px] text-[#6B6660] dark:text-zinc-500">
                      <Clock className="w-3 h-3" />
                      {task.dueDate}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
