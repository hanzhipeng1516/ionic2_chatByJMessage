import { Injectable } from '@angular/core';
import { Storage }from '@ionic/storage'
/**
 * 存储服务
 */
@Injectable()
export class storageService{
  public storage:Storage;
  constructor(){
    this.storage=new Storage();
  }
  /**
   * 存储
   * @param key
   * @param value
   */
  write(key: string, value: any) {
    if (value) {
      value = JSON.stringify(value);
    }
    this.storage.set(key, value);
  }

  /**
   * 读取
   * @param key
   * @returns {any}
   */
  read(key: string) {
    return this.storage.get(key);
  }

  /**
   * 清除
   * @param key
   */
  remove(key: string) {
    this.storage.remove(key);
  }

  /**
   * 清空存储
   */
  clear() {
    this.storage.clear();
  }
}
