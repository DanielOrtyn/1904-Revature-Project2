import { UserBid } from "./UserBid";
import { Category } from "./category";
import { ImageModel } from "./imageModel";
import { User } from "./user";

export class SaleItem {
    saleId: number;
    seller: User;
    itemImg: ImageModel;
    currentBid?: UserBid;
    minPrice: number;
    endDate: string;
    title: string;
    description: string;
    category: Category;

    constructor(saleId: number, seller: User, itemImg: ImageModel,
        minPrice: number, endDate: string, title: string, description: string,
        category: Category, currentBid?: UserBid) {
        this.saleId = saleId;
        this.seller = seller;
        this.itemImg = itemImg;
        this.currentBid = currentBid;
        this.minPrice = minPrice;
        this.endDate = endDate;
        this.title = title;
        this.description = description;
        this.category = category;
    }

    static constructViaObject(any): SaleItem {
        if (any) {
            return any;
        }
        return new SaleItem(any.saleId, User.constructViaObject(any.seller),
            ImageModel.constructViaObject(any.itemImg),
            any.minPrice, any.endDate, any.title, any.description,
            Category.constructViaObject(any.category), UserBid.constructViaObject(any.currentBid));
    }
}