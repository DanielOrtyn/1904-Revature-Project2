import React from 'react';
import { UserBid } from '../../model/UserBid';

interface IUserBidListCardProps {
  userBid: UserBid;
}

export class UserBidListCardComponent extends React.PureComponent<IUserBidListCardProps> {

  render() {
    const userBid = this.props.userBid;
    return (
      <div className="card col-md-4 col-sm-6 col-xs-12">
        <div className="card-body">
          <h5 className="card-title">{userBid.bidder}</h5>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Current Bid Price: {userBid.currentBidPrice}</li>
          <li className="list-group-item">Max Bid Price: {userBid.maxBidPrice}</li>
        </ul>
      </div>
    )
  }
}
