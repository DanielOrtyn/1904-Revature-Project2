import React from "react";
import { connect } from 'react-redux';
import { environment } from "../../environment";
import { Category } from "../../model/category";
import { IDisplayName } from "../../model/IDisplayName";
import { User } from "../../model/user";
import { IState } from "../../reducers";
import { RouteComponentProps } from "react-router";
import { Button } from "reactstrap";
import { SaleItem } from "../../model/saleItem";
import { ImageModel } from "../../model/imageModel";
import { newSaleItem } from "../../actions/sales.actions";
import { DropDownListInputComponent } from "../input/dopdownlist.component";

const allCategory = new Category(-1, 'All')

interface INewSaleCardProps extends RouteComponentProps<{}> {
    currentUser: User;
    newSaleItem: (newSaleItem: SaleItem, history: any) => void;
}

interface INewSaleCardState {
    name: string;
    imgUrl: string;
    minPrice: number;
    endDate: string;
    title: string;
    description: string;
    category: Category;
    listOfCategories: Category[];
}

export class NewSaleCardComponent extends React.Component<INewSaleCardProps, INewSaleCardState> {
    constructor(props) {
        super(props);
        let newDate: Date = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
        this.state = {
            name: '',
            minPrice: 10.0,
            endDate: this.dateToString(newDate),
            title: '',
            description: '',
            imgUrl: "http://improvementarchitecture.co.uk/wp-content/uploads/2015/02/missing-profile-picture.jpg",
            category: allCategory,
            listOfCategories: [allCategory]
        }
    }

    fetchListOfCategories = async () => {
        let newlistOfCategories: Category[] = [];
        const resp = await fetch(environment.context + '/category', {
            method: 'GET',
            credentials: 'include'
        });
        newlistOfCategories = await resp.json();
        newlistOfCategories = newlistOfCategories.map(item =>
            new Category(item.categoryId, item.name));
        newlistOfCategories.unshift(allCategory);
        this.setState({
            listOfCategories: newlistOfCategories
        });
    }

    createNewSale = async () => {
        let newItemImage: ImageModel = new ImageModel(NaN, this.state.imgUrl, this.state.title);
        let newSaleItem: SaleItem = new SaleItem(NaN, this.props.currentUser, newItemImage,
            this.state.minPrice, (new Date(this.state.endDate)).getTime().toString()/*.toISOString()*/, this.state.title,
            this.state.description, this.state.category, undefined);
console.log(newSaleItem);
        const resp = await fetch(environment.context + '/SaleItem', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(newSaleItem),
            headers: {
                'content-type': 'application/json'
            }
        })
        const parsedResp = await resp.json();
        if (resp.status >= 200 && resp.status < 200) {
            this.props.newSaleItem(parsedResp, this.props.history);
            this.props.history.push('/sale-page')
        }
    }

    componentDidMount = async () => {
        // check that there is a user to actually make a sale
        if (this.props.currentUser) {
            await this.fetchListOfCategories();
        }
        else {
            this.props.history.push('/home')
        }
    }

    changeCategoryShown = (newCategory: IDisplayName) => {
        if (newCategory && newCategory instanceof Category) {
            this.setState({
                category: newCategory
            });
        }
    }
    handleMinPriceChange(event) {
        this.setState({ minPrice: event.target.value });
    }
    handleTitleChange(event) {
        this.setState({ title: event.target.value });
    }
    handleDescriptionChange(event) {
        this.setState({ description: event.target.value });
    }
    handleImgUrlChange(event) {
        this.setState({ imgUrl: event.target.value });
    }
    handleEndDateChange(event) {
        console.log(event.target.value)
        try {
            const newDate: Date = new Date(event.target.value);
            console.log(event.target.value);
            this.setState({ endDate: event.target.value });
        }
        catch (e) {
            console.log(e);
        }
    }

    dateToString(dateString: Date): string {
        return `${dateString.getUTCFullYear().toString().padStart(4, '0')}` +
            `-${(dateString.getUTCMonth() + 1).toString().padStart(2, '0')}` +
            `-${dateString.getUTCDate().toString().padStart(2, '0')}`;
    }

    render() {
        const dateString = this.state.endDate;
        // `${this.state.endDate.getUTCFullYear().toString().padStart(4, '0')}` +
        //     `-${(this.state.endDate.getUTCMonth()+1).toString().padStart(2, '0')}` +
        //     `-${this.state.endDate.getUTCDate().toString().padStart(2, '0')}`;
        console.log(dateString);
        return (
            <div key={'Creating-User'} className="col-sm-2 col-md-6 col-sm-12">
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <img src={this.state.imgUrl}
                                        className="FixedCardImg"
                                        alt="..." />
                                </td>
                                <td className="FixedCardImage">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">Title
                                            <input value={this.state.title} type='string' onChange={this.handleTitleChange.bind(this)}></input>
                                        </li>
                                        <li className="list-group-item">Description
                                            <input value={this.state.description} type='string' onChange={this.handleDescriptionChange.bind(this)}></input>
                                        </li>
                                        <li className="list-group-item">Minimum Price
                                            <input value={this.state.minPrice} type='number' onChange={this.handleMinPriceChange.bind(this)}></input>
                                        </li>
                                        <li className="list-group-item">Image
                                            <input value={this.state.imgUrl} type='string' onChange={this.handleImgUrlChange.bind(this)}></input>
                                        </li>
                                        <li className="list-group-item">Category
                                            <DropDownListInputComponent optionsList={this.state.listOfCategories}
                                                updateSelection={this.changeCategoryShown} />
                                        </li>
                                        <li className="list-group-item">End Date
                                            <input value={dateString} type='date' onChange={this.handleEndDateChange.bind(this)}></input>
                                        </li>
                                        <li className="list-group-item">
                                            <Button className="btn btn-success" onClick={this.createNewSale}>Create User</Button>
                                        </li>
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
        currentUser: state.auth.currentUser,
        saleItem: state.sales.displayItem
    }
}

const mapDispatchToProps = {
    newSaleItem: newSaleItem
}

export default connect(mapStateToProps, mapDispatchToProps)(NewSaleCardComponent);
