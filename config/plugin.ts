import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  static: true,

  mysql: {
    enable: true,
    package: 'egg-mysql'
  },

  ejs: {
    enable: true,
    package: 'egg-view-ejs',
  },

  redis: {
    enable: true,
    package: 'egg-redis',
  }
};

export default plugin;
