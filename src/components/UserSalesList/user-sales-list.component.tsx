import React from 'react';
import { SaleItem } from '../../model/saleItem';
import { SaleItemSmallCardComponent } from '../saleitem/saleitem-card.component';

interface IUserSalesListState {
    currentUser: User,
    userBidList: UserBid[]
}
interface IUserSalesListProps {
    currentUser: User
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