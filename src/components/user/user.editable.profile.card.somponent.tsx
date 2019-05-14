import React from "react";
import { User } from "../../model/user";
import { Button } from "reactstrap";


interface IUserCardProps{
  TheUser: User;
  updateFunction: any
}

interface ITempState{
  name: string;
  username: string;
  password: string;
  email: string;
  postal: string
}
  
export class UserEditCardComponent extends React.Component<IUserCardProps, ITempState> {
  constructor(props){
    super(props);
    this.state = {
      name: this.props.TheUser.name.valueOf(),
      username: this.props.TheUser.username.valueOf(),
      password: this.props.TheUser.password.valueOf(),
      email: this.props.TheUser.email.valueOf(),
      postal: this.props.TheUser.postal.valueOf()
    }
    console.log(this.props);
    console.log(this.state);
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

  updateUser = () => {
    console.log("Calling Parent Update Function ");
    let passUser = new User(this.props.TheUser.userId, this.state.username, this.state.password, this.state.name, this.state.email, this.state.postal, this.props.TheUser.img);
    this.props.updateFunction(passUser);
  }

  render() {
    const myuser = this.props.TheUser;
    return (
      <div key={'User-' + myuser.userId} className="card col-sm-2 col-md-6 col-sm-12">
        <div className="card-body">
          <table>
            <tbody>
              <tr>
                <td>
                  <img src={this.props.TheUser.img.url}
                      className="card-img-top"
                      alt="..." />
                  <h5 className="card-title">{myuser.name}</h5>
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