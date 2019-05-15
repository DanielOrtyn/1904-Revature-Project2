import React from 'react';
import { SaleItem } from '../../model/saleItem';


interface ISmallSaleItemComponentProps {
    item: SaleItem
}

export class SmallSaleItemComponent extends React.PureComponent<ISmallSaleItemComponentProps> {

    renderItemLoadFailedComponent() {
        return (<p>Warning, Item Did Not Load</p>);
    }

    renderItemComponent() {
        console.log(this.props.item.itemImg.url);
        if (this.props.item) {
            return (
                <>
                    <div className='column smallBorder smallCard'>
                        <img src={this.props.item.itemImg.url} alt='test' width='300' height='200' />
                        <h1>{this.props.item.title}</h1>
                        <p>Price: {this.props.item.getCurrentBidPrice()}</p>
                    </div>
                </>
            );
        } else {
            return this.renderItemLoadFailedComponent();
        }
    }

    render() {
        return (
            <div className="container">
                {this.renderItemComponent()}
            </div>
        );
    }
}