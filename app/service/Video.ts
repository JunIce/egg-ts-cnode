import { Service, Context, mysql } from 'egg';
import { unixTime } from '../util';
/**
 * Video Service
 */
export default class Video extends Service {
  private db: mysql;

  constructor(ctx: Context) {
    super(ctx);
    const { app } = ctx;
    this.db = app.mysql;
  }

  public async list(offset: number, limit: number, where: object) {
    return await this.db.select('video', {
      where,
      columns: ['id', 'title', 'sub_title', 'star', 'course', 'content', 'cover', 'url', 'status', 'sortNo', 'create_at'],
      orders: [['sortNo', 'asc']],
      offset,
      limit
    });
  }

  public async get(id: string) {
    return await this.db.get('video', { id });
  }
  public async create(data: any) {
    data = {
      ...data,
      create_at: unixTime(),
      update_at: unixTime()
    };

    const row = await this.db.insert('video', data);
    return await this.get(row.id);
  }

  public async update(id: string, data: any) {
    data = {
      ...data,
      update_at: unixTime()
    };
    await this.db.update('video', data, { where: { id } });
    return await this.get(id);
  }
}
