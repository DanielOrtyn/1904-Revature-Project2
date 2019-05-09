import { SaleItem } from "../model/saleItem";
import { IUser } from "../model/user_interface";

export const testImageUrl = 'https://cdn.shopify.com/s/files/1/0232/3305/products/JMO_4587.jpg?v=1510001224';
export const testUserSeller: IUser = { userId: 1, username: "BobSeller", name: "Bob Jones" };
export const testItem: SaleItem = new SaleItem(1, testUserSeller, testImageUrl,
    5, 'Wheel', 'Awsome Wheel: Which makes wheels that would otherwise be considered the most awsomest of awsome like shoddy and useless by comparison', undefined);