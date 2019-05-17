import React from "react";
import SaleItemSmallCardComponent from "../saleitem/saleitem-smallcard.component";

interface CategoryProp{
    given: Array<any>,
    history,
    location,
    match
  }
  
  export class CategoryComponent extends React.Component<CategoryProp, any> {
    
    render() {
        console.log(this.props.given);
        return (
          <div>
              <h4>{this.props.given[0].category.name}</h4>
              <div className="Collumx3">
              {this.props.given.map(saleItem => (
                        <SaleItemSmallCardComponent key={'saleItem-' + saleItem.saleId}
                        saleItem={saleItem} history={this.props.history}
                        location={this.props.location} match={this.props.match}/>))}
                        </div>
          </div>
          
        );
      }
  }