import React from 'react';
import { IUserState, IState } from '../../reducers';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { login } from '../../actions/user.actions';

interface ISignOutState {
  username: string;
  password: string;
}

interface ISignOutProps extends RouteComponentProps<{}>{
  auth: IUserState
  login: (username: string, password: string, history: any) => void
}

export class SignOutComponent extends React.Component<ISignOutProps, ISignOutState> {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  render() {
    const { username, password } = this.state;
    const errorMessage = this.props.auth.errorMessage;
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
  login: login
}

export default connect(mapStateToProps, mapDispatchToProps)(SignOutComponent);
