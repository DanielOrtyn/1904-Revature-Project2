import { SaleItem } from "./saleItem";
import { IUser } from "./user_interface";

export class UserBid {
    saleItem: SaleItem;
    bider: IUser;
    maximumBidPrice: number;
    currentBidPrice: number;


    constructor(saleItem: SaleItem, bider: IUser, maximumBidPrice: number, currentBidPrice: number) {
        this.saleItem = saleItem;
        this.bider = bider;
        this.maximumBidPrice = maximumBidPrice;
        this.currentBidPrice = currentBidPrice;
    }
}