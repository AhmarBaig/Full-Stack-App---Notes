// Front-end of the Application Screen
import './App.css'
import { useState, useEffect } from 'react'
import { NoteModal } from './NoteModal'

function App() {

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noteCreated, setNoteCreated] = useState("");
  const [modalNote, setModalNote] = useState(null);

  // Modal Logic
  const openModal = (note) => {
    setModalNote( {note, visible: false} );
    setTimeout(() => { setModalNote({ note, visible: true }), 0});
  };

  const closeModal = () => {
    if (!modalNote) return;

    setModalNote(prev => ({...prev, visible: false}));
    setTimeout(() => {setModalNote(null)}, 300);
  };

  const saveNote = (updatedNote) => {
    // Here you would update your note in state/database
    console.log("Saving note:", updatedNote);
  };

  // GET request on first load-in
  useEffect(() => {
    fetch("http://localhost:5000/api/notes")
      .then(res => {
        return res.json();
      })
      .then(data => {
        setNotes(data);
        setLoading(false);
      })
      .catch(err => console.error('Error fetching notes: ', err));
      setLoading(false);
    }, []);
    
  // if (loading == false) {return "loading..."}

  // GET request, component rendered only on note creation
  useEffect(() => {
    if (noteCreated) {
      fetch("http://localhost:5000/api/notes")
        .then(res => res.json())
        .then(data => {
          setNotes(data);
          setNoteCreated(false); 
        })
    .catch(err => console.error('Error fetching notes: ', err));
    }
  }, [noteCreated]);

  return (

    <div className="notes">
        {notes.map(note => (
        <div key={note._id} className="note-info" onClick={() => openModal(note)}>
            <div className="note-header">
            <h3 className="note-title">{note.title}</h3>
            <span className="note-date">Date: {new Date(note.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="note-content">{note.content || "No Content"}</p>
        </div>
        ))}

        {modalNote && (
          <NoteModal 
          modalNote={modalNote}
          closeModal={closeModal}
          saveNote={saveNote}
        />
        )}
        
    </div>
    
  )
}

export default App
