import { Img } from "./Img";

export class User {
  userId: number;
  username: string;
  password: string;
  name: string;
  email: string;
  postal: string;
  profileImg: Img;

  constructor(userId = 0, username = '', password = '', name = '', email='', postal='', img:Img) {
    this.userId = userId;
    this.username = username;
    this.password = password;
    this.name = name;
    this.email = email;
    this.postal = postal;
    this.profileImg = img;
  }
}