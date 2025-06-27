/* eslint-disable no-undef */
// Will connect to MongoDB
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();

const mongoURI = process.env.MONGO_URI;

const connectDB = async () => {
    await mongoose.connect(mongoURI)
    .then(() => {
        console.log('Connected to Database!')
    })
.catch(() => {
    console.error("Connection failed")
})};

export default connectDB;