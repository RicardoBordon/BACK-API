import 'dotenv/config';
import "./database/db.js";
import cookieParser from 'cookie-parser';
import express, { urlencoded } from 'express';
import cors from 'cors';

import authRouter from './routes/authRouter.js';
import productRoutes from './routes/productRouter.js'; 
import path from 'path';
import multer from 'multer';

const app = express();

app.use(cors());

// const whiteList = [process.env.ORIGIN];

// app.use(cors({
//     origin: function(origin, callback){
//         if(whiteList.includes(origin)){
//             return callback(null, origin)
//         }
//         return callback("Error de cors origin no autorizado");
//     }
// }));
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({extended: false}));

    const storage = multer.diskStorage({
    destination: path.join("public/uploads"),
    filename: (req, file, callback) => {
        callback(null, new Date().getTime() + path.extname(file.originalname) );
    }
})
app.use(multer({storage}).single('image'));

app.use("/api/v1", authRouter);
app.use("/api/v1", productRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("🔥🔥🔥 http://localhost:" + PORT));


