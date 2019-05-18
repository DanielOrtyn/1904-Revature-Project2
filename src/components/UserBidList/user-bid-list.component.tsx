import React from 'react';
import { SaleItem } from '../../model/saleItem';
import { UserBid } from '../../model/UserBid';
import { User } from '../../model/user';
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { UserBidListCardComponent } from './user-bid-list-card.component';

interface IUserBidListState {
    currentUser: User,
    userBidList: UserBid[]
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
            const resp = await fetch('http://localhost:8080/bid/findByBidder', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(this.state.currentUser),
                headers: {
                    'content-type': 'application/json'
                }
            });
            const body = await resp.json();
            this.setState({
                userBidList: body
            })
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <>
                {this.state.userBidList.map(userBid => (
                    <UserBidListCardComponent key={'userBid-' + userBid.saleItemId} 
                        userBid={userBid} /> 
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