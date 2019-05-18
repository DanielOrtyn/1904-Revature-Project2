import React from 'react';
import { SaleItem } from '../../model/saleItem';
import { User } from '../../model/user'
import SaleItemSmallCardComponent from '../saleitem/saleitem-smallcard.component';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { RouteComponentProps } from 'react-router';

interface IUserSalesListState {
    currentUser: User,
    userSalesList: SaleItem[]
}
interface IUserSalesListProps extends RouteComponentProps<{}>{
    currentUser: User
}

export class UserSalesListComponent extends React.Component<IUserSalesListProps, IUserSalesListState> {

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
            if(resp.status === 200) {
                const body: SaleItem[] = await resp.json();
                this.setState({
                    userSalesList: body
                });
            }
            
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <>
                {this.state.userSalesList && this.state.userSalesList.map(saleItem => (
                    <SaleItemSmallCardComponent key={'saleItem-' + saleItem.saleId}
                        saleItem={saleItem} history={this.props.history}
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

export default connect(mapStateToProps)(UserSalesListComponent)