import React from 'react';
import { UserCardComponent } from './user.fixed.profile.card.somponent';
import { User } from '../../model/user';
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import { ImageModel } from '../../model/imageModel';

interface UserState{
  currentUser: User;
}
interface IUserProps {
  currentUser?: User
}
export class UserInfoComponent extends React.Component<IUserProps, UserState> {
  constructor(props){
    super(props);
    console.log(this.props.currentUser)
    if(this.props.currentUser == null){
      this.state = {
        currentUser: new User(0, "username", "password", "John Doe", "jdoe@random.com",
         "Number Street, City, State, Zip",
          new ImageModel(0, "http://improvementarchitecture.co.uk/wp-content/uploads/2015/02/missing-profile-picture.jpg", "Base"))
      }
    }
    else{
      this.state = {

        currentUser: this.props.currentUser
      }
    }
    console.log("showing user");
    console.log(this.props.currentUser);
  }
  render() {
    return (
      <div>
      <h1>User Info Page</h1>
        <UserCardComponent TheUser={this.state.currentUser}></UserCardComponent>
        </div>
    );
  }
}


const mapStateToProps = (state: IState) => {
  return {

      currentUser: state.auth.currentUser

  }
}

export default connect(mapStateToProps)(UserInfoComponent);
