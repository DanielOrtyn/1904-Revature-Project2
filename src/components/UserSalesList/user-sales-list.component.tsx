import React from 'react';
import { RouteComponentProps } from 'react-router';
import { SaleItem } from '../../model/saleItem';
import SaleItemSmallCardComponent from '../saleitem/saleitem-smallcard.component';

interface IUserSalesListComponentProps extends RouteComponentProps<{}> {
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
                    <SaleItemSmallCardComponent key={'saleItem-' + saleItem.saleId}
                        saleItem={saleItem} history={this.props.history}
                        location={this.props.location} match={this.props.match} />
                ))}
            </>
        );
    }
}