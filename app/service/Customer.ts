import { Service, Context, mysql } from 'egg';

/**
 * Customer Service
 */
export default class Customer extends Service {
  private db: mysql;

  constructor(ctx: Context) {
    super(ctx);
    const { app } = ctx;
    this.db = app.mysql;
  }

  public async get(id: number) {
    let customerList = await this.db.select('customer', {
      columns: ['id', 'nickName', 'avatarUrl', 'gender', 'country', 'province', 'city'],
      where: { id },
      limit: 1
    });
    return customerList[0];
  }

  public async findByOpenId(openid: string) {
    const target = await this.db.get('customer', { openid });
    if (target) return await this.get(target.id);
    return null;
  }

  public async create(data: any) {
    const row = await this.db.insert('customer', data);
    return await this.get(row.id);
  }

  public async update(id: number, data: any) {
    await this.db.update('customer', data, { where: { id } });
    return await this.get(id);
  }

  public async auth(openid: string, data: any) {
    const customer = await this.findByOpenId(openid);
    let row = {};
    if (!customer) {
      row = await this.create(data);
    } else {
      row = await this.update(customer.id, data);
    }
    return row;
  }
}
