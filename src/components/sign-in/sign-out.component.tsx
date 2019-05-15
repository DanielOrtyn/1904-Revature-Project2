import { RouteComponentProps } from "react-router";
import { IUserState, IState } from "../../reducers";
import React from "react";
import { login } from "../../actions/user.actions";
import { connect } from "http2";

interface ISignInState {
    username: string;
    password: string;
}

interface ISignInProps extends RouteComponentProps<{}>{
    auth: IUserState
    login: (username: string, password: string, history: any) => void
}
  
export class SignOutComponent extends React.Component<ISignInProps, ISignInState> {
    render(){
        return(
            <div>
                
            </div>
        )
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