import React from 'react';
import { IUserState, IState } from '../../reducers';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { login, logout } from '../../actions/user.actions';
import { async } from 'q';

interface ISignOutState {
  username: string;
  password: string;
}

interface ISignOutProps extends RouteComponentProps<{}>{
  auth: IUserState
  logout: (history: any) => void
}

export class SignOutComponent extends React.Component<ISignOutProps, ISignOutState> {
  constructor(props) {
    super(props);
  }
  onMount = async(event) => {
    event.preventDefault();
    await logout(this.props.history);
    console.log("testing user");
    if(this.props.auth != undefined) console.log(this.props.auth.currentUser);
  }
  render() {
    return (
      <div>
        <h1>Unable To Log Out, An Error Has Occured</h1>
        <img onLoad={this.onMount} src="https://media.giphy.com/media/Kq3y54eJnoPja/giphy.gif"></img>
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
