import React from 'react';
import { IUserState, IState } from '../../reducers';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { logout } from '../../actions/user.actions';

interface ISignOutState {
  username: string;
  password: string;
}

interface ISignOutProps extends RouteComponentProps<{}>{
  auth: IUserState
  logout: () => void
}

export class SignOutComponent extends React.Component<ISignOutProps, ISignOutState> {
  constructor(props) {
    super(props);
  }

  componentWillMount= async()=>{
    await this.props.logout();
    console.log("testing user");
    if(this.props.auth != undefined){
      console.log("User Logged Out");
      this.props.history.push("/sign-in");
    } 
    else{
      console.log(this.props.auth);
      this.props.history.push("/user-info");
    }
  }
  render() {
    return (
      <div>
        
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return  {
    auth: state.auth
  }
}

const mapDispatchToProps = {
  logout: logout
}

export default connect(mapStateToProps, mapDispatchToProps)(SignOutComponent);
