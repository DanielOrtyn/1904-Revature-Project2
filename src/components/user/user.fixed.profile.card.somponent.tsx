import React from "react";
import { User } from "../../model/user";


interface IUserCardProps
 {
    TheUser: User;
  }
  
  export class UserCardComponent extends React.PureComponent<IUserCardProps> {
    render() {
      const myuser = this.props.TheUser;
      return (
        <div key={'User-' + myuser.userId} className="">
          <div className="">
          <table>
            <tbody>
              <tr>
                <td>
                    <img src={this.props.TheUser.profileImg.url}
                        className="FixedCardImage"
                        alt="..." />
                    <h5 className="card-title">{myuser.name}</h5>
                </td>
                <td>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">{this.props.TheUser.username}</li>
                        <li className="list-group-item">{this.props.TheUser.password}</li>
                        <li className="list-group-item">{this.props.TheUser.email}</li>
                        <li className="list-group-item">{this.props.TheUser.postal}</li>
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