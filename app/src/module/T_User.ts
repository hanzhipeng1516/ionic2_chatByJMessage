export class T_User{
  private _id:string;
  private _username:string;
  private _password:string;
  private _nickname:string;
  private _telNum:string;
  private _sex:number;
  private _age:number;
  private _imgUrl:string;
  private _token:string;
  private _createTime:string;
  constructor(
     id:string,
   username:string,
   password:string,
   nickname:string,
   telNum:string,
   sex:number,
   age:number,
   imgUrl:string,
   token:string,
   createTime:string,
  ){
    this._id=id;
    this._username=username;
    this._password=password;
    this._nickname=nickname;
    this._telNum=telNum;
    this._sex=sex;
    this._age=age;
    this._imgUrl=imgUrl;
    this._token=token;
    this._createTime=createTime;
  }
  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get nickname(): string {
    return this._nickname;
  }

  set nickname(value: string) {
    this._nickname = value;
  }

  get telNum(): string {
    return this._telNum;
  }

  set telNum(value: string) {
    this._telNum = value;
  }

  get sex(): number {
    return this._sex;
  }

  set sex(value: number) {
    this._sex = value;
  }

  get age(): number {
    return this._age;
  }

  set age(value: number) {
    this._age = value;
  }

  get imgUrl(): string {
    return this._imgUrl;
  }

  set imgUrl(value: string) {
    this._imgUrl = value;
  }

  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
  }

  get createTime(): string {
    return this._createTime;
  }

  set createTime(value: string) {
    this._createTime = value;
  }
}
