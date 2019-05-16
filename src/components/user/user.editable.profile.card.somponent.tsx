import React from "react";
import { User } from "../../model/user";
import { Button } from "reactstrap";
import { ImageModel } from "../../model/imageModel";

interface IUserCardProps{
  TheUser: User;
  update: any
}

interface ITempState{
  name: string;
  username: string;
  password: string;
  email: string;
  postal: string,
  userImg: ImageModel,
  defaults: Array<any>,
  displayPic: ImageModel,
  imgSelected: number,
  leftArrow: string,
  rightArrow: string,
  wantsToChangePic: boolean,
  wantsUpload: boolean,
  uploadUrl: string
}
  
export class UserEditCardComponent extends React.Component<IUserCardProps, ITempState> {
  constructor(props){
    super(props);
    this.state = {
      name: this.props.TheUser.name.valueOf(),
      username: this.props.TheUser.username.valueOf(),
      password: this.props.TheUser.password.valueOf(),
      email: this.props.TheUser.email.valueOf(),
      postal: this.props.TheUser.postal.valueOf(),
      userImg: this.props.TheUser.profileImg,
      defaults: new Array(),
      leftArrow: "https://i.imgur.com/dxMcYXC.png",
      rightArrow: "https://i.imgur.com/ge1gA3i.png",
      imgSelected: 10,
      wantsToChangePic: false,
      wantsUpload: false,
      displayPic: this.props.TheUser.profileImg,
      uploadUrl: "N/A"
    }
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
          let newImg = new ImageModel(results.imgId, results.url, results.title);
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
  handleURLChange(event){
    this.setState({uploadUrl: event.target.value})
  }
  updateUser = async() => {
    try{
      let sendObj;
      //send img
      if(this.state.imgSelected == 11){ 
        let imgObject = {
          url: this.state.displayPic.url,
          title: this.state.displayPic.title
        }
        const iresp = await fetch(`http://localhost:8080/imgs`, {
          method: "POST",
          credentials: "include",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(imgObject)
        });
        let parsedResponse = await iresp.json();
      //send user
        sendObj = {
          userId: this.props.TheUser.userId,
          username: this.state.username,
          password: this.state.password,
          name: this.state.name,
          email: this.state.email,
          postal: this.state.postal,
          rating: this.props.TheUser.rating,
          ratingCount: this.props.TheUser.ratingCount,
          profileImg: {
            url: parsedResponse.url,
            title: parsedResponse.title,
            imgId: parsedResponse.imgId
          }
        }
      }
      else{
        sendObj = {
          userId: this.props.TheUser.userId,
          username: this.state.username,
          password: this.state.password,
          name: this.state.name,
          email: this.state.email,
          postal: this.state.postal,
          rating: this.props.TheUser.rating,
          ratingCount: this.props.TheUser.ratingCount,
          profileImg: {
            url: this.state.displayPic.url,
            title: this.state.displayPic.title,
            imgId: this.state.displayPic.imgId
          }
        }
      }
      const resp2 = await fetch(`http://localhost:8080/User`, {
        method: "POST",
        credentials: "include",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sendObj)
      });
      let newUser = await resp2.json();
      this.props.update(newUser);
    }
    catch{
      console.log("ERROR UPLOADING");
    }
  }
  changePic = () => {
    this.setState({wantsToChangePic: true});
  }
  letUpload = () => {
    this.setState({wantsUpload: true})
  }
  uploadPicture = (event) => {
    event.preventDefault();
    let newImage = new ImageModel(0, this.state.uploadUrl, (this.props.TheUser.userId + " new upload Image"));
    this.setState({displayPic: newImage, imgSelected: 11});
  }
  handleIncriment = async() => {
    if(this.state.imgSelected < 10)await this.setState({imgSelected: this.state.imgSelected+1});
    else{await this.setState({imgSelected: 0})};
    if(this.state.imgSelected < 10){
      this.setState({
        displayPic: this.state.defaults[this.state.imgSelected]
      });
    }
    else{
      this.setState({
        displayPic: this.props.TheUser.profileImg
      });
    }
  }
  handleDecriment = async() => {
    if(this.state.imgSelected > 0)await this.setState({imgSelected: this.state.imgSelected-1});
    else{await this.setState({imgSelected: 10})};
    if(this.state.imgSelected < 10){
      this.setState({
        displayPic: this.state.defaults[this.state.imgSelected]
      });
    }
    else{
      this.setState({
        displayPic: this.props.TheUser.profileImg
      });
    }
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
  render() {
    const myuser = this.props.TheUser;
    return (
      <div key={'User-' + myuser.userId} className="col-sm-2 col-md-6 col-sm-12">
        <div className="">
          <table>
            <tbody>
              <tr>
                <td>
                  <img src={this.state.displayPic.url}
                      className="FixedCardImg"
                      alt="..." />
                  <h5 className="centered">{myuser.name}</h5>
                  <table className="centered">
                    <tbody>
                    {(this.state.wantsToChangePic == true && this.state.defaults[1] != undefined) && 
                      <tr>
                        <td><img className="arrow centered" onMouseOver={this.hoverOnLeft} onMouseOut={this.hoverOffLeft} onClick={this.handleDecriment} src={this.state.leftArrow}></img></td>
                        <td><img className="arrow centered" onMouseOver={this.hoverOnRight} onMouseOut={this.hoverOffRight} onClick={this.handleIncriment} src={this.state.rightArrow}></img></td>
                      </tr>
                    } 
                    {(this.state.wantsUpload == true && this.state.wantsToChangePic == true) &&
                      <tr> 
                        <td><form className="centered" onSubmit={this.uploadPicture}>
                          <table>
                            <tbody>
                              <tr><td>
                                <p>Picture Url:</p>
                              </td>
                              <td>
                                <input type='string' onChange={this.handleURLChange.bind(this)}></input>
                              </td></tr>
                              <tr> 
                                <td><Button className="btn btn-success" type="submit">Upload Image</Button></td>
                                <td></td>
                              </tr>
                            </tbody>
                          </table>
                        </form></td>
                      </tr>
                    }                       
                    {(this.state.wantsUpload == false && this.state.wantsToChangePic == true) &&
                        <tr> 
                          <td><Button className="btn btn-success" onClick={this.letUpload}>Upload Profile Picture</Button></td>
                        </tr>
                    }
                    {this.state.wantsToChangePic == false && 
                      
                      <tr>
                        <td><Button className="btn btn-success" onClick={this.changePic}>Change Profile Picture</Button></td>
                      </tr>
                    }
                    </tbody>
                  </table>
                </td>
                <td>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item"><input defaultValue={(this.state.name).toString()} type='string' onChange={this.handleNameChange.bind(this)}></input></li>
                    <li className="list-group-item"><input defaultValue={(this.state.username).toString()} type='string' onChange={this.handleUsernameChange.bind(this)}></input></li>
                    <li className="list-group-item"><input defaultValue={(this.state.password).toString()} type='string' onChange={this.handlePasswordChange.bind(this)}></input></li>
                    <li className="list-group-item"><input defaultValue={(this.state.email).toString()} type='string' onChange={this.handleEmailChange.bind(this)}></input></li>
                    <li className="list-group-item"><input defaultValue={(this.state.postal).toString()} type='string' onChange={this.handlePostalChange.bind(this)}></input></li>
                    <li className="list-group-item"><Button className="btn btn-success" onClick={this.updateUser}>Submit Changes</Button></li>
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