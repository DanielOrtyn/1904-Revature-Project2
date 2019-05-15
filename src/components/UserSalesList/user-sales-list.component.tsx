import React from 'react';
import { SaleItem } from '../../model/saleItem';
// import { SmallSaleItemComponent } from './saleitem.smallcard.component';
import { SaleItemSmallCardComponent } from '../saleitem/saleitem-card.component';

interface IUserSalesListComponentProps {
    userSalesList: SaleItem[]
}

export class UserSalesListComponent extends React.PureComponent<IUserSalesListComponentProps> {

    constructor(props: any) {
        super(props);
        this.state = {
            item: undefined
        };
    }

    render() {
        return (
            <>
                {this.props.userSalesList.map(saleItem => (
                    <SaleItemSmallCardComponent  key={'saleItem-' + saleItem.saleId} saleItem={saleItem} />
                ))}
            </>
        );
    }
}