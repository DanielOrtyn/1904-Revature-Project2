import { User } from "./user";

export class UserBid {
    bidId?: number;
    saleItemId: number;
    bidder: User;
    maxBidPrice: number;
    currentBidPrice: number;


    constructor(saleItemId: number, bidder: User,
        maxBidPrice: number, currentBidPrice: number, bidId?: number) {
        this.saleItemId = saleItemId;
        this.bidder = bidder;
        this.maxBidPrice = maxBidPrice;
        this.currentBidPrice = currentBidPrice;
        this.bidId = bidId;
    }

    static constructViaObject(any): UserBid {
        if (any) {
            return any;
        }
        return new UserBid(any.saleItemId, User.constructViaObject(any.bidder),
            any.maxBidPrice, any.currentBidPrice, any.bidId);
    }
}