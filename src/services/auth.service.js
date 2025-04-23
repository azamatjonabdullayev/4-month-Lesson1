import prisma from "../config/db.connect.js";
import CustomError from "../utils/error.utils.js";
import UserService from "./user.service.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default class AuthService {
  constructor() {
    this.userService = new UserService();
  }

  async register(data) {
    const token = await this.userService.createUser(data);
  }

  async login({ username, password }) {
    const exists = await prisma.users.findUnique({ where: { username } });

    if (!exists) throw new CustomError("User not found", 400);

    const compare = await bcrypt.compare(password, exists.password);

    if (!compare) throw new CustomError("Password is incorrect", 400);

    const token = jwt.sign({ ...exists, password: null }, process.env.JWT, {
      expiresIn: "3h",
    });

    return token;
  }
}
