import prisma from "../config/db.connect.js";
import CustomError from "../utils/error.utils.js";
import bcrypt from "bcrypt";

export default class UserService {
  async getUsers() {
    const users = await prisma.users.findMany();
    return users;
  }

  async getUserById(id) {
    const user = await prisma.users.findUnique({
      where: {
        id: String(id),
      },
    });

    if (!user) throw new CustomError("User not found", 404);

    return user;
  }

  async createUser({ username, email, password, description = null }) {
    const existUsername = await prisma.users.findUnique({
      where: {
        username,
      },
    });
    if (existUsername) throw new CustomError("Username already exists", 400);

    const existEmail = await prisma.users.findUnique({
      where: {
        email,
      },
    });
    if (existEmail) throw new CustomError("Email already exists", 400);

    const hashed = await bcrypt.hash(password, 12);

    const userData = { username, email, password: hashed };

    if (description) userData.description = description;

    const newUser = await prisma.users.create({ data: userData });

    return newUser;
  }

  async updateUser(id, data) {
    const exists = await prisma.users.findUnique({
      where: { id: String(id) },
    });

    if (!exists) throw new CustomError("User not found", 404);

    const existUsername = await prisma.users.findUnique({
      where: {
        username: data.username,
      },
    });
    if (existUsername) throw new CustomError("Username already exists", 400);

    const existEmail = await prisma.users.findUnique({
      where: {
        email: data.email,
      },
    });
    if (existEmail) throw new CustomError("Email already exists", 400);

    const hashed = await bcrypt.hash(data.password, 12);

    const updatedUser = await prisma.users.update({
      where: { id: String(id) },
      data: {
        ...data,
        password: hashed,
      },
    });

    return updatedUser;
  }

  async deleteUser(id) {
    const exists = await prisma.users.findUnique({
      where: { id: String(id) },
    });

    if (!exists) throw new CustomError("User not found", 404);

    const deletedUser = await prisma.users.delete({
      where: { id: String(id) },
    });

    return deletedUser;
  }
}
