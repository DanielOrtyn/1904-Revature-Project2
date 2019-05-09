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
        <div key={'User-' + myuser.userId} className="card col-sm-2 col-md-6 col-sm-12">
          <div className="card-body">
          <table>
              <tr>
                <td>
                    <img src={this.props.TheUser.img}
                        className="card-img-top"
                        alt="..." />
                    <h5 className="card-title">{myuser.name}</h5>
                </td>
                <td>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">{this.props.TheUser.name}</li>
                        <li className="list-group-item">{this.props.TheUser.username}</li>
                        <li className="list-group-item">{this.props.TheUser.password}</li>
                        <li className="list-group-item">{this.props.TheUser.email}</li>
                        <li className="list-group-item">{this.props.TheUser.postal}</li>
                    </ul>
                </td>
            </tr>
          </table>
          </div>
          <br>
          </br>
        </div>
        
      )
    }
  }