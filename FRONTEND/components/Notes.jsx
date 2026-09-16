import { useState } from "react";

const Notes = ({ notes, addNote, deleteNote, updateNote, handleDrag }) => {
  const [search, setSearch] = useState("");
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="workspace">
      <div className="section-heading">
        <div>
          <h2>My Notes</h2>
          <p>Create, edit, move, search, and organize your ideas.</p>
        </div>
        <button onClick={addNote}>+ Add Note</button>
      </div>

      <div className="header-actions note-search">
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className="notes-board">
        {filteredNotes.length === 0 && (
          <div className="empty-board">
            <span>📝</span>
            <h3>No notes found</h3>
            <button onClick={addNote}>Create a note</button>
          </div>
        )}

        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className={`sticky-note ${note.color}`}
            style={{ left: `${note.x}px`, top: `${note.y}px` }}
          >
            <div
              className="note-header"
              draggable
              onDragEnd={(event) => handleDrag(event, note.id)}
            >
              <span>✦</span>
              <button onClick={() => deleteNote(note.id)}>×</button>
            </div>
            <input
              className="note-title"
              value={note.title}
              onChange={(event) => updateNote(note.id, "title", event.target.value)}
            />
            <textarea
              value={note.content}
              onChange={(event) => updateNote(note.id, "content", event.target.value)}
            />
            <div className="note-colors">
              {["yellow", "blue", "pink", "green"].map((color) => (
                <button
                  key={color}
                  aria-label={`Change note color to ${color}`}
                  onClick={() => updateNote(note.id, "color", color)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Notes;