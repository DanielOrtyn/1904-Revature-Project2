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
    if(this.props.auth != undefined){
      this.props.history.push("/sign-in");
    } 
    else{
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
