// Will connect to MongoDB
import mongoose from 'mongoose';

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://ahmarbaig2000:HvL2ub5mLDhOCurD@cluster0.pxw72io.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log('Connected to Database!')
    })
.catch(() => {
    console.error("Connection failed")
})};

export default connectDB;