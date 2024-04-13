import mongoose from "mongoose";
import dotenv from "dotenv";

// Env config
dotenv.config();

export function dbConnection(){
    let mongo_url = process.env.mongo_url;
    try {
        mongoose.connect(`${mongo_url}`);
        console.log("Database connected Successfully")
    } catch (error) {
        console.log(error.message)
    }
}