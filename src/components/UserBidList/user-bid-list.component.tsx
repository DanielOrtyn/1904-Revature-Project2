import React from 'react';
import { SaleItem } from '../../model/saleItem';
import { User } from '../../model/user';
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import SaleItemSmallCardComponent from '../saleitem/saleitem-smallcard.component';

interface IUserSalesListState {
    currentUser: User,
    userSalesList: SaleItem[]
}
interface IUserSalesListProps extends RouteComponentProps<{}> {
    currentUser: User
}

export class UserBidListComponent extends React.Component<IUserSalesListProps, IUserSalesListState> {

    constructor(props: any) {
        super(props);
        this.state = {
            currentUser: this.props.currentUser,
            userSalesList: []
        };
    }

    componentDidMount = async () => {
        try {
            const resp = await fetch('http://localhost:8080/SaleItem/seller', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(this.state.currentUser),
                headers: {
                    'content-type': 'application/json'
                }
            });
            const body = await resp.json();
            this.setState({
                userSalesList: body
            })
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <>
                {this.state.userSalesList.map(item => (
                    <SaleItemSmallCardComponent key={'saleItem-' + item.saleId}
                        saleItem={item} history={this.props.history}
                        location={this.props.location} match={this.props.match} />
                ))}
            </>
        );
    }
}

const mapStateToProps = (state: IState) => {
    return {
        currentUser: state.auth.currentUser
    }
}

export default connect(mapStateToProps)(UserBidListComponent)