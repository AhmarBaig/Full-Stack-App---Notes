import './App.css'
import { useState } from 'react'
// import { Note } from './Note'

export function CreateNoteModal({ newNote, closeModal, onSaveSuccess }) {
    const [title, setTitle] = useState("");
    const [editedContent, setEditedContent] = useState('')
    const [errorTitle, setErrorTitle] = useState("");
    const [errorContent, setErrorContent] = useState("");

    const MAX_CHARS_TITLE = 100
    const MAX_CHARS_CONTENT = 5000

    // POST Request - Fetch to backend and save to database
    const handleSave = async () => {
        if (title == "") { 
            console.error("Error Occurred. Title cannot be empty."); 
            return;
        }
        try {
          const res = await fetch('http://localhost:5000/api/notes', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({"title": title, "content": editedContent}),
          });

          onSaveSuccess();
          const data = await res.json();
          console.log('Note Saved: ', data);
          closeModal();
        } catch (err) {
            console.error('Error sending note: ', err)
        }
        closeModal();
    }

    // Error Handling, Business Rules
    const handleTitleChange = (e) => {
        const value = e.target.value;

        if (value.length <= MAX_CHARS_TITLE) {
            setTitle(value);
            setErrorTitle('');
        } else {
            setErrorTitle(`Maximum of ${MAX_CHARS_TITLE} characters allowed.`)
        }
    };

    const handleContentChange = (e) => {
        const value = e.target.value;
        
        if (value.length <= MAX_CHARS_CONTENT) {
            setEditedContent(value);
            setErrorContent('');
        } else {
            setErrorContent(`Maximum of ${MAX_CHARS_CONTENT} characters allowed.`)
        }
    }

    return (
        /* //  Clickable Modal: Click on note to use CRUD operations*/
        <div className={`modal-overlay ${newNote.visible ? 'show' : ''}`} 
            onClick={closeModal}
        >
            <div className={`modal ${newNote.visible ? 'show' : ''}`} 
                onClick={(e) => e.stopPropagation()}
            >
            <h2>
                <input 
                    placeholder='Title: '
                    value={title}
                    onChange={handleTitleChange}
                />
            </h2>
            <p>{title.length}/{MAX_CHARS_TITLE} character</p>
            {errorTitle && <p style={{ color: 'red' }}>{errorTitle}</p>}

            <textarea 
                className="modal-textarea"
                value={editedContent}
                onChange={handleContentChange}
            />
            <p>{editedContent.length}/{MAX_CHARS_CONTENT} character</p>
            {errorContent && <p style={{ color: 'red' }}>{errorContent}</p>}

            <button onClick={handleSave}>Add Note</button>
            <button onClick={closeModal}>Close</button>
            </div>
        </div>
    )
}