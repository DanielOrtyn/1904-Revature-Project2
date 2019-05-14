import React from 'react';
import { SaleItem } from '../../model/saleItem';

interface ISaleItemCardProps {
  saleItem: SaleItem;
  endDate: string;
}

export class SpaceshipCardComponent extends React.PureComponent<ISaleItemCardProps> {
  render() {
    const saleItem = this.props.saleItem;
    return (
      <div className="card col-md-4 col-sm-6 col-xs-12">
        <img src={saleItem.imageUrl}
          className="card-img-top"
          alt="..." />
        <div className="card-body">
          <h5 className="card-title">{saleItem.title}</h5>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Minimum Bid Price: {saleItem.minimumBidPrice}</li>
          <li className="list-group-item">End Date: {this.props.endDate}</li>
        </ul>
      </div>
    )
  }
}
