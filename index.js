import 'dotenv/config';
import "./database/db.js";
import cookieParser from 'cookie-parser';
import express from 'express';

import authRouter from './routes/authRouter.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", authRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("🔥🔥🔥 http://localhost:" + PORT));


