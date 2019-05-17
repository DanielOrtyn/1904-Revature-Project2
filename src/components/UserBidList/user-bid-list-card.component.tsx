import React from 'react';
import { UserBid } from '../../model/UserBid';
import { SaleItem } from '../../model/saleItem';

interface IUserBidListCardProps {
  userBid: UserBid;
  saleItem: SaleItem;
}

export class UserBidListCardComponent extends React.PureComponent<IUserBidListCardProps> {

  render() {
    const userBid = this.props.userBid;
    const itemDate = new Date(this.props.saleItem.endDate);
    return (
      <div className="card col-md-4 col-sm-6 col-xs-12">
        <img src={this.props.saleItem.itemImg.url}
          className="card-img-top"
          alt="..." />
        <div className="card-body">
          <h5 className="card-title">{this.props.saleItem.title}</h5>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Current Bid Price: {this.props.saleItem.currentBid.currentBidPrice}</li>
          <li className="list-group-item">End Date: {itemDate.toDateString()}</li>
        </ul>
      </div>
    )
  }
}
