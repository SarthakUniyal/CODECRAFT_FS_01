import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // Log to verify the URI is actually being read
        console.log("Connecting to:", process.env.MONGO_URI); 
        
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Connection Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;