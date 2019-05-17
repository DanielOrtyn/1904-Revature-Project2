import React from 'react';
import { SaleItem } from '../../model/saleItem';
import SaleItemSmallCardComponent from '../saleitem/saleitem-smallcard.component';
import { RouteComponentProps } from 'react-router';

interface ISaleItemListComponentProps extends RouteComponentProps<{}> {
    saleItemList: SaleItem[];
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
                <div className="BuffyTheBuffer">
                    <div className="Collumx2">
                        {this.props.saleItemList.map(saleItem => (
                            <SaleItemSmallCardComponent key={'saleItem-' + saleItem.saleId}
                                saleItem={saleItem} history={this.props.history}
                                location={this.props.location} match={this.props.match} />
                        ))}
                    </div>
                </div>
            </>
        );
    }
}
