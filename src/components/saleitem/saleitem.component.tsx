import React from 'react';
import { SaleItem } from '../../model/saleItem';
// import { testItem } from '../../testAssets/testObjects';


interface ISaleItemComponentProps {
    itemId: number
}

interface ISaleItemComponentState {
    item?: SaleItem;
}

export class SaleItemComponent extends React.Component<ISaleItemComponentProps, ISaleItemComponentState> {

    constructor(props: any) {
        super(props);
        this.state = {
            item: undefined
        };
    }

    // in here we should initialize http calls
    componentDidMount = async () => {
        // fetch item from server
        // this.setState({
        //     item: testItem
        // })
    }

    openBidMaker = () => {
        // send user to a make bid page
        throw ('Code not implemented. Make Daniel do his job');
    }

    renderItemLoadFailedComponent() {
        return (<p>Warning, Item Did Not Load</p>);
    }

    renderItemComponent() {
        if (this.state.item) {
            return (
                <>
                    <div>
                        <img src={this.state.item.itemImg.url} alt='test' width='300' height='200' />
                    </div>
                    <div className='bidDetailDiv'>
                        <h1>{this.state.item.title}</h1>
                        <p>Price: ${this.state.item.getCurrentBidPrice()}</p>
                        <h4>Description</h4>
                        <div>{this.state.item.description}</div>
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