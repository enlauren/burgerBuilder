import React, { Component } from "react";

import Auxi from "../hoc/Auxi";
import Burger from "../components/Burger";
import BuildControls from "../components/BuildControls";
import Modal from "../components/Modal";
import OrderSummary from "../components/OrderSummary";
import Spinner from "../components/Navigation/Spinner";
import withErrorHandler from "../hoc/withErrorHandler";
import { connect } from "react-redux";
import axios from "../axios-orders";

import * as actions from "../store/actions/index";

class BurgerBuilder extends Component {
    state = {
        modalShow: false
    };

    componentDidMount() {
        this.props.initIngredientsHandler();
        /*
        axios.get("https://reactburger-dd619.firebaseio.com/ingredients.json")
        .then(response=>    {
            this.setState({ingredients: response.data})
        }).catch(error => {})
        */
    }

    updatePurchaseState = ingre => {
        const sum = Object.keys(ingre)
            .map(igKey => {
                return ingre[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0;
    };
    /*

    addIngredientHandler = (type) =>  {
        const oldCount = this.state.ingredients[type]+1;
        const updatedIngredient = {...this.state.ingredients};
     
        updatedIngredient[type] = oldCount;
        
        const priceAd = Math.round((INGREDIENT_PRICES[type]+this.state.totalPrice)*100)/100;
        this.setState({ingredients: updatedIngredient, totalPrice: priceAd}) 
        this.updatePurchaseState(updatedIngredient);
    }

    remIngredientHandler = (type) =>  {
        if(this.state.ingredients[type] > 0)    {
            console.log(this.state.ingredients[type])
            let sd = this.state.ingredients[type]-1;
            let all = {...this.state.ingredients}
            all[type] = sd;

            let oldPrice = Math.round((this.state.totalPrice - INGREDIENT_PRICES[type])*100)/100;
            this.setState({ingredients: all, totalPrice: oldPrice})
            this.updatePurchaseState(all);
        }
    }

*/

    purchasHandler = () => {
        this.setState({ modalShow: true });
    };

    modalClosedHandler = () => {
        this.setState({ modalShow: false });
    };

    pCHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push("./checkout");
        /*
        const queryParams = [];
        for(let i in this.props.ings) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.ings[i]))
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });

        */

        /*   --  moved to checkout  -- instead of sending a direct ajax request
        this.setState({loading: true})  
        
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: "max shc",
                adress: {
                    street: " ssdad",
                    country: "romania"
                },
            email: "fastest"
            }
        } 
        axios.post("/orders.json", order).then(response=>{
            this.setState({loading: false, purchasable: false})})
            .catch(error=>{this.setState({loading: false, purchasable: false})});
 */
    };

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;

        let burger = this.props.err ? <p>Ingredients cannot be loaded</p> : <Spinner />;

        if (this.props.ings) {
            burger = (
                <Auxi>
                    <div className="flex-row main-content">
                        <section className="burgerBuilder">
                            <BuildControls
                                addIngredient={this.props.addIngredientHandler}
                                remIngredient={this.props.remIngredientHandler}
                                disabled={disabledInfo}
                                totalPrice={this.props.totalPrice}
                                ordered={this.purchasHandler}
                                purchasable={this.updatePurchaseState(this.props.ings)}
                            />
                        </section>
                        <section className="burgerGrafic">
                            <Burger ingredients={this.props.ings} />
                        </section>
                    </div>
                </Auxi>
            );
            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ings}
                    price={this.props.totalPrice}
                    cancelC={this.modalClosedHandler}
                    continueC={this.pCHandler}
                />
            );
        }

        return (
            <Auxi>
                <Modal show={this.state.modalShow} modalClosed={this.modalClosedHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxi>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredientHandler: ingName => dispatch(actions.addIngredient(ingName)),
        remIngredientHandler: ingName => dispatch(actions.removeIngredient(ingName)),
        initIngredientsHandler: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    };
};

const mapStateToProps = state => {
    return {
        totalPrice: state.burger.totalPrice,
        ings: state.burger.ingredients,
        err: state.burger.error
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
