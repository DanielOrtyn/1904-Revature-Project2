import React from "react";
import { connect } from 'react-redux';
import { environment } from "../../environment";
import { Category } from "../../model/category";
import { IDisplayName } from "../../model/IDisplayName";
import { User } from "../../model/user";
import { IState } from "../../reducers";

const allCategory = new Category(-1, 'All')

interface INewSaleCardProps {
    currentUser: User
}

interface INewSaleCardState {
    name: string;
    imgUrl: string;
    minPrice: number;
    endDate: Date;
    title: string;
    description: string;
    category: Category;
    listOfCategories: Category[]
}

export class NewSaleCardComponent extends React.Component<INewSaleCardProps, INewSaleCardState> {
    constructor(props) {
        super(props);
        let newDate: Date = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
        this.state = {
            name: '',
            minPrice: 10.0,
            endDate: newDate,
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
    
    componentDidMount = async () => {
        await this.fetchListOfCategories();
    }

    changeCategoryShown = (newCategory: IDisplayName) => {
        if (newCategory && newCategory instanceof Category) {
            this.setState({
                category: newCategory
            });
        }
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value });
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
        this.setState({ endDate: event.target.value });
    }

    render() {
        const dateString = `${this.state.endDate.getUTCFullYear()}-${this.state.endDate.getUTCMonth()}` +
            `-${this.state.endDate.getUTCDate()}`;
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
                                    <h5 className="centered">Select Picture</h5>
                                </td>
                                <td className="FixedCardImage">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">Name<input value={this.state.name} type='string' onChange={this.handleNameChange.bind(this)}></input></li>
                                        <li className="list-group-item">Minimum Price<input value={this.state.minPrice} type='number' onChange={this.handleMinPriceChange.bind(this)}></input></li>
                                        <li className="list-group-item">Title<input value={this.state.title} type='string' onChange={this.handleTitleChange.bind(this)}></input></li>
                                        <li className="list-group-item">Description<input value={this.state.description} type='string' onChange={this.handleDescriptionChange.bind(this)}></input></li>
                                        <li className="list-group-item">Image<input value={this.state.imgUrl} type='string' onChange={this.handleImgUrlChange.bind(this)}></input></li>
                                        <li className="list-group-item">End Date<input value="2018-05-05" type='date' onChange={this.handleEndDateChange.bind(this)}></input></li>
                                        {/* <li className="list-group-item"><Button className="btn btn-success" onClick={this.updateUser}>Create User</Button></li> */}
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

export default connect(mapStateToProps)(NewSaleCardComponent);
