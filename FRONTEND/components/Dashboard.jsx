import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Notes from "./Notes";
import Tasks from "./Tasks";
import Charts from "./Charts";
import { getChartData } from "../src/chartUtils";
import "../src/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  const [notes, setNotes] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [newTask, setNewTask] = useState("");
  const [search, setSearch] = useState("");
  const [activeSection, setActiveSection] = useState("dashboard");
  const [chartRange, setChartRange] = useState("7");
  const [currentTime] = useState(() => Date.now());

  useEffect(() => {
    let isActive = true;

    const loadUserData = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/user/me",
          { withCredentials: true }
        );
        const currentUserId = data?.user?._id;

        if (!isActive || !currentUserId) return;

        const savedNotes = localStorage.getItem(`notes-${currentUserId}`);
        const savedTasks = localStorage.getItem(`tasks-${currentUserId}`);

        setNotes(savedNotes ? JSON.parse(savedNotes) : []);
        setTasks(savedTasks ? JSON.parse(savedTasks) : []);
        setUserId(currentUserId);
      } catch {
        if (isActive) navigate("/sign-in", { replace: true });
      }
    };

    loadUserData();

    return () => {
      isActive = false;
    };
  }, [navigate]);

  useEffect(() => {
    if (userId) {
      localStorage.setItem(`notes-${userId}`, JSON.stringify(notes));
    }
  }, [notes, userId]);

  useEffect(() => {
    if (userId) {
      localStorage.setItem(`tasks-${userId}`, JSON.stringify(tasks));
    }
  }, [tasks, userId]);

  // Add note
  const addNote = () => {
    const newNote = {
      id: Date.now(),
      title: "New Note",
      content: "Write something...",
      color: "yellow",
      x: 100,
      y: 100,
    };

    setNotes((prev) => [...prev, newNote]);
  };

  // Delete note
  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  // Update note
  const updateNote = (id, field, value) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? { ...note, [field]: value }
          : note
      )
    );
  };

  // Drag note
  const handleDrag = (e, id) => {
    const dashboard = e.currentTarget.parentElement.getBoundingClientRect();

    const x = e.clientX - dashboard.left - 100;
    const y = e.clientY - dashboard.top - 20;

    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? {
              ...note,
              x: Math.max(0, x),
              y: Math.max(0, y),
            }
          : note
      )
    );
  };

  // Add task
  const addTask = (e, taskText = newTask) => {
    e.preventDefault();

    if (!taskText.trim()) return;

    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: taskText,
        completed: false,
      },
    ]);

    setNewTask("");
  };

  // Toggle task
  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks((prev) =>
      prev.filter((task) => task.id !== id)
    );
  };

  // Logout
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/api/user/sign-out", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      navigate("/sign-in");
    }
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase())
  );

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const { labels: chartLabels, values: chartValues } = getChartData(
    [...notes, ...tasks],
    chartRange,
    currentTime
  );

  return (
    <div className="dashboard">

      {/* Sidebar */}
      <aside className="sidebar">

        <div className="logo">
          <span>✦</span>
          MySpace
        </div>

        <nav>
          <button
            className={`nav-item ${activeSection === "dashboard" ? "active" : ""}`}
            onClick={() => {
              setActiveSection("dashboard");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            🏠 Dashboard
          </button>

          <button
            className={`nav-item ${activeSection === "notes" ? "active" : ""}`}
            onClick={() => setActiveSection("notes")}
          >
            📝 Notes
          </button>

          <button
            className={`nav-item ${activeSection === "tasks" ? "active" : ""}`}
            onClick={() => setActiveSection("tasks")}
          >
            ✅ Tasks
          </button>

          <button
            className={`nav-item ${activeSection === "charts" ? "active" : ""}`}
            onClick={() => setActiveSection("charts")}
          >
            📊 Charts
          </button>
        </nav>

        <button
          className="logout-sidebar"
          onClick={handleLogout}
        >
          ↪ Logout
        </button>

      </aside>

      {/* Main */}
      <main className="main">

        {/* Header */}
        <header className="dashboard-header">

          <div>
            <h1>Welcome back 👋</h1>
            <p>Your personal productivity dashboard</p>
          </div>

          <div className="header-actions">

            <input
              type="text"
              placeholder="Search notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
              className="add-note-btn"
              onClick={addNote}
            >
              + New Note
            </button>

          </div>

        </header>

        {activeSection === "notes" && (
          <Notes
            notes={notes}
            addNote={addNote}
            deleteNote={deleteNote}
            updateNote={updateNote}
            handleDrag={handleDrag}
          />
        )}

        {activeSection === "tasks" && (
          <Tasks
            tasks={tasks}
            addTask={addTask}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
          />
        )}

        {activeSection === "charts" && (
          <Charts notes={notes} tasks={tasks} />
        )}

        {activeSection === "dashboard" && (
          <>
        {/* Stats */}
        <section className="stats">

          <div className="stat-card">
            <span>📝</span>
            <div>
              <p>Total Notes</p>
              <h2>{notes.length}</h2>
            </div>
          </div>

          <div className="stat-card">
            <span>✅</span>
            <div>
              <p>Completed Tasks</p>
              <h2>{completedTasks}</h2>
            </div>
          </div>

          <div className="stat-card">
            <span>📋</span>
            <div>
              <p>Total Tasks</p>
              <h2>{tasks.length}</h2>
            </div>
          </div>

          <div className="stat-card">
            <span>🎯</span>
            <div>
              <p>Progress</p>
              <h2>
                {tasks.length
                  ? Math.round(
                      (completedTasks / tasks.length) * 100
                    )
                  : 0}
                %
              </h2>
            </div>
          </div>

        </section>

        {/* Workspace */}
        <section className="workspace">

          <div className="section-heading">
            <div>
              <h2>My Workspace</h2>
              <p>Drag your notes around and organize your ideas.</p>
            </div>

            <button onClick={addNote}>
              + Add Note
            </button>
          </div>

          <div className="notes-board">

            {filteredNotes.length === 0 && (
              <div className="empty-board">
                <span>📝</span>
                <h3>No notes yet</h3>
                <p>
                  Create a sticky note to start organizing
                  your ideas.
                </p>

                <button onClick={addNote}>
                  Create your first note
                </button>
              </div>
            )}

            {filteredNotes.map((note) => (

              <div
                key={note.id}
                className={`sticky-note ${note.color}`}
                style={{
                  left: `${note.x}px`,
                  top: `${note.y}px`,
                }}
              >

                <div
                  className="note-header"
                  draggable
                  onDragEnd={(e) =>
                    handleDrag(e, note.id)
                  }
                >
                  <span>✦</span>

                  <button
                    onClick={() =>
                      deleteNote(note.id)
                    }
                  >
                    ×
                  </button>
                </div>

                <input
                  className="note-title"
                  value={note.title}
                  onChange={(e) =>
                    updateNote(
                      note.id,
                      "title",
                      e.target.value
                    )
                  }
                />

                <textarea
                  value={note.content}
                  onChange={(e) =>
                    updateNote(
                      note.id,
                      "content",
                      e.target.value
                    )
                  }
                />

                <div className="note-colors">

                  <button
                    onClick={() =>
                      updateNote(
                        note.id,
                        "color",
                        "yellow"
                      )
                    }
                  />

                  <button
                    onClick={() =>
                      updateNote(
                        note.id,
                        "color",
                        "blue"
                      )
                    }
                  />

                  <button
                    onClick={() =>
                      updateNote(
                        note.id,
                        "color",
                        "pink"
                      )
                    }
                  />

                  <button
                    onClick={() =>
                      updateNote(
                        note.id,
                        "color",
                        "green"
                      )
                    }
                  />

                </div>

              </div>

            ))}

          </div>

        </section>

        {/* Bottom section */}
        <section className="bottom-grid">

          {/* Tasks */}
          <div className="panel">

            <div className="panel-header">
              <div>
                <h2>My Tasks</h2>
                <p>Keep track of what needs to be done.</p>
              </div>
            </div>

            <form
              className="task-form"
              onSubmit={addTask}
            >
              <input
                type="text"
                placeholder="Add a new task..."
                value={newTask}
                onChange={(e) =>
                  setNewTask(e.target.value)
                }
              />

              <button type="submit">
                Add
              </button>
            </form>

            <div className="task-list">

              {tasks.length === 0 && (
                <p className="no-tasks">
                  No tasks yet.
                </p>
              )}

              {tasks.map((task) => (

                <div
                  className={`task ${
                    task.completed ? "completed" : ""
                  }`}
                  key={task.id}
                >

                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() =>
                      toggleTask(task.id)
                    }
                  />

                  <span>{task.text}</span>

                  <button
                    onClick={() =>
                      deleteTask(task.id)
                    }
                  >
                    ×
                  </button>

                </div>

              ))}

            </div>

          </div>

          {/* Chart */}
          <div className="panel chart-panel">

            <div className="panel-header">

              <div>
                <h2>Weekly Activity</h2>
                <p>Your productivity overview</p>
              </div>

              <select
                value={chartRange}
                onChange={(event) => setChartRange(event.target.value)}
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
              </select>

            </div>

            <div className="fake-chart">

              {chartLabels.map((label, index) => (
                <div
                  className="chart-bar"
                  style={{ height: `${chartValues[index]}%` }}
                  key={label}
                >
                  <span>{label}</span>
                </div>
              ))}

            </div>

          </div>

        </section>

          </>
        )}

      </main>
    </div>
  );
};

export default Dashboard;