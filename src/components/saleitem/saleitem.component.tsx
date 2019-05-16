import React from 'react';
import { SaleItem } from '../../model/saleItem';
import { IState } from '../../reducers';
import { connect } from 'react-redux';


interface ISaleItemComponentProps {
    item?: SaleItem;
}

export class SaleItemComponent extends React.PureComponent<ISaleItemComponentProps> {

    openBidMaker = () => {
        // send user to a make bid page
        throw ('Code not implemented. Make Daniel do his job');
    }

    renderItemLoadFailedComponent() {
        return (<p>Warning, Item Did Not Load</p>);
    }

    renderItemComponent() {
        if (this.props.item) {
            return (
                <>
                    <div>
                        <img src={this.props.item.itemImg.url} alt='test' width='300' height='200' />
                    </div>
                    <div className='bidDetailDiv'>
                        <h1>{this.props.item.title}</h1>
                        <p>Price: ${this.props.item.getCurrentBidPrice()}</p>
                        <h4>Description</h4>
                        <div>{this.props.item.description}</div>
                        <button className="btn btn-primary" onClick={this.openBidMaker}>Place Bid</button>
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
                <div className="row">
                    {this.renderItemComponent()}
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state: IState) => {
    return {
        currentUser: state.sales.displayItem
    }
}

export default connect(mapStateToProps)(SaleItemComponent);
