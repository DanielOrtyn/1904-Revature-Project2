import React from 'react';
import { SaleItem } from '../../model/saleItem';
import { Category } from '../../model/category';
import { environment } from '../../environment';
import { SaleItemListComponent } from './saleitem-list.component';
import { DropDownListInputComponent } from '../input/dopdownlist.component';
import { IDisplayName } from '../../model/IDisplayName';

const allCategory = new Category(-1, 'All')

interface ISaleItemListComponentState {
    categoryShown: Category;
    listOfCategories: Category[];
    saleItemList: SaleItem[];
}

export class SaleItemCategoryListComponent extends React.Component<any, ISaleItemListComponentState> {

    constructor(props: any) {
        super(props);
        this.state = {
            categoryShown: allCategory,
            listOfCategories: [],
            saleItemList: []
        };
    }

    changeCategoryShown = (newCategory: IDisplayName) => {
        if (newCategory && newCategory instanceof Category) {
            console.log("change cate");
            console.log(this.state.categoryShown.name);
            this.setState({
                categoryShown: newCategory
            });
            this.fetchCategorySaleItemList(newCategory);
        }
    }

    componentDidMount = async () => {
        this.fetchCategorySaleItemList(this.state.categoryShown);
        this.fetchListOfCategories();
    }

    fetchListOfCategories = async () => {
        let newlistOfCategories: Category[] = [];
        const resp = await fetch(environment.context + '/category', {
            method: 'GET',
            credentials: 'include'
        });
        newlistOfCategories = await resp.json();
        newlistOfCategories = newlistOfCategories.map(item =>
            new Category(item.categoryId, item.name));
        newlistOfCategories.unshift(allCategory);
        this.setState({
            listOfCategories: newlistOfCategories
        });
    }

    fetchCategorySaleItemList = async (newCategory: Category) => {
        let listOfItems: SaleItem[] = [];
        if (newCategory.name === 'All' ||
            newCategory.categoryId < 1) {
            console.log("get all cate");
            const resp = await fetch(environment.context + '/SaleItem', {
                method: 'GET',
                credentials: 'include'
            });
            listOfItems = await resp.json();
        }
        else {
            console.log("get only one ");
            const resp = await fetch(environment.context + '/SaleItem/category', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(newCategory),
                headers: {
                    'content-type': 'application/json'
                }
            });
            listOfItems = await resp.json();
        }
        this.setState({
            saleItemList: listOfItems.map(item =>
                SaleItem.constructViaObject(item))
        });
    }

    render() {
        return (
            <>
                <div>
                    <h3>Category: </h3>
                    <DropDownListInputComponent optionsList={this.state.listOfCategories}
                        updateSelection={this.changeCategoryShown} />
                </div>
                {this.state.saleItemList.length && <SaleItemListComponent saleItemList={this.state.saleItemList} />}
            </>
        );
    }
}