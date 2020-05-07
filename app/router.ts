import { Application } from 'egg';
// import { authMiddleware } from './middleware/authentication';

export default (app: Application) => {
  const { router, controller } = app;
  router.get('/home', controller.home.list);

  router.get('/account/login', controller.user.login);
  router.get('/account/register', controller.user.register);
};
