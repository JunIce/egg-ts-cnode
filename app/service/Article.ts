import { Service, Context, mysql } from 'egg';
import { unixTime } from '../util';
/**
 * Article Service
 */
export default class Article extends Service {
  private db: mysql;
  private dbname: string;

  constructor(ctx: Context) {
    super(ctx);
    const { app } = ctx;
    this.db = app.mysql;
    this.dbname = 'article';
  }

  public async list(offset: number, limit: number) {
    const list = await this.db.select('article', {
      columns: ['id', 'title', 'cover', 'content', 'create_at'],
      offset,
      limit
    });
    return list;
  }

  public async get(id: string) {
    return await this.db.get(this.dbname, { id });
  }

  public async create(data: any) {
    data = {
      ...data,
      create_at: unixTime(),
      update_at: unixTime()
    };

    const row = await this.db.insert('article', data);
    return await this.get(row.id);
  }

  public async update(id: string, data: any) {
    data = { ...data, update_at: unixTime() };
    await this.db.update(this.dbname, data, { where: { id } });
    return await this.get(id);
  }
}
