// Front-end of the Application Screen
import './App.css'
import { useState, useEffect } from 'react'
import { NoteModal } from './NoteModal'
import { CreateNoteModal } from './CreateNoteModal'

function App() {

  // State Handling
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noteCreated, setNoteCreated] = useState("");
  const [modalNote, setModalNote] = useState(null);
  const [createNoteModal, setCreateNoteModal] = useState(null);
  // const [noteUpdated, setNoteUpdated] = useState("");

  const newNote = {
    title: "",
    content: ""
  }

  const openCreateNoteModal = (note) => {
    setCreateNoteModal( {note, visible: false} );
    setTimeout(() => { setCreateNoteModal({ note, visible: true }), 0});
  };
  const closeCreateNoteModal = () => {
    if (!newNote) return;

    setCreateNoteModal(prev => ({...prev, visible: false}));
    setTimeout(() => {setCreateNoteModal(null)}, 300);
  };

  // Modal Logic - Opening and Closing
  const openModal = (note) => {
    setModalNote( {note, visible: false} );
    setTimeout(() => { setModalNote({ note, visible: true }), 0});
  };
  const closeModal = () => {
    if (!modalNote) return;

    setModalNote(prev => ({...prev, visible: false}));
    setTimeout(() => {setModalNote(null)}, 300);
  };

  // Notes are re-fetched on UPDATE and CREATE operations
  const fetchNotes = async () => {
    const res = await fetch("http://localhost:5000/api/notes");
    const data = await res.json();
    setNotes(data);
  }

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

    <div>
      <h1>Simple Notes Application</h1>
      <button onClick={() => openCreateNoteModal(newNote)}>+ Create New Note</button>

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

        {createNoteModal && (
          <CreateNoteModal
            newNote={createNoteModal}
            closeModal={closeCreateNoteModal}
            onSaveSuccess={fetchNotes}
          />
        )}

        {modalNote && (
          <NoteModal 
            modalNote={modalNote}
            closeModal={closeModal}
            onSaveSuccess={fetchNotes}
          />
        )}
      </div>
    </div>
    
    
  )
}

export default App
