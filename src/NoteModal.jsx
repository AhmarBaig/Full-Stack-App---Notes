import './App.css'
import { useState, useEffect } from 'react'
// import { Note } from './Note'


export function NoteModal({ modalNote, closeModal, saveNote }) {
    const [editedContent, setEditedContent] = useState('')

    useEffect(() => {
        if (modalNote) setEditedContent(modalNote.note.content || '');
    }, [modalNote])

    if (!modalNote) return null;

    // Handle changing the textarea for the user to actually use the note
    const handleContentChange = (e) => setEditedContent(e.target.value);

    const handleSave = () => {
        saveNote({ ...modalNote.note, content: editedContent});
        closeModal();
    }

    return (
        /* //  Clickable Modal: Click on note to use CRUD operations*/
        <div className={`modal-overlay ${modalNote.visible ? 'show' : ''}`} 
            onClick={closeModal}
        >
            <div className={`modal ${modalNote.visible ? 'show' : ''}`} 
                onClick={(e) => e.stopPropagation()}
            >
            <h2>Title: {modalNote.note.title}</h2>
            <span>Date: {new Date(modalNote.note.createdAt).toLocaleDateString()}</span>
            <textarea 
                className="modal-textarea"
                value={editedContent}
                onChange={handleContentChange}
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={closeModal}>Close</button>
            </div>
        </div>
    )
}