// auth.controller.ts
import { Request, Response } from 'express';
import AuthService from '../services/auth.service';


class AuthController {
  async register(req: Request, res: Response) {
    try {
    
      const { username, email, password } = req.body;
      const user = await AuthService.register({ username, email, password });
      res.status(201).json(user);
    } catch (error:any) {
      console.log(error)
      res.status(500).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      console.log(req.body)
      const user = await AuthService.login(email, password);
      res.status(200).json(user);
    } catch (error:any) {
      res.status(401).json({ error: error.message });
    }
  }

  async generateResetToken(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const resetToken = await AuthService.generateResetToken(email);
      res.status(200).json({ resetToken });
    } catch (error:any) {
      res.status(500).json({ error: error.message });
    }
  }

  async resetPassword(req: Request, res: Response) {
    try {
      const { token, newPassword } = req.body;
      const decodedToken:any = await AuthService.verifyResetToken(token);
      await AuthService.resetPassword(decodedToken.userId, newPassword);
      res.status(200).json({ message: 'Password reset successfully' });
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new AuthController();
