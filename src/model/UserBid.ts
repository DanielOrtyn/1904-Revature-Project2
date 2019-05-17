import { SaleItem } from "./saleItem";
import { User } from "./user";

export class UserBid {
    saleItemId: number;
    bidder: User;
    maxBidPrice: number;
    currentBidPrice: number;


    constructor(saleItemId: number, bidder: User, maxBidPrice: number, currentBidPrice: number) {
        this.saleItemId = saleItemId;
        this.bidder = bidder;
        this.maxBidPrice = maxBidPrice;
        this.currentBidPrice = currentBidPrice;
    }

    static constructViaObject(any): UserBid {
        if (any) {
            return any;
        }
        return new UserBid(any.saleItemId, User.constructViaObject(any.bidder),
            any.maxBidPrice, any.currentBidPrice);
    }
}