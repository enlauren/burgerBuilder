import React, {Component} from 'react'
import CheckoutSummary from "../components/CheckoutSummary"
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';



class Checkout extends Component {


/*
    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
         //   ['salad', '1']
            if (param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ingredients: ingredients, totalPrice: price});
    }

    */


    checkoutCancelledHandler=() => {
        this.props.history.goBack();
    }


    checkoutContinuedHandler=() => {
    //   this.props.history.replace('/checkout/contact-data')
        this.props.history.push('/auth');
    }
    checkoutContinuedToRegisterHandler= () => {
        this.props.history.push('/auth/register');
    }

    render() {
        let summary = <Redirect to="/"/>;
        
        if(this.props.ings)    {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = (
                <div>
                {purchasedRedirect}
                <CheckoutSummary ingredients={this.props.ings} 
                        checkoutCancelled={this.checkoutCancelledHandler} 
                        checkoutContinued={this.checkoutContinuedHandler}
                        checkoutContinuedToReg={this.checkoutContinuedToRegisterHandler}
                        isAuth={this.props.isAuth}/>
                
                </div>
            );
        }
        return summary;
    }

}

const mapStateToProps = state => {
    return {
        ings: state.burger.ingredients,
        price: state.burger.totalPrice,
        purchased: state.order.purchased,
        isAuth: state.auth.token !== null,
    }
}



export default connect(mapStateToProps)(Checkout);