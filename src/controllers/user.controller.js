import UserService from "../services/user.service.js";

export default class UserController {
  constructor() {
    this.service = new UserService();
  }

  async showUsers(req, res, next) {
    try {
      const allUsers = await this.service.getUsers();
      res.status(200).json(allUsers);
    } catch (error) {
      next(error);
    }
  }

  async showUserById(req, res, next) {
    try {
      const { id } = req.query;
      const user = await this.service.getUserById(id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async addUser(req, res, next) {
    try {
      const user = await this.service.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const { id } = req.query;
      const user = await this.service.updateUser(id, req.body);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const { id } = req.query;
      await this.service.deleteUser(id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}
