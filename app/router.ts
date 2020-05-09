import { Application } from 'egg';
import WebRouter from './router/web';

export default (app: Application) => {

  WebRouter(app);
};
