import React from 'react';
import { CategoryComponent } from './category.specific.component';
import { array } from 'prop-types';

interface HomeState{
  download?: Array<any>
}

export class HomeComponent extends React.Component<any, HomeState> {
  constructor(props){
    super(props);
    this.state = {
      download: undefined
    }
  }
  componentDidMount = async() => {
    const resp = await fetch("http://localhost:8080/SaleItem/topPriced/3", {
      method: 'GET',
      credentials: 'include'
    });
    let newStore = await resp.json();
    this.setState({download: newStore});
  }

  render() {
    let myDownload = this.state.download;
    console.log(myDownload);
    return (
      <div>
        <div className="centered">
          <h1>Welcome To Ubuy!</h1>
          <h2>A alternative to overly complicated competitors</h2>
        </div>
        <br/>
        <div>
          <h3>Top Selling Items</h3>
            {myDownload != undefined && myDownload.map(category => (<CategoryComponent key={'category-' + category[0].category.categoryId}
            given={category} 
            history={this.props.history} 
            location={this.props.location} 
            match={this.props.match}/>))}
          {myDownload == undefined && <><p>Loading...</p></>}
        </div>
      </div>
      
    );
  }
}