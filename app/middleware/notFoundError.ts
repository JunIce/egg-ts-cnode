import { Context } from 'egg';

export default function notFoundError() {
  return async (ctx: Context, next: () => Promise<any>) => {
    await next();
    if (ctx.status === 404 && !ctx.body) {
      if (ctx.acceptJSON) {
        ctx.body = { error: 'Not Found' };
      } else {
        await ctx.render('error/404.ejs');
      }
    }
  };
}
