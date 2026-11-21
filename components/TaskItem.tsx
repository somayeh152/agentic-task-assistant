"use client";

import type { Task } from "@/types/task";

type TaskItemProps = {
  task: Task;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
};

export default function TaskItem({
  task,
  onToggleTask,
  onDeleteTask,
}: TaskItemProps) {
  return (
    <li
      className={`flex items-center gap-3 rounded-lg border px-4 py-3 transition ${
        task.completed
          ? "border-slate-200 bg-slate-50"
          : "border-slate-200 bg-white"
      }`}
    >
      {/* Checkbox toggles completed / incomplete */}
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleTask(task.id)}
        aria-label={`Mark "${task.title}" as ${task.completed ? "incomplete" : "completed"}`}
        className="h-4 w-4 shrink-0 cursor-pointer rounded border-slate-300 text-sky-600 focus:ring-sky-400"
      />

      <span
        className={`min-w-0 flex-1 break-words ${
          task.completed
            ? "text-slate-400 line-through"
            : "text-slate-800"
        }`}
      >
        {task.title}
      </span>

      <button
        type="button"
        onClick={() => onDeleteTask(task.id)}
        aria-label={`Delete "${task.title}"`}
        className="shrink-0 rounded-md px-2.5 py-1 text-sm text-rose-600 transition hover:bg-rose-50 hover:text-rose-700"
      >
        Delete
      </button>
    </li>
  );
}
