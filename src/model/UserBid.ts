import { SaleItem } from "./saleItem";
import { User } from "./user";

export class UserBid {
    saleItem: SaleItem;
    bider: User;
    maximumBidPrice: number;
    currentBidPrice: number;


    constructor(saleItem: SaleItem, bider: User, maximumBidPrice: number, currentBidPrice: number) {
        this.saleItem = saleItem;
        this.bider = bider;
        this.maximumBidPrice = maximumBidPrice;
        this.currentBidPrice = currentBidPrice;
    }

    static constructViaObject(any): UserBid {
        if (any) {
            return any;
        }
        return new UserBid(SaleItem.constructViaObject(any.saleItem),
            User.constructViaObject(any.bider), any.maximumBidPrice,
            any.currentBidPrice);
    }
}