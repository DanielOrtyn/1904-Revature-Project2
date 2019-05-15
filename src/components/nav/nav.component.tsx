import React from 'react';
import { Link } from 'react-router-dom';
import RevLogo from '../../assets/rev-logo.png';
import { connect } from 'react-redux';
import { User } from '../../model/user';
import { IState } from '../../reducers';

interface INaveProps {
    currentUser?: User
}

export class NavComponent extends React.PureComponent<INaveProps> {
    render() {
        const currentUser = this.props.currentUser;
        return (
            <nav className="navbar navbar-toggleable-md navbar-expand-lg navbar-dark bg-dark display-front nav-pad">
                <div className="navbar-header c-pointer shift-left">
                    <Link to="/home" className="unset-anchor">
                        <img className="img-adjust-position rev-logo" src={RevLogo} alt="revature" />
                    </Link>
                </div>
                <div>{currentUser && currentUser.name}</div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarsExample04">
                    <ul className="navbar-nav ml-auto margin-nav">
                        <li className="nav-item active">
                            <Link to="/home" className="unset-anchor nav-link">Home</Link>
                        </li>
                        {
                            currentUser


                                ? <li className="nav-item active dropdown">

                                <div className="nav-link dropdown-toggle pointer" id="examples-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">User Options</div>
                                <div className="dropdown-menu" aria-labelledby="examples-dropdown">
                                    <div className="dropdown-item"><Link to="/user-info" className="unset-anchor nav-link">View Myself</Link></div>
                                    <div className="dropdown-item"><Link to="/sign-out" className="unset-anchor nav-link">Sign Out</Link></div>
                                </div>
                                </li>
                                : 
                                <li className="nav-item active">
                                    <Link to="/sign-in" className="unset-anchor nav-link">Sign In</Link>
                                </li>
                        }
                        <li className="nav-item active">
                            <Link to="/saleitemtest" className="unset-anchor nav-link">SaleItem</Link>
                        </li>
                        <li className="nav-item active">
                            <Link to="/saleitemList" className="unset-anchor nav-link">SaleItemList</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = (state: IState) => {
    return {
        currentUser: state.auth.currentUser
    }
}

export default connect(mapStateToProps)(NavComponent);
