"use client";

import { FormEvent, useState } from "react";

type TaskFormProps = {
  // Parent passes this function so we can add a task without owning the task list here.
  onAddTask: (title: string) => void;
};

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      return;
    }

    onAddTask(trimmedTitle);
    setTitle("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <label htmlFor="task-title" className="sr-only">
        New task
      </label>
      <input
        id="task-title"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="What do you need to do?"
        className="w-full flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
      />
      <button
        type="submit"
        className="rounded-lg bg-sky-600 px-5 py-2.5 font-medium text-white transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
      >
        Add Task
      </button>
    </form>
  );
}
