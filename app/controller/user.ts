import { Controller } from 'egg';

export default class UserController extends Controller {

  public async login() {
    const { ctx } = this;

    await ctx.render('login');
  }

  public async register() {
    const { ctx } = this;

    await ctx.render('register');
  }

}
