import { IDisplayName } from "./IDisplayName";

export class Category implements IDisplayName{
    categoryId: number;
    name: string;


    constructor(categoryId: number, name: string) {
        this.categoryId = categoryId;
        this.name = name;
    }

    displayName() {
        return this.name;
    }
}