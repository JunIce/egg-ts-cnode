import { Controller } from 'egg';

export default class HomeController extends Controller {

  public async index() {
    const { ctx, app } = this;

    const { tab, page } = ctx.query;
    // console.log('tab', tab);
    let activeTab = tab || 'all';
    let list = await ctx.service.home.pagelist(activeTab, page);

    let pagination = {
      current: page || 1,
    };

    await ctx.render('index', {
      list: list.data,
      tags: app.config.tags,
      activeTab,
      pagination
    });
  }

  public async topic() {
    const { ctx } = this;
    const { id } = ctx.params;

    if (!id) {
      ctx.redirect('/404');
      return;
    }

    let data = await ctx.service.home.detail(id);
    let detail = data.data;

    await ctx.render('page/topic/index', {
      data: detail,
      pageTitle: detail.title
    });
  }

}
