import { Context } from 'egg';
import { Redis } from 'ioredis';
import { BaseService } from './Base';

export default class Home extends BaseService {
    private redis: Redis;

    constructor(ctx: Context) {
        super(ctx);
        const { app } = ctx;
        this.redis = app.redis;
    }

    public async pagelist(tab: string = 'all', page: number = 1) {
        let list: any;
        const key = `home/list/${tab}/${page}`;
        list = await this.redis.get(key);

        if (!list) {
            list = await this.get(`/topics?tab=${tab}&page=${page}`);
            await this.redis.set(key, JSON.stringify(list));
        } else {
            list = JSON.parse(list);
        }
        return list;
    }

    public async detail(id: string) {
        let detail: any;
        const key = '/topic/' + id;
        detail = await this.redis.get(key);

        if (!detail) {
            detail = await this.get(key);
            console.log('detail', detail);

            await this.redis.set(key, JSON.stringify(detail));
        } else {
            detail = JSON.parse(detail);
        }
        return detail;
    }
}
