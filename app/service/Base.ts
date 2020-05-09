import { Service, Context, mysql } from 'egg';
import * as dayjs from 'dayjs';

export interface BaseService {
    list(offset: number, limit: number, where: object): Promise<any>;
}

export class BaseService extends Service {
    private db: mysql;
    public base = 'https://cnodejs.org/api/v1';
    public ctx: Context;
    public tablename: string;

    constructor(ctx: Context) {
        super(ctx);
        const { app } = ctx;
        this.ctx = ctx;
        this.db = app.mysql;
    }

    public async list(offset: number, limit: number, where: object) {
        return await this.db.select(this.tablename, {
            where,
            columns: ['id', 'name', 'description', 'create_time'],
            orders: [['create_time', 'asc']],
            offset,
            limit
        });
    }

    public async findOne(id: number) {
        return await this.db.get(this.tablename, { id });
    }

    public async deleteOne(id: number) {
        return await this.db.query(`delete from ${this.tablename} where id = ?`, [id]);
    }

    public async update(row: any) {
        if (row.id) {
            return await this.db.update(this.tablename, row, { where: { id: row.id } });
        }
    }

    public async save(row: any) {
        row.create_time = dayjs().format('YYYY-MM-DD HH:mm:ss');
        return await this.db.insert('brand', row);
    }

    public async get(url: string, options: any = {}) {
        let { res: { statusCode, data } } = await this.ctx.curl(this.base + url, { ...options, dataType: 'json' });

        if (statusCode === 200) {
            return data;
        }

        return statusCode;
    }
}
