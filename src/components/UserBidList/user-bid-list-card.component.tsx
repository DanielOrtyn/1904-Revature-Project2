import React from 'react';

interface IUserBidListCardProps {
  bidWithSale: {bidId: number, maxBidPrice: number, currentBidPrice: number,  img: string, endDate: string, title: string};
}

export class UserBidListCardComponent extends React.PureComponent<IUserBidListCardProps> {

  render() {
    const bidWithSale = this.props.bidWithSale;
    const endDate1 = new Date(bidWithSale.endDate);
    return (
      <div className="card col-md-4 col-sm-6 col-xs-12">
        <img src={bidWithSale.img}
          className="card-img-top SaleItemPicture"
          alt="..." />

        <div className="card-body">
          <h5 className="card-title">{bidWithSale.title}</h5>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Current Bid Price: {bidWithSale.currentBidPrice}</li>
          <li className="list-group-item">Max Bid Price: {bidWithSale.maxBidPrice}</li>
          <li className="list-group-item">End Date: {endDate1.toDateString()}</li>
        </ul>
      </div>
    )
  }
}
