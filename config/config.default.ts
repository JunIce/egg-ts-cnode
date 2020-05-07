import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import * as path from 'path';

export default (appInfo: EggAppInfo) => {
  const config = {
    mysql: {
      client: {
        // host
        host: '0.0.0.0',
        // 端口号
        port: '3312',
        // 用户名
        user: 'root',
        // 密码
        password: '123456',
        // 数据库名
        database: 'vue',
      },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false
    },
    security: {
      csrf: {
        enable: false,
      },
    }
  } as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1570276279589_4278';

  // add your egg config in here
  config.middleware = ['notFoundError'];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`
  };

  config.view = {
    root: path.join(appInfo.baseDir, 'app/view'),
    defaultViewEngine: 'ejs',
    defaultExtension: '.ejs',
    mapping: {
      '.ejs': 'ejs',
    }
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig
  };
};
