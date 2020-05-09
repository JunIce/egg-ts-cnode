import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import * as path from 'path';

export default (appInfo: EggAppInfo) => {
  const config = {
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
  config.middleware = ['locals', 'notFoundError'];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`
  };

  config.locals = {
    name: 'CNode技术社区',
    description: 'CNode：Node.js专业中文社区',
    site_logo: '/public/images/cnodejs_light.svg'
  };

  config.view = {
    root: path.join(appInfo.baseDir, 'app/view'),
    defaultViewEngine: 'ejs',
    defaultExtension: '.ejs',
    mapping: {
      '.ejs': 'ejs',
    }
  };

  config.redis = {
    client: {
      port: 6388,          // Redis port
      host: '127.0.0.1',   // Redis host
      password: '',
      db: 0,
    }
  };

  config.tags = [
    {
      title: '全部',
      tab: 'all'
    },
    {
      title: '精华',
      tab: 'good'
    },
    {
      title: '分享',
      tab: 'share'
    },
    {
      title: '问答',
      tab: 'ask'
    },
    {
      title: '职位',
      tab: 'job'
    }
  ];

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig
  };
};
