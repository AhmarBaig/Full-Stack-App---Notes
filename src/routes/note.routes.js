import express from "express";
const router = express.Router();
import noteController from "../controllers/note.controller.js";

router.get('/', noteController.getNotes);
router.get('/:id', noteController.getNote)
router.post('/', noteController.createNote);
// router.put('/:id', noteController.updateNote);
// router.delete('/:id', noteController.deleteNote);

export default router;