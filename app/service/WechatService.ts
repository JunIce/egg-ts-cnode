import * as md5 from 'md5';
import * as qs from 'qs';
import * as randomstring from 'randomstring';
import * as request from 'request-promise';
import * as xml from 'xml';

export interface Service {
  fetchLoginOpenId(code: string): any;
}

export interface AuthCode {
  code: string;
  openid: string;
}

interface WxResponse extends AuthCode {
  errcode?: number;
  errmsg?: string;
}

export interface OrderData {
  ip: string;
  body: string;
  tradeNo: string;
  total: number;
  openid: string;
}

export default class WeiChatService implements Service {
  private appid: string;
  private secret: string;
  private mchId: string;
  private notifyUrl: string;
  private mchKey: string;

  constructor() {
    this.appid = 'wxdc5efef0a269d769';
    this.secret = 'dce00db8b2e9458f0156328c30d0b3eb';
    this.mchId = '1538471161';
    this.mchKey = '';
    this.notifyUrl = '';
  }

  public async fetchLoginOpenId(code: string): Promise<WxResponse> {
    let res: WxResponse;

    const authUrl = 'https://api.weixin.qq.com/sns/jscode2session';
    const options = {
      url: authUrl,
      qs: Object.assign(
        {
          appid: this.appid,
          secret: this.secret,
          grant_type: 'authorization_code'
        },
        { js_code: code }
      ),
      json: true
    };
    res = await request(options);

    return res;
  }

  public fetchUniFieldOrder(postData: OrderData) {
    // const url = "https://api.mch.weixin.qq.com/pay/unifiedorder";

    const data = {
      appid: this.appid,
      mch_id: this.mchId,
      body: postData.body,
      out_trade_no: postData.tradeNo,
      total_fee: postData.total,
      spbill_create_ip: postData.ip,
      notify_url: this.notifyUrl,
      trade_type: 'JSAPI',
      openid: postData.openid,
      nonce_str: randomstring.generate(12)
    };

    function alphabeticalSort(a: string, b: string) {
      return a.localeCompare(b);
    }

    const sortData = qs.stringify(data, { sort: alphabeticalSort });
    const sign = md5(`${sortData}&key=${this.mchKey}`).toUpperCase();

    const xmlData = [
      { appid: data.appid },
      { mch_id: data.mch_id },
      { body: data.body },
      { out_trade_no: data.out_trade_no },
      { total_fee: data.total_fee },
      { spbill_create_ip: data.spbill_create_ip },
      { notify_url: data.notify_url },
      { trade_type: data.trade_type },
      { openid: data.openid },
      { nonce_str: data.nonce_str },
      { sign }
    ];
    console.log(xmlData);

    return xml(xmlData, { declaration: true });
  }
}
