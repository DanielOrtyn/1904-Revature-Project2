import React from "react";
import { Button } from "reactstrap";
import { Img } from "../../model/Img";
import { async, send } from "q";
import { User } from "../../model/user";





interface ITempState{
  name: string;
  username: string;
  password: string;
  email: string;
  postal: string;
  imgSelected: number;
  userImg: Img,
  leftArrow: string,
  rightArrow: string,
  defaults: Array<any>
}
 
export class UserNewCardComponent extends React.Component<any, ITempState> {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      username: "",
      password: "",
      email: "",
      postal: "",
      imgSelected: 0,
      userImg: new Img(0, "http://improvementarchitecture.co.uk/wp-content/uploads/2015/02/missing-profile-picture.jpg", "Default"),
      leftArrow: "https://i.imgur.com/dxMcYXC.png",
      rightArrow: "https://i.imgur.com/ge1gA3i.png",
      defaults: new Array()
    }
    
    console.log(this.props);
    console.log(this.state);
  }
  componentWillMount= async() =>{
    let Ndefaults = new Array;
    for(let i = 1; i <= 10; i++){
      const resp = await fetch(`http://localhost:8080/imgs/img/${i}`, {
          method: "GET",
          credentials: "include"
        });
        let newBod = resp.json();
        newBod.then(function(results){
          let newImg = new Img(results.imgId, results.url, results.title);
          Ndefaults.push(newImg);
        });
    }
    this.setState({ defaults: Ndefaults})
  }
  handleNameChange(event){
    this.setState({name: event.target.value});
  }

  handleUsernameChange(event){
    this.setState({username: event.target.value});
  }

  handlePasswordChange(event){
    this.setState({password: event.target.value});
  }

  handleEmailChange(event){
    this.setState({email: event.target.value});
  }

  handlePostalChange(event){
    this.setState({postal: event.target.value});
  }

  handleIncriment = async() => {
    if(this.state.imgSelected < 9)this.setState({imgSelected: this.state.imgSelected+1});
    else{this.setState({imgSelected: 0})};
    
    this.setState({
      userImg: this.state.defaults[this.state.imgSelected]
    });
  }

  handleDecriment = () => {
    if(this.state.imgSelected > 0)this.setState({imgSelected: this.state.imgSelected-1});
    else{this.setState({imgSelected: 9})};
 
    this.setState({
      userImg: this.state.defaults[this.state.imgSelected]
    });

  }

  hoverOnLeft = (element) => {
    this.setState({leftArrow: "https://i.imgur.com/D0QAhl2.png"})
  }

  hoverOffLeft = (element) => {
    this.setState({leftArrow: "https://i.imgur.com/dxMcYXC.png"})
  }

  hoverOnRight = (element) => {
    this.setState({rightArrow: "https://i.imgur.com/rhiCg8m.png"})
  }

  hoverOffRight = (element) => {
    this.setState({rightArrow: "https://i.imgur.com/ge1gA3i.png"})
  }
  updateUser = async() => {
    console.log("Calling Parent Update Function ");

    let sendObj = {
      username: this.state.username,
      password: this.state.password,
      name: this.state.name,
      email: this.state.email,
      postal: this.state.postal,
      rating: 5,
      ratingCount: 1,
      profileImg: {
        imgId: this.state.userImg.imgID,
        url: this.state.userImg.url,
        title: this.state.userImg.title
      }
    }
    
    console.log("SENDING THIS OBJECT");
    console.log(sendObj);
    const resp = await fetch(`http://localhost:8080/User`, {
      method: "POST",
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendObj)
    });
    console.log(resp.json());
    this.props.history.push("/sign-in");
  }

  render() {
    return (
      <div key={'Creating-User'} className="card col-sm-2 col-md-6 col-sm-12">
        <div className="card-body">
          <table>
            <tbody>
              <tr>
                <td>
                  <img src={this.state.userImg.url}
                      className="FixedCardImg"
                      alt="..." />
                  <h5 className="card-title centered">Select Picture</h5>
                  <table className="centered">
                    <tbody>
                    {this.state.defaults[1] != undefined && 
                      <tr>
                       
                        <td><img className="arrow centered" onMouseOver={this.hoverOnLeft} onMouseOut={this.hoverOffLeft} onClick={this.handleDecriment} src={this.state.leftArrow}></img></td>
                        <td><img className="arrow centered" onMouseOver={this.hoverOnRight} onMouseOut={this.hoverOffRight} onClick={this.handleIncriment} src={this.state.rightArrow}></img></td>
                       
                        </tr>
                    }
                    </tbody>
                  </table>
                </td>
                <td className=" card-body">
                  <ul className="card-body list-group list-group-flush">
                    <li className="list-group-item">Name<input defaultValue={(this.state.name).toString()} type='string' onChange={this.handleNameChange.bind(this)}></input></li>
                    <li className="list-group-item">Username<input defaultValue={(this.state.username).toString()} type='string' onChange={this.handleUsernameChange.bind(this)}></input></li>
                    <li className="list-group-item">Password<input defaultValue={(this.state.password).toString()} type='string' onChange={this.handlePasswordChange.bind(this)}></input></li>
                    <li className="list-group-item">Email<input defaultValue={(this.state.email).toString()} type='string' onChange={this.handleEmailChange.bind(this)}></input></li>
                    <li className="list-group-item">Postal<input defaultValue={(this.state.postal).toString()} type='string' onChange={this.handlePostalChange.bind(this)}></input></li>
                    <li className="list-group-item"><Button className="btn btn-success" onClick={this.updateUser}>Create User</Button></li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <br>
        </br>
      </div>
    )
  }
}