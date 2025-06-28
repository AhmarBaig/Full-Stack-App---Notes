// Front-end of the Application Screen
import './App.css'
import { useState, useEffect } from 'react'
import { Note } from './Note'

function App() {

  // const [sizeDB, setSizeDB] = useState('');
  const [notes, setNotes] = useState([]);
  // const [noteCreated, setNoteCreated] = useState(false);
  const [loading, setLoading] = useState(true);

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

  // GET request, component rendered only on note creation
  // useEffect(() => {
  //   if (noteCreated) {
  //     fetch("http://localhost:5000/api/notes")
  //       .then(res => res.json())
  //       .then(data => {
  //         setNotes(data);
  //         setNoteCreated(false); 
  //       })
  //   .catch(err => console.error('Error fetching notes: ', err));
  //   }
  // }, [noteCreated]);

  if (loading) return <p>Loading notes...</p>;

  console.log(notes.length);

  return (
    <div>
      {notes.map(note => (
        <div className="note-card">
          <h3>{note.title}</h3>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
    // <Note />
  )
}

export default App
