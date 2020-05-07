import { Service, Context, mysql } from 'egg';
import * as jwt from 'jsonwebtoken';

export interface User {
  id?: number;
  email: string;
  password: string;
  role: string;
  name: string;
}

export interface AuthUser {
  id?: number;
  email: string;
  role: string;
}

export interface Customer {
  id?: number;
  openid: string;
  session_key: string;
}

export default class AuthenticationService extends Service {
  private secret: string;
  private db: mysql;

  constructor(ctx: Context) {
    super(ctx);
    this.secret = 'secret';
    const { app } = ctx;
    this.db = app.mysql;
  }

  public authenticate(user: User): string {
    return jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      this.secret,
      {
        expiresIn: 60 * 60 * 60
      }
    );
  }

  public async validate(token: string): Promise<AuthUser> {
    try {
      const decode: any = jwt.verify(token, this.secret);
      const user = await this.db.get('user', {
        email: decode.email
      });

      return {
        id: user.id,
        email: user.email,
        role: user.role
      };
    } catch (err) {
      throw new Error(err);
    }
  }

  public authenticateCustomer(customer: Customer): string {
    return jwt.sign(
      { id: customer.id, openid: customer.openid, session_key: customer.session_key },
      this.secret,
      {
        expiresIn: 60 * 60 * 60
      }
    );
  }

  public async validateCustomer(token: string): Promise<Customer> {
    try {
      const decode: any = jwt.verify(token, this.secret);
      const customer = await this.ctx.service.customer.get(decode.id);

      return customer;
    } catch (err) {
      throw new Error(err);
    }
  }
}
