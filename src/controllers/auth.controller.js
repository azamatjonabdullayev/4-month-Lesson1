import AuthService from "../services/auth.service.js";

export default class AuthController {
  constructor() {
    this.service = new AuthService();
  }

  async signIn(req, res, next) {
    try {
      const token = await this.service.login(req.body);
      res.cookie("token", token, { maxAge: 60_000 * 60 * 2 });
      res.status(200).json(token);
    } catch (error) {
      next(error);
    }
  }

  async singUp(req, res, next) {
    try {
      const token = await this.service.register(req.body);
      res.cookie("token", token, { maxAge: 60_000 * 60 * 2 });
      res.status(201).json(token);
    } catch (error) {
      next(error);
    }
  }
}
