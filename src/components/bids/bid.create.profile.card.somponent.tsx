import React from "react";
import { connect } from 'react-redux';
import { RouteComponentProps } from "react-router";
import { Button } from "reactstrap";
import { newSaleItem } from "../../actions/sales.actions";
import { SaleItem } from "../../model/saleItem";
import { User } from "../../model/user";
import { UserBid } from "../../model/UserBid";
import { IState } from "../../reducers";


interface INewBidCardProps extends RouteComponentProps<{}> {
    saleItem: SaleItem;
    currentUser?: User;
    newSaleItem: (newSaleItem: SaleItem, history: any) => void
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
            const bidResp = await fetch(`http://localhost:8080/bid`, {
                method: "PUT",
                credentials: "include",
                body: JSON.stringify(newBid),
                headers: {
                    'content-type': 'application/json'
                }
            });
            const bidJson = bidResp.json();
            console.log(bidJson);
            if (bidResp.status >= 200 && bidResp.status < 300) {
                return;
            }
            const saleItemUpdateResp = await fetch(`http://localhost:8080/SaleItem/id/` + this.props.saleItem.saleId, {
                method: "Get",
                credentials: "include"
            });

            this.props.newSaleItem(await saleItemUpdateResp.json(), this.props.history);

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

const mapStateToProps = (state: IState) => {
    return {
    }
}

const mapDispatchToProps = {
    newSaleItem: newSaleItem
}

export default connect(mapStateToProps, mapDispatchToProps)(NewBidCardComponent);
