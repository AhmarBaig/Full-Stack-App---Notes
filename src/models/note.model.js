// Schema using Mongoose, MongoDB
import mongoose from 'mongoose'

const NoteSchema = mongoose.Schema({
    "title": {
        type: String,
        required: true,
        trim: true,
    },
    "content": {
        type: String,
        required: false
    },
}, 
{
    timestamps: true
});

export default mongoose.model('Note', NoteSchema);