import JWT from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export class Jwt {
  static generateToken (data: object, exp = '1d') {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is not defined');
    }
    return JWT.sign(data, secret, { expiresIn: exp });
  }

  static verifyToken (token: string) {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is not defined');
    }
    return JWT.verify(token, secret, (err: any, decoded: any) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          const { phoneNumber } = JWT.decode(token) as { phoneNumber: string };
          return { expired: phoneNumber}
        }
        return { error: err }
      }
      return { value: decoded }
    })
  }
}
