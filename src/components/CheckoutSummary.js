import React from "react"
import Burger from "./Burger"
import classes from "./CheckoutSummary.css"
import Button from "./Button"

const CheckoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>hope it tastes well</h1>
            <div style={{width: "300px", margin: "auto"}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType="Danger" clicked={props.checkoutCancelled}>Cancel</Button>
            {props.isAuth ? <Button btnType="Success" clicked={props.checkoutContinued}>Place Order</Button> :
                                    <Button btnType="Success" clicked={props.checkoutContinuedToReg}>Continue</Button>}
        </div>
    )
}

export default CheckoutSummary;