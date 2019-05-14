import { UserBid } from "./UserBid";
import { IUser } from "./user_interface";
import { Category } from "./category";
import { ImageModel } from "./imageModel";

export class SaleItem {
    saleId: number;
    seller: IUser;
    itemImg: ImageModel;
    currentBid: UserBid;
    minPrice: number;
    endDate: string;
    title: string;
    description: string;
    category: Category;

    constructor(saleId: number, seller: IUser, itemImg: ImageModel,
        currentBid: UserBid, minPrice: number, endDate: string,
        title: string, description: string, category: Category) {
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

    getCurrentBidPrice(): number {
        return this.currentBid.currentBidPrice;
    }
}