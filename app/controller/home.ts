import { Controller } from 'egg';

export default class HomeController extends Controller {

  public async list() {
    const { ctx } = this;

    await ctx.render('index.ejs', {
      user: {
        name: 'JAck'
      }
    });
  }

}
