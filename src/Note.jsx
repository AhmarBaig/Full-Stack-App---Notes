// Data Model of Note
import { useState } from 'react'

export function Note() {
    /** What is a Note?
     * A note contains a title, a date(createdAt), content
     * User interactions: CRUD operations
     * C = Create a new note (Create Button)
     * R = Read the note (Click on note)
     * U = Update the note (Edit the note) 
     * D = Delete the note (X button)
    */
   
    let [title, setTitle] = useState("");
    let [content, setContent] = useState("");
    let [errorTitle, setErrorTitle] = useState("");
    let [errorContent, setErrorContent] = useState("");

    const MAX_CHARS_TITLE = 100
    const MAX_CHARS_CONTENT = 5000

    // Error Handling and Reacting to Input
    const handleTitle = (e) => {
        const value = e.target.value;
        
        if (value.length <= MAX_CHARS_TITLE) {
            setTitle(value);
            setErrorTitle('');
        } else {
            setErrorTitle(`Maximum of ${MAX_CHARS_TITLE} characters allowed.`)
        }
    };

    const handleContent = (e) => {
        const value = e.target.value;
        
        if (value.length <= MAX_CHARS_CONTENT) {
            setContent(value);
            setErrorContent('');
        } else {
            setErrorContent(`Maximum of ${MAX_CHARS_CONTENT} characters allowed.`)
        }
    };

    // Handle saving the data, fetch POST request to backend
    const handleSubmit = async() => {
        try {
            const res = await fetch('http://localhost:5000/api/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"title": title, "content": content}),
            });

            const data = await res.json();
            console.log('Note Saved: ', data);
        } catch (err) {
            console.error('Error sending note: ', err)
        }
    }

    // Front-end of Note
    return (
        <div className="note">
            <label>Title: 
                <input
                    type="text"
                    value={title}
                    onChange={handleTitle}
                />
            </label>
            <p>{title.length}/{MAX_CHARS_TITLE} character</p>
            {errorTitle && <p style={{ color: 'red' }}>{errorTitle}</p>}

            <label>Content:
                <textarea
                    type="text"
                    value={content}
                    onChange={handleContent}
                >
                </textarea>
            </label>
            <p>{content.length}/{MAX_CHARS_CONTENT} character</p>
            {errorContent && <p style={{ color: 'red' }}>{errorContent}</p>}

            <button onClick={handleSubmit}>Save</button>
            <button>Exit</button>
        </div>
    )
}


