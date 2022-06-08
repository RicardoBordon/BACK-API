import 'dotenv/config';
import express from 'express';
import "./database/db.js";
import authRouter from './routes/authRouter.js';

const app = express();

app.use(express.json());
app.use("/api/v1", authRouter);

const PORT = process.env.PORT;
app.listen(5000, () => console.log("http://localhost:"+PORT));

app.get("/" , (req,res) => {
     res.json("umpalumbalapapaaaa");
 }
 )

