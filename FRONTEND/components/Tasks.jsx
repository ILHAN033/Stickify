import { useState } from "react";

const Tasks = ({ tasks, addTask, toggleTask, deleteTask }) => {
  const [newTask, setNewTask] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    addTask(event, newTask);
    setNewTask("");
  };

  return (
    <section className="panel standalone-panel">
      <div className="panel-header">
        <div>
          <h2>My Tasks</h2>
          <p>Add tasks, mark them complete, or remove them.</p>
        </div>
      </div>

      <form className="task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(event) => setNewTask(event.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <div className="task-list">
        {tasks.length === 0 && <p className="no-tasks">No tasks yet.</p>}
        {tasks.map((task) => (
          <div className={`task ${task.completed ? "completed" : ""}`} key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <span>{task.text}</span>
            <button onClick={() => deleteTask(task.id)}>×</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Tasks;