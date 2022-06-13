import { Router } from "express";
import {login, register, infoUser, refreshToken, logout} from "../controllers/authController.js";
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";
import { requireToken } from "../middlewares/requireToken.js";
import { bodyLoginValidator, bodyRegisterValidator } from "../middlewares/validationAdm.js";


const router = Router();

 router.post("/register", bodyRegisterValidator, register);

 router.post("/login", bodyLoginValidator, login);

 router.get("/protected", requireToken, infoUser);

 router.get("/refresh", requireRefreshToken, refreshToken);

 router.get("/logout", logout);

export default router;