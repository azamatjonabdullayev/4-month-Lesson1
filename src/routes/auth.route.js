import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";

export const authRoute = Router();
const controller = new AuthController();

authRoute.post("/login", (req, res, next) => {
  controller.signIn(req, res, next);
});

authRoute.post("/register", (req, res, next) => {
  controller.singUp(req, res, next);
});
