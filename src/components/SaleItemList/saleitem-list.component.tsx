import React from 'react';
import { SaleItem } from '../../model/saleItem';
import { SmallSaleItemComponent } from './saleitem.smallcard.component';

interface ISaleItemListComponentProps {
    saleItemList: SaleItem[]
}

export class SaleItemListComponent extends React.PureComponent<ISaleItemListComponentProps> {

    constructor(props: any) {
        super(props);
        this.state = {
            item: undefined
        };
    }

    render() {
        return (
            <>
                {this.props.saleItemList.map(saleItem => (
                    <SmallSaleItemComponent  key={'saleItem-' + saleItem.saleId} item={saleItem} />
                ))}
            </>
        );
    }
}