import { Injectable } from '@angular/core';
@Injectable()
export class validUtil{
constructor(){

}

  /**
   * 生成验证码
   * @param len
   * @returns {string}
   */
  createRandomCode(len) {
    let code="";
    let codeLength=len;
    let random = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',
    'S','T','U','V','W','X','Y','Z'];//随机数
  for(let i = 0; i < codeLength; i++) {//循环操作
    let index = Math.floor(Math.random()*36);//取得随机数的索引（0~35）
    code += random[index];//根据索引取得随机数加到code上
  }
  return code;
}
  /**
   * 是否为空
   * @param value
   * @returns {boolean}
   */
  isEmply(value){
    if(value==null||value==undefined||value=="")
      return true;
    return false;
  }
  /**
   * 验证email
   * @param value
   * @returns {boolean}
   */
  emailValidator(value){
    let emailCode = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
    if (!value.match(emailCode)) {
      return true;
    }
    return false;
  }

  /**
   * 验证手机号
   * @param value
   * @returns {boolean}
   */
  phonenNumValidator(value){
    let mobile=/^((13[0-9]{1})|159|153)+\d{8}$/;
    if(!value.match(mobile)){
      return true;
    }else{
      return false;
    }
  }




}
