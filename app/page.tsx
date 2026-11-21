"use client";

import { useState } from "react";
import type { Task } from "@/types/task";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";

export default function Home() {
  // All tasks live in React state (in memory only — no database or localStorage).
  // Refreshing the page will reset this list, which is intentional for Phase 1 & 2.
  const [tasks, setTasks] = useState<Task[]>([]);

  // Derived counts — recalculated whenever `tasks` changes.
  const totalCount = tasks.length;
  const completedCount = tasks.filter((task) => task.completed).length;
  const pendingCount = totalCount - completedCount;

  function handleAddTask(title: string) {
    const newTask: Task = {
      // crypto.randomUUID() gives each task a unique id in the browser.
      id: crypto.randomUUID(),
      title,
      completed: false,
    };

    // Spread the old array and append the new task (do not mutate the old array).
    setTasks((previousTasks) => [...previousTasks, newTask]);
  }

  function handleToggleTask(id: string) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function handleDeleteTask(id: string) {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col px-4 py-10 sm:py-16">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          My Tasks
        </h1>
        <p className="mt-2 text-slate-600">
          A simple task list to organize what you need to get done.
        </p>
      </header>

      <section className="mb-6" aria-label="Add a new task">
        <TaskForm onAddTask={handleAddTask} />
      </section>

      {/* Simple statistics for total / completed / pending */}
      <section
        className="mb-6 grid grid-cols-3 gap-3"
        aria-label="Task statistics"
      >
        <StatCard label="Total" value={totalCount} />
        <StatCard label="Pending" value={pendingCount} />
        <StatCard label="Completed" value={completedCount} />
      </section>

      <section aria-label="Task list">
        <TaskList
          tasks={tasks}
          onToggleTask={handleToggleTask}
          onDeleteTask={handleDeleteTask}
        />
      </section>
    </main>
  );
}

// Small presentational helper used only on this page.
function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-3 text-center">
      <p className="text-2xl font-semibold text-slate-900">{value}</p>
      <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </p>
    </div>
  );
}
