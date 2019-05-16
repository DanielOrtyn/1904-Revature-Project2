import React from 'react';
import { SaleItem } from '../../model/saleItem';
import { Category } from '../../model/category';
import { environment } from '../../environment';
import { SaleItemListComponent } from './saleitem-list.component';
import { DropDownListInputComponent } from '../input/dopdownlist.component';
import { IDisplayName } from '../../model/IDisplayName';
import { TextInputComponent } from '../input/textinput.component';

const allCategory = new Category(-1, 'All')

interface ISaleItemListComponentState {
    categoryShown: Category
    searchText: string
    listOfCategories: Category[]
    saleItemList: SaleItem[]
}

export class SaleItemCategoryListComponent extends React.Component<any, ISaleItemListComponentState> {

    constructor(props: any) {
        super(props);
        this.state = {
            categoryShown: allCategory,
            searchText: '',
            listOfCategories: [],
            saleItemList: []
        };
    }

    changeCategoryShown = (newCategory: IDisplayName) => {
        if (newCategory && newCategory instanceof Category) {
            this.setState({
                categoryShown: newCategory
            });
        }
    }

    updateSearchTerm = (newSearch: string) => {
        this.setState({
            searchText: newSearch
        });
    }

    searchSaleItems = async () => {
        let listOfItems: SaleItem[] = await this.fetchCategorySaleItemList();
        this.setState({
            saleItemList: listOfItems
        });
    }

    componentDidMount = async () => {
        await this.fetchListOfCategories();
        await this.searchSaleItems();
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

    fetchCategorySaleItemList = async () => {
        let returnList: SaleItem[] = [];
        if (this.state.categoryShown.name === 'All' ||
            this.state.categoryShown.categoryId < 1) {
            const path: string = '/SaleItem/search/active/text/' + this.state.searchText;
            const resp = await fetch(environment.context + path, {
                method: 'GET',
                credentials: 'include'
            });
            returnList = await resp.json();
        }
        else {
            const path: string = '/SaleItem/search/active/category/text';
            const resp = await fetch(environment.context + path, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({
                    searchString: this.state.searchText,
                    category: this.state.categoryShown
                }),
                headers: {
                    'content-type': 'application/json'
                }
            });
            returnList = await resp.json();
        }

        let saleItemList: SaleItem[] = [];
        for (let i = 0; i < returnList.length; i++) {
            let item = returnList[i];
            saleItemList.push(SaleItem.constructViaObject(item));
        }
        return saleItemList;
    }

    render() {
        return (
            <>
                <div>
                    <DropDownListInputComponent optionsList={this.state.listOfCategories}
                        updateSelection={this.changeCategoryShown} />
                    <TextInputComponent valueUpdate={this.updateSearchTerm} placeHolder='search' />
                    <button onClick={this.searchSaleItems}>Search</button>
                </div>
                {this.state.saleItemList[1] &&
                    <SaleItemListComponent saleItemList={this.state.saleItemList}
                        history={this.props.history} location={this.props.location}
                        match={this.props.match} />}
                {this.state.saleItemList[1] == undefined &&
                    <h1>Loading...</h1>}
            </>
        );
    }
}
