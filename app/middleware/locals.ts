import { Context } from 'egg';

export default function locals(options: any) {
    return async (ctx: Context, next: () => Promise<any>) => {
        ctx.locals = options;
        await next();
    };
}
