
export class ImageModel {
    imgId: number;
    url: string;
    title: string;

    constructor(imgId: number, url: string, title: string) {
        this.imgId = imgId;
        this.url = url;
        this.title = title;
    }

    static constructViaObject(any): ImageModel {
        if (any) {
            return any;
        }
        return new ImageModel(any.imgId, any.url, any.title);
    }
}