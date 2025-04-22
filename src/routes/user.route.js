import { Router } from "express";
import UserController from "../controllers/user.controller.js";

export const userRoute = Router();
const controller = new UserController();

userRoute.get("/users", (req, res, next) => {
  if (req.query.id) {
    controller.showUserById(req, res, next);
  } else {
    controller.showUsers(req, res, next);
  }
});

userRoute.post("/user/new", (req, res, next) => {
  controller.addUser(req, res, next);
});

userRoute.post("/user/update", (req, res, next) => {
  controller.updateUser(req, res, next);
});

userRoute.delete("/user/delete", (req, res, next) => {
  controller.deleteUser(req, res, next);
});
