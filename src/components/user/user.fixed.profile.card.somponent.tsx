import React from "react";
import { User } from "../../model/user";
import { Redirect } from "react-router";
import { Button } from "reactstrap";

interface MyState{
  editNow: boolean
}

interface IUserCardProps
 {
    TheUser: User;
  }
  
  export class UserCardComponent extends React.Component<IUserCardProps, MyState> {
    constructor(props){
      super(props);
      this.state ={
        editNow: false
      }
    }
    sendToEdit= ()=>{
      this.setState({editNow: true});      
    }
    render() {
      const myuser = this.props.TheUser;
      return (
        <div key={'User-' + myuser.userId} className="">
        {this.state.editNow && <Redirect to='/edit-user' />}
          <div className="">
          <table>
            <tbody>
              <tr>
                <td>
                    <img src={this.props.TheUser.profileImg.url}
                        className="FixedCardImg"
                        alt="..." />
                    <h5 className="card-title">{myuser.name}</h5>
                </td>
                <td>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">{this.props.TheUser.username}</li>
                        <li className="list-group-item">{this.props.TheUser.email}</li>
                        <li className="list-group-item">{this.props.TheUser.postal}</li>
                        <li className="list-group-item"><Button className="btn btn-success" onClick={this.sendToEdit}>Edit Profile</Button></li>
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