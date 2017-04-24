import { Injectable } from '@angular/core';
import {SQLite} from 'ionic-native';

@Injectable()
export class SQLiteService {
  public db: SQLite;
  public isOpen: boolean;
  private createUserTable:string="CREATE TABLE IF NOT EXISTS t_user ( id CHAR (255),username CHAR (255),password CHAR (255),nickname CHAR (255),telNum CHAR (255),sex int,age int,imgUrl CHAR (255),token CHAR (255))";
  constructor(){
    this.db = new SQLite();
    if(!this.isOpen){
      let sql=this.createUserTable;
      console.log(sql);
      this.openDataBase(sql);
      //标识已经开启
      this.isOpen=true;
    }
  }
  /**
   * 打开数据库连接
   */
  openDataBase(sql){
    this.db.openDatabase({
      name: 'data.db',
      location: 'default' // the location field is required
    }).then(() => {
      this.db.executeSql(sql, {}).then(() => {
        console.info('success createTable')
      }, (err) => {
        console.error('Unable to execute sql: ', err);
      });
    }, (err) => {
      console.error('Unable to open database: ', err);
    });
  }

}
