// Express Server, Connect to DB and listen to port

import express from 'express'
import cors from 'cors'
import router from '../src/routes/note.routes.js'
import connectDB from '../src/config/db.js'

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/notes', router);

app.get('/', (req, res) => {
    res.send("Hello from the Backend");
})

connectDB();

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})