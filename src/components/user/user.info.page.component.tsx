import React from 'react';
import { UserCardComponent } from './user.fixed.profile.card.somponent';
import { User } from '../../model/user';
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import { Img } from '../../model/Img';

interface UserState{
  currentUser: User;
}

export class UserInfoComponent extends React.Component<any, UserState> {
  constructor(props){
    super(props);
    this.state = {
      currentUser: new User(0, "username", "password", "John Doe", "jdoe@random.com", "Number Street, City, State, Zip", new Img(0, "http://improvementarchitecture.co.uk/wp-content/uploads/2015/02/missing-profile-picture.jpg", "Base"))
    }
  }
  componentDidMount(){
    // update the user here
    let updatedUser;  // set updated user here
    if(updatedUser){
      this.setState({
        currentUser: updatedUser
      })
    }
  }
  render() {
    return (
      <body>
      <h1>User Info Page</h1>
        <UserCardComponent TheUser={this.state.currentUser}></UserCardComponent>
      </body>
    );
  }
}

const mapStateToProps = (state: IState) => {
    return {
        currentUser: state.auth.currentUser
    }
}

export default connect(mapStateToProps)(UserInfoComponent);
