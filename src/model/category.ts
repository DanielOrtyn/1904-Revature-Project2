import { IDisplayName } from "./IDisplayName";

export class Category implements IDisplayName {
    categoryId: number;
    name: string;


    constructor(categoryId: number, name: string) {
        this.categoryId = categoryId;
        this.name = name;
    }

    static constructViaObject(any): Category {
        if (any) {
            return any;
        }
        return new Category(any.categoryId, any.name);
    }

    displayName() {
        return this.name;
    }
}