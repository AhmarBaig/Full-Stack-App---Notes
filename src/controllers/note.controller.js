// Controller for routing, Use Express to handle front-end call to back-end
import NoteModel from "../models/note.model.js";

// GET ALL
const getNotes = async (req, res) => {
    try {
        const notes = await NoteModel.find({});
        res.status(200).json(notes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// GET one note
const getNote = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await NoteModel.findById(id);
        res.status(200).json(note);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// CREATE note
const createNote =  async (req, res) => {
    try {
        const newNote = await NoteModel.create(req.body);
        res.status(201).json(newNote);
        console.log("New Note Created!")
    } catch (err) {
        console.log("New Note not created")
        res.status(500).json({ message: 'Server error', error: err });
    }
};

export default {
    getNotes,
    getNote,
    createNote
}