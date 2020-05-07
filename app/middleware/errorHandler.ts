import { Context } from 'egg';

export default function errorHandler() {
  return async (ctx: Context, next: () => Promise<any>) => {
    try {
      await next();
    } catch (err) {
      console.log('error', err);

      const status = err.status || 500;
      const message = err.message || 'Internal Server Error';

      // HTTP Code
      ctx.status = status;

      // 生产环境
      const isProd = ctx.app.config.env === 'prod';

      // 错误响应对象
      ctx.body = {
        code: -1,
        message: (status === 500 && isProd) ? 'Internal Server Error' : message
      };
    }
  };
}
