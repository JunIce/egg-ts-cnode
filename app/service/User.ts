import { Service, Context, mysql } from 'egg';
import { BCryptHasher, Hasher } from '../lib/hasher';

/**
 * User Service
 */
export default class User extends Service {
  private db: mysql;
  private hasher: Hasher;

  constructor(ctx: Context) {
    super(ctx);
    const { app } = ctx;
    this.db = app.mysql;
    this.hasher = new BCryptHasher();
  }

  public async list() {
    return await this.db.select('user', {
      columns: ['id', 'email', 'role', 'name', 'created']
    });
  }

  public async get(id: string) {
    return await this.db.get('user', { id });
  }

  public async findByEmail(email: string) {
    return await this.db.get('user', { email });
  }

  public async login(email: string, password: string) {
    const user = await this.db.get('user', { email });
    if (this.hasher.verifyPassword(password, user.password)) {
      return {
        user, accessToken: this.ctx.service.authentication.authenticate(user)
      };
    }
  }

  public async create(data: any) {
    const password = await this.hasher.hashPassword(data.password);
    data = {
      ...data,
      password,
      created: new Date(),
      updated: new Date()
    };

    const row = await this.db.insert('user', data);
    return await this.get(row.id);
  }

  public async update(id: string, data: any) {
    await this.db.update('user', data, { where: { id } });
    return await this.get(id);
  }
}
