export class Img{
    imgID: number;
    url: string;
    title: string;

    constructor(imgID: number, url: string, title: string){
        this.imgID = imgID;
        this.url = url;
        this.title = title;
    }
}