import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from "./db.js";
import { router } from "./Router/user.js";

// config dotenv
dotenv.config();

//middlewares
let app = express();
app.use(cors());
const corsOptions = {
    origin: 'https://startoonlab-app.netlify.app',
  };
app.use(express.json());
let PORT = process.env.PORT || 8000;

// DataBase Connection
dbConnection();

app.use("/api", router);

//server connection

app.listen(PORT, () => console.log(`Server listing at ${PORT}`));
