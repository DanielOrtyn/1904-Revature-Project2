import React from 'react';
import { SaleItem } from '../../model/saleItem';

interface ISaleItemSmallCardProps {
  saleItem: SaleItem;
}

export class SaleItemSmallCardComponent extends React.PureComponent<ISaleItemSmallCardProps> {

  render() {
    const saleItem = this.props.saleItem;
    const itemDate = new Date(this.props.saleItem.endDate);
    return (
      <div className="card col-md-4 col-sm-6 col-xs-12">
        <img src={saleItem.itemImg.url}
          className="card-img-top"
          alt="..." />
        <div className="card-body">
          <h5 className="card-title">{saleItem.title}</h5>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Minimum Bid Price: {saleItem.currentBid.currentBidPrice}</li>
          <li className="list-group-item">End Date: {itemDate.toDateString()}</li>
        </ul>
      </div>
    )
  }
}
