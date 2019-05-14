import React from 'react';
import { SaleItem } from '../../model/saleItem';
import { Category } from '../../model/category';
import { environment } from '../../environment';
import { SaleItemListComponent } from './saleitem-list.component';

interface ISaleItemListComponentState {
    listCategory: Category;
    saleItemList: SaleItem[];
}

export class SaleItemCategoryListComponent extends React.Component<any, ISaleItemListComponentState> {

    constructor(props: any) {
        super(props);
        this.state = {
            listCategory: new Category(-1, 'All'),
            saleItemList: []
        };
    }

    componentDidMount = async () => {
        let listOfItems: SaleItem[] = [];
        if (this.state.listCategory.name === 'All' || this.state.listCategory.categoryId < 1) {
            const resp = await fetch(environment.context + '/SaleItem', {
                method: 'GET',
                credentials: 'include'
            });
            listOfItems = await resp.json();
        }
        else {
            const resp = await fetch(environment.context + '/SaleItem/category', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(this.state.listCategory),
                headers: {
                    'content-type': 'application/json'
                }
            });
            listOfItems = await resp.json();
        }
        this.setState({
            saleItemList: listOfItems.map(item => 
                new SaleItem(item.saleId, item.seller, item.itemImg,
                    item.currentBid, item.minPrice, item.endDate,
                    item.title, item.description, item.category))
        });
    }

    render() {
        return (
            <>
                <h3>Category: {this.state.listCategory.name}</h3>
                {this.state.saleItemList.length && <SaleItemListComponent saleItemList={this.state.saleItemList} />}
            </>
        );
    }
}