import React from 'react';
import { SaleItem } from '../../model/saleItem';
// import { SmallSaleItemComponent } from './saleitem.smallcard.component';
import { SaleItemSmallCardComponent } from '../SaleItemList/saleitem-smallcard.component';
import { User } from '../../model/user';
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import { UserBid } from '../../model/UserBid';
import {UserBidListCardComponent} from './user-bid-list-card.component'

interface IUserBidListState {
    currentUser: User,
    userBidList: UserBid[]
}
interface IUserBidListProps {
    currentUser: User
}

export class UserBidListComponent extends React.Component<IUserBidListProps, IUserBidListState> {

    constructor(props: any) {
        super(props);
        this.state = {
            currentUser: this.props.currentUser,
            userBidList: []
        };
    }

    componentDidMount = async () => {
        try {
            const resp = await fetch('http://localhost:8080/bid/findByBidder', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(this.state.currentUser),
                headers: {
                    'content-type': 'application/json'                    
                }                
            });
            const body = await resp.json();
            this.setState({
                userBidList: body
            })
        } catch (err) {
            console.log(err);
        }
    }

//   componentDidMount = async () => {
//     const resp = await fetch('http://localhost:8080' + '/spaceships', {
//       credentials: 'include'
//     });
//     const body = await resp.json();
//     this.setState({
//       items: body
//     })
//   }

// submitReimbursement = async (event) => {
//     event.preventDefault();
//     this.state.reimbursement.dateSubmitted = new Date();
//     this.state.reimbursement.status = 1;
//     this.state.reimbursement.author = this.state.uId;
//     console.log(`befor post reimb typeId = ${this.state.reimbursement.type}`);
//     try {
//       const resp = await fetch('http://localhost:8080/reimbursements', {
//         method: 'POST',
//         credentials: 'include',
//         body: JSON.stringify(this.state.reimbursement),
//         headers: {
//           'content-type': 'application/json'
//         }
//       })
//       console.log(resp);

//       if (resp.status === 404) {
//         this.setState({
//           errorMessage: 'url not found'
//         });
//       } else if (resp.status === 201) {
//         // redirect to home page
//         // const user = await resp.json();
//         this.props.history.push('/home');
//       } else {
//         this.setState({
//           errorMessage: 'Cannot insert reimbursement due to error'
//         });
//       }
//     } catch (err) {
//       console.log(err);
//     }  
//   }


    render() {
        return (
            <>
                {this.state.userBidList.map(userBid => (
                    <UserBidListCardComponent  key={'saleItem-' + userBid.saleItem.saleId} userBid={userBid} />
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