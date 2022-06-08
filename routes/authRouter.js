import { Router } from "express";
import { body } from "express-validator";
import {login, register, infoUser} from "../controllers/authController.js";
import { requireToken } from "../middlewares/requireToken.js";
import { validationResultExpress } from "../middlewares/validationRes.js";

const router = Router();

 router.post("/register",[
     body("email", "formato de email incorrecto")
     .trim()
     .isEmail()
     .normalizeEmail(),
     body("password", "password incorrecta")
     .trim()
     .isLength({min: 6})
 ],
 validationResultExpress,
 register);

 router.post("/login", login);

 router.get("/protected", requireToken, infoUser);

export default router;