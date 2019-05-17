import React from "react";
import { Redirect, RouteComponentProps } from "react-router";
import { Button } from "reactstrap";
import { SaleItem } from "../../model/saleItem";
import { User } from "../../model/user";
import { UserBid } from "../../model/UserBid";


interface INewBidCardProps extends RouteComponentProps<{}> {
    saleItem: SaleItem;
    currentUser?: User;
}

interface INewBidCardState {
    bidMaximum: number;
}

export class NewBidCardComponent extends React.Component<INewBidCardProps, INewBidCardState> {
    constructor(props) {
        super(props);
        this.state = {
            bidMaximum: props.saleItem ? props.saleItem.currentBid.currentBidPrice : NaN
        }
    }
    handleBidMaximumChange = (event) => {
        this.setState({ bidMaximum: event.target.value });
    }

    createBid = async () => {
        if (this.props.currentUser) {
            let newBid: UserBid = new UserBid(
                this.props.saleItem.saleId, this.props.currentUser,
                this.state.bidMaximum, 0.0
            );
            const resp = await fetch(`http://localhost:8080/bid`, {
                method: "PUT",
                credentials: "include",
                body: JSON.stringify(newBid),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    }

    render() {
        const minBid: number = this.props.saleItem ? this.props.saleItem.currentBid.currentBidPrice : 0;
        return (
            <div key={'Creating-Bid'} className="col-sm-2 col-md-6 col-sm-12">
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <td className="FixedCardImage">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">Current Winning Bid: {this.props.saleItem.currentBid.currentBidPrice}</li>
                                        <li className="list-group-item">Your Max Bid<input min={minBid} type='number' onChange={this.handleBidMaximumChange}></input></li>
                                        <li className="list-group-item"><Button className="btn btn-success" onClick={this.createBid}>Create/Update Bid</Button></li>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <br>
                </br>
            </div>
        )
    }
}