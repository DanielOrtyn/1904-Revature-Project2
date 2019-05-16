import { ImageModel } from "./imageModel";

export class User {
    userId: number;
    username: string;
    password: string;
    name: string;
    email: string;
    postal: string;
    profileImg: ImageModel;
    rating: number;
    ratingCount: number;

    constructor(userId = 0, username = '', password = '', name = '',
     email = '', postal = '', profileImg: ImageModel, rating: number, ratingCount: number) {
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.name = name;
        this.email = email;
        this.postal = postal;
        this.profileImg = profileImg;
        this.rating = rating;
        this.ratingCount = ratingCount;
    }

    static constructViaObject(any): User {
        if (any) {
            return any;
        }
        return new User(any.userId, any.username, any.password,
            any.name, any.email, any.postal, any.profileImg, any.rating, any.ratingCount);
    }
}