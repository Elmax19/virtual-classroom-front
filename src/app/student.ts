export class Student{
  constructor(public login:string, public hand:boolean){}

  changeHand(){
    this.hand=!this.hand;
  }
}
