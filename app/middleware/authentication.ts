import { Context } from 'egg';

export const authMiddleware = () => async (ctx: Context, next: () => Promise<any>) => {
  const token = ctx.headers.authorization;
  const user = await ctx.service.authentication.validate(token);
  ctx.state.user = user;
  await next();
};
