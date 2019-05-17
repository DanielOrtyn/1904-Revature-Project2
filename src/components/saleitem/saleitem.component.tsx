import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { SaleItem } from '../../model/saleItem';
import { User } from '../../model/user';
import { IState } from '../../reducers';
import NewBidCardComponent from '../bids/bid.create.profile.card.somponent';


interface ISaleItemComponentProps extends RouteComponentProps<{}> {
    currentUser: User;
    saleItem: SaleItem;
}

interface ISaleItemComponentHistory {
    allowBid: boolean;
}

export class SaleItemComponent extends React.Component<ISaleItemComponentProps, ISaleItemComponentHistory> {
    constructor(props) {
        super(props);
        this.state = {
            allowBid: false
        }
    }
    openBidMaker = () => {
        if (this.props.currentUser) {
            this.setState({
                allowBid: true
            })
        } else {
            this.props.history.push('/sign-in');
        }
    }

    renderItemLoadFailedComponent() {
        return (<p>Warning, Item Did Not Load</p>);
    }

    renderBid() {
        if (this.state.allowBid) {
            return (
                <NewBidCardComponent saleItem={this.props.saleItem}
                    currentUser={this.props.currentUser} history={this.props.history}
                    location={this.props.location} match={this.props.match} />
            );
        }
        return <></>;
    }

    renderItemComponent() {
        const saleItem = this.props.saleItem;
        if (saleItem) {
            const itemDate = new Date(saleItem.endDate);
            return (
                <>
                    <div>
                        <div>
                            <img src={saleItem.itemImg.url} alt='test' width='300' height='200' />
                        </div>
                        <div className='bidDetailDiv'>
                            <h1>{saleItem.title}</h1>
                            <p>Price: ${saleItem.currentBid.currentBidPrice}</p>
                            <h4>Description</h4>
                            <div>{saleItem.description}</div>
                            <button className="btn btn-primary" onClick={this.openBidMaker}>Place Bid</button>
                            <p>End Date: {itemDate.toDateString()}</p>
                        </div>
                        <div>
                            {this.renderBid()}
                        </div>
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
        currentUser: state.auth.currentUser,
        saleItem: state.sales.displayItem
    }
}

export default connect(mapStateToProps)(SaleItemComponent);
