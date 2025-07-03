// Controller for routing, Use Express to handle front-end call to back-end
import NoteModel from "../models/note.model.js";

// GET ALL
export const getNotes = async (req, res) => {
    try {
        const notes = await NoteModel.find({});
        res.status(200).json(notes);
        console.log("Retrieved ALL notes")
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// GET one note
export const getNote = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await NoteModel.findById(id);
        res.status(200).json(note);
        console.log("Retrieved note")
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// CREATE note
export const createNote =  async (req, res) => {
    try {
        const newNote = await NoteModel.create(req.body);
        res.status(201).json(newNote);
        console.log("New Note Created")
    } catch (err) {
        console.log("New Note not created")
        res.status(500).json({ message: 'Server error', error: err });
    }
};

// UPDATE note
export const updateNote = async (req, res) => {
    
    try {
        const updatedNote = await NoteModel.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true } // <-- Sends the updated note instead of original
        );
        
        if (!updatedNote) return res.status(404).json({
            message: 'Note was not found'
        });
        
        res.status(201).json(updatedNote);
        console.log("Note Updated")
    } catch (err) {
        console.error("Unable to update note")
        res.status(500).json({ message: err.message });
    }
};

export const deleteNote = async (req, res) => {

    try {
        const deletedNote = await NoteModel.findByIdAndDelete(
            req.params.id,
        )

        if (!deletedNote) return res.status(404).json({
            message: 'Note was not found'
        });
        
        console.log("Note Deleted")
        res.status(200).json({ message: 'Note deleted', deletedNote });

    } catch (err) {
        console.error("Unable to delete note")
        res.status(500).json({ message: err.message });
    }
}