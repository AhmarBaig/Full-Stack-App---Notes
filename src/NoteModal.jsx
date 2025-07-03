import './App.css'
import { useState, useEffect } from 'react'
// import { Note } from './Note'


export function NoteModal({ modalNote, closeModal, onSaveSuccess }) {
    const [title, setTitle] = useState(modalNote.note.title);
    const [editedContent, setEditedContent] = useState('')
    const [errorTitle, setErrorTitle] = useState("");
    const [errorContent, setErrorContent] = useState("");

    const MAX_CHARS_TITLE = 100
    const MAX_CHARS_CONTENT = 5000

    useEffect(() => {
        if (modalNote) setEditedContent(modalNote.note.content || '');
    }, [modalNote])

    if (!modalNote) return null;

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

    const handleSave = async() => {
        // PUT request - Update a created note
        const id = modalNote.note._id;

        // Business Rule,
        if (title == "") { 
            console.error("Error Occurred. Title cannot be empty."); 
            return;
        }

        try {
            const res = await fetch(`http://localhost:5000/api/notes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"_id": id, "title": title, "content": editedContent}),
            });
          
            onSaveSuccess();
            const data = await res.json();
            console.log('Note Saved: ', data);
            closeModal();
            
        } catch (err) {
            console.error('Error sending note: ', err)
        }
    };
    
    const handleDelete = async() => {
        const id = modalNote.note._id;

        try {
            const res = await fetch(`http://localhost:5000/api/notes/${id}`, {
                method: 'DELETE'
            });

            onSaveSuccess(); 
            const data = await res.json();
            console.log('Deleted Note: ', data);
            closeModal();
        } catch (err) {
            console.error('Error deleting note: ', err)
        }
    } 

    return (
        /* //  Clickable Modal: Click on note to use CRUD operations*/
        <div className={`modal-overlay ${modalNote.visible ? 'show' : ''}`} 
            onClick={closeModal}
        >
            <div className={`modal ${modalNote.visible ? 'show' : ''}`} 
                onClick={(e) => e.stopPropagation()}
            >
            <h2>Title: 
                <input 
                   value={title}
                   onChange={handleTitleChange}
                />
                
            </h2>
            <p>{title.length}/{MAX_CHARS_TITLE} character</p>
            {errorTitle && <p style={{ color: 'red' }}>{errorTitle}</p>}
            <span>Date: {new Date(modalNote.note.createdAt).toLocaleDateString()}</span>
            <textarea 
                className="modal-textarea"
                value={editedContent}
                onChange={handleContentChange}
            />
            <p>{editedContent.length}/{MAX_CHARS_CONTENT} character</p>
            {errorContent && <p style={{ color: 'red' }}>{errorContent}</p>}
            <button onClick={handleSave}>Save</button>
            <button onClick={closeModal}>Close</button>
            <button onClick={handleDelete}>Delete Note</button>
            </div>
        </div>
    )
}