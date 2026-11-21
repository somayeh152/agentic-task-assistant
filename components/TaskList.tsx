"use client";

import type { Task } from "@/types/task";
import TaskItem from "@/components/TaskItem";

type TaskListProps = {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
};

export default function TaskList({
  tasks,
  onToggleTask,
  onDeleteTask,
}: TaskListProps) {
  // Empty state when the user has not added any tasks yet.
  if (tasks.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
        <p className="text-base font-medium text-slate-700">No tasks yet</p>
        <p className="mt-1 text-sm text-slate-500">
          Add your first task above to get started.
        </p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleTask={onToggleTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </ul>
  );
}
