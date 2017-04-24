import { Injectable } from '@angular/core';
import {Http,Headers,RequestOptions} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {BASE64} from './base64'
/**
 * 网络服务
 */
@Injectable()
export class netService{
  constructor(private http:Http,private base64:BASE64) { }

  /**
   * get请求
   * @param url
   * @param mParam
   * @returns {Promise<TResult|T>}
   */
  public httpGet(url: string,mParam:string) {
    let params:string=this.base64.base64encode(mParam);
    console.log("param:  "+params);
    let mUrl=url+"?mData="+params;
    console.log(mUrl);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.get(mUrl, options).toPromise()
      .then(res => res)
      .catch(err => {
        return err;
      });
  }

  /**
   * post请求
   * @param url
   * @param mParam
   * @returns {Promise<TResult|T>}
   */
  public httpPost(url: string,mParam:string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url, {
      "mData":this.base64.base64encode(mParam)
    }, options).toPromise()
      .then(res =>res)
      .catch(err => {
        return err;
      });
  }
}
