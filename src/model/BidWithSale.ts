import { User } from "./user";
import { SaleItem } from "./saleItem";

export class BidWithSale {
    bidId: number;
    saleItem: SaleItem;
    bidder: User;
    maxBidPrice: number;
    currentBidPrice: number;


    constructor(bidId: number, saleItem: SaleItem, bidder: User, maxBidPrice: number, currentBidPrice: number) {
        this.bidId = bidId;
        this.saleItem = saleItem;
        this.bidder = bidder;
        this.maxBidPrice = maxBidPrice;
        this.currentBidPrice = currentBidPrice;
    }

    static constructViaObject(any): BidWithSale {
        if (any) {
            return any;
        }
        return new BidWithSale(any.bidId, any.saleItem, User.constructViaObject(any.bidder),
            any.maxBidPrice, any.currentBidPrice);
    }
}