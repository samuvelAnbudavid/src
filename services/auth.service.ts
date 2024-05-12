// auth.service.ts
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

class AuthService {
  async register(userData: { username: string; email: string; password: string }) {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      return await User.create({ ...userData, password: hashedPassword });
    } catch (error) {
      
      throw new Error('Error registering user');
    }
  }

  async login(email: string, password: string) {
    try {
      const user = await User.findOne({ where: { email } });
      console.log(user)
      if (!user) throw new Error('User not found');

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) throw new Error('Invalid password');

      return user;
    } catch (error) {
      throw new Error('Error logging in');
    }
  }

  async generateResetToken(email: string) {
    try {
      const user:any = await User.findOne({ where: { email } });
      if (!user) throw new Error('User not found');

      // Generate a JWT token for resetting password
      const resetToken = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });
      return resetToken;
    } catch (error) {
      throw new Error('Error generating reset token');
    }
  }

  async verifyResetToken(token: string) {
    try {
      const decodedToken = jwt.verify(token, 'your_secret_key');
      return decodedToken;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  async resetPassword(userId: number, newPassword: string) {
    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const user = await User.findByPk(userId);
      if (!user) throw new Error('User not found');
      user.password = hashedPassword;
      await user.save();
    } catch (error) {
      throw new Error('Error resetting password');
    }
  }
}

export default new AuthService();
