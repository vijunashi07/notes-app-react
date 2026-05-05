import { useEffect, useState } from 'react'
import NoteInput from './NoteInput';
import NotesList from './NotesList';
import useDebounce from './useDebounce'
import './App.css'

function App() {
  const [note, setNote] = useState("");
  const [editNoteId, setEditNoteId] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  const [notes, setNotes] = useState(() => {
    try {
      const stored =
        localStorage.getItem("notes");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }
  );

  const debouncedSearch = useDebounce(searchInput, 500);
  const trimmedInput = debouncedSearch.trim().toLowerCase();
  const filteredNotes = notes.filter((note) => note.text.toLowerCase().includes(trimmedInput))

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes])

  const addNotes = () => {
    const trimmed = note.trim();
    if (trimmed.length === 0) return;

    if (editNoteId) {
      setNotes((prevNotes) => prevNotes.map((n) =>
        n.id === editNoteId ? { ...n, text: trimmed } : n));
      setEditNoteId(null)

    } else {
      let newNote = { text: trimmed, id: Date.now() }
      setNotes((prevNotes) => [...prevNotes, newNote]);
    }
    setNote("");
  }

  const handleDelete = (noteId) => {
    setNotes((prevNotes) =>
      prevNotes.filter((note) => note.id !== noteId)
    );
  }

  const handleEdit = (noteId) => {
    setEditNoteId(noteId);
    let editableNote = notes.find((note) => note.id === noteId)
    setNote(editableNote?.text)
  }

  const handleInputChange = (e) => {
    setNote(e.target.value)
  }

  return (
    <>
      <div className='card'>
        <h3>NOTES APP</h3>
        <NoteInput
          note={note}
          handleInputChange={handleInputChange}
          addNotes={addNotes}
          editNoteId={editNoteId}
        ></NoteInput>

        <h3>YOUR NOTES </h3>
        <div className='cardBody'>
          <div className='searchDiv'>
            <input className='searchInput' value={searchInput} placeholder='Search a note..' onChange={(e) => setSearchInput(e.target.value)}></input>
          </div>
          <div className='notesDiv'>
            {notes.length === 0 ? <span className='emptyState'>No Notes Yet!</span> :
              filteredNotes.length === 0 ? <span className='emptyState'>No Matching notes found!</span> :
                <NotesList
                  filteredNotes={filteredNotes}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  editNoteId={editNoteId}
                ></NotesList>
            }
          </div>
        </div>
      </div >
    </>
  )
}

export default App
