import React, { useState, useEffect } from "react";

export default function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("todos") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo(e) {
    e.preventDefault();
    const text = task.trim();
    if (!text) return;
    setTodos(prev => [{ id: Date.now(), text, done: false }, ...prev]);
    setTask("");
  }

  function toggleDone(id) {
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function removeTodo(id) {
    setTodos(prev => prev.filter(t => t.id !== id));
  }


  return (
    <div className="page">
      <div className="card">
        <header className="card-header">
          <h1 className="title">To‑Do</h1>
          <p className="subtitle">{todos.length} item{todos.length !== 1 ? "s" : ""}</p>
        </header>

        <form className="input-row" onSubmit={addTodo}>
          <input
            className="input"
            value={task}
            onChange={e => setTask(e.target.value)}
            placeholder="Add a new task..."
            aria-label="New task"
          />
          <button className="btn primary" type="submit">Add</button>
        </form>

        <ul className="list">
          {todos.map(t => (
            <li key={t.id} className={`list-item ${t.done ? "done" : ""}`}>
              <label className="item-left">
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() => toggleDone(t.id)}
                />
                <span className="item-text">{t.text}</span>
              </label>

              <div className="item-actions">
                <button className="btn ghost" onClick={() => removeTodo(t.id)}>Delete</button>
              </div>
            </li>
          ))}
          {todos.length === 0 && <li className="empty">No tasks yet — add one above.</li>}
        </ul>
      </div>
    </div>
  );
}