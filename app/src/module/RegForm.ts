export class RegForm{
  private _username:string;
  private _password1:string;
  private _password2:string;
  private _validCode:string;
  constructor(
    _username:string,
    _validCode:string,
    _password1:string,
    _password2:string,
  ){
    this._username = _username;
    this._validCode = _validCode;
    this._password1 = _password1;
    this._password2 = _password2;
  }

  get validCode(): string {
    return this._validCode;
  }

  set validCode(value: string) {
    this._validCode = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get password1(): string {
    return this._password1;
  }

  set password1(value: string) {
    this._password1 = value;
  }

  get password2(): string {
    return this._password2;
  }

  set password2(value: string) {
    this._password2 = value;
  }
}
