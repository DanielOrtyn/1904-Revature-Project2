import React from 'react';
import { User } from '../../model/user';
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { UserBidListCardComponent } from './user-bid-list-card.component';
import { BidWithSale } from '../../model/BidWithSale';

interface IUserBidListState {
    currentUser: User,
    userBidList: {bidId: number, maxBidPrice: number, currentBidPrice: number,  img: string, endDate: string, title: string}[]
}
interface IUserBidListProps extends RouteComponentProps<{}> {
    currentUser: User
}

export class UserBidListComponent extends React.Component<IUserBidListProps, IUserBidListState> {

    constructor(props: any) {
        super(props);
        this.state = {
            currentUser: this.props.currentUser,
            userBidList: []
        };
    }

    componentDidMount = async () => {
        try {
            const resp = await fetch('http://localhost:8080/bid/findByBidderWithAttatchSales', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(this.state.currentUser),
                headers: {
                    'content-type': 'application/json'
                }
            });
            const body: BidWithSale[] = await resp.json();
            const body1 = body.map(bidWithSale1 => ({
                bidId: bidWithSale1.bidId,
                maxBidPrice: bidWithSale1.maxBidPrice,
                currentBidPrice: bidWithSale1.currentBidPrice,
                img: bidWithSale1.saleItem.itemImg.url,
                endDate: bidWithSale1.saleItem.endDate,
                title: bidWithSale1.saleItem.title,
            }));
            //console.log(`body = ${body[0].bidId}`);
            this.setState({
                userBidList: body1
            })
        } catch (err) {
            console.log(err);
        }
    }

    
    render() {
        return (
            <>
                {this.state.userBidList && this.state.userBidList.map(bidWithSale => (
                    <UserBidListCardComponent key={'bidId-' + bidWithSale.img} 
                        bidWithSale={bidWithSale} /> 
                ))}
            </>
        );
    }
}

const mapStateToProps = (state: IState) => {
    return {
        currentUser: state.auth.currentUser
    }
}

export default connect(mapStateToProps)(UserBidListComponent)