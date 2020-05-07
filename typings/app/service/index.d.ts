// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportArticle from '../../../app/service/Article';
import ExportAuthentication from '../../../app/service/Authentication';
import ExportBanner from '../../../app/service/Banner';
import ExportCustomer from '../../../app/service/Customer';
import ExportUser from '../../../app/service/User';
import ExportVideo from '../../../app/service/Video';
import ExportWechatService from '../../../app/service/WechatService';

declare module 'egg' {
  interface IService {
    article: ExportArticle;
    authentication: ExportAuthentication;
    banner: ExportBanner;
    customer: ExportCustomer;
    user: ExportUser;
    video: ExportVideo;
    wechatService: ExportWechatService;
  }
}
