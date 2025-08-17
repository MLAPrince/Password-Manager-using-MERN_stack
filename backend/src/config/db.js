import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();


export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB database");
    }catch(err){
        console.error("Error connecting to MongoDB database", err);
        process.exit(1);
    }
};

