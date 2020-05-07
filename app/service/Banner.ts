import { Service, Context, mysql } from 'egg';
import { unixTime } from '../util';

/**
 * Banner Service
 */
export default class Banner extends Service {
  private db: mysql;

  constructor(ctx: Context) {
    super(ctx);
    const { app } = ctx;
    this.db = app.mysql;
  }

  public async list(offset: number, limit: number) {
    return await this.db.select('banner', {
      columns: ['id', 'title', 'index', 'cover', 'create_at'],
      orders: [['index', 'asc']],
      offset,
      limit
    });
  }

  public async get(id: string) {
    return await this.db.get('banner', { id });
  }

  public async create(data: any) {
    data = {
      ...data,
      create_at: unixTime()
    };

    const row = await this.db.insert('banner', data);
    return await this.get(row.id);
  }

  public async update(id: string, data: any) {
    await this.db.update('banner', data, { where: { id } });
    return await this.get(id);
  }
}
