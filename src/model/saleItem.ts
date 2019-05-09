import { UserBid } from "./UserBid";
import { IUser } from "./user_interface";

export class SaleItem {
    itemId: number;
    seller: IUser;
    imageUrl: string;
    currentBid?: UserBid;
    minimumBidPrice: number;
    title: string;
    description: string;


    constructor(itemId: number, seller: IUser, imageUrl: string,
        minimumBidPrice: number, title: string,
        description: string, currentBid?: UserBid) {
        this.itemId = itemId;
        this.seller = seller;
        this.imageUrl = imageUrl;
        this.currentBid = currentBid;
        this.minimumBidPrice = minimumBidPrice;
        this.title = title;
        this.description = description;
    }

    getCurrentBidPrice(): number {
        return this.currentBid ? this.currentBid.currentBidPrice : this.minimumBidPrice
    }
}