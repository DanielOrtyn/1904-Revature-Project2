import React from 'react';
import { SaleItem } from '../../model/saleItem';
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { NewBidCardComponent } from '../bids/bid.create.profile.card.somponent';
import { User } from '../../model/user';


interface ISaleItemComponentProps extends RouteComponentProps<{}> {
    currentUser: User;
    item: SaleItem;
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
                <NewBidCardComponent saleItem={this.props.item} currentUser={this.props.currentUser}
                    history={this.props.history} location={this.props.location}
                    match={this.props.match} />
            );
        }
        return <></>;
    }

    renderItemComponent() {
        if (this.props.item) {
            return (
                <>
                    <div>
                        <div>
                            <img src={this.props.item.itemImg.url} alt='test' width='300' height='200' />
                        </div>
                        <div className='bidDetailDiv'>
                            <h1>{this.props.item.title}</h1>
                            <p>Price: ${this.props.item.currentBid.currentBidPrice}</p>
                            <h4>Description</h4>
                            <div>{this.props.item.description}</div>
                            <button className="btn btn-primary" onClick={this.openBidMaker}>Place Bid</button>
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
        item: state.sales.displayItem
    }
}

export default connect(mapStateToProps)(SaleItemComponent);
