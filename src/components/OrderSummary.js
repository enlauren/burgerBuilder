import React, {Component} from 'react'
import Auxi from '../hoc/Auxi';
import Button from './Button'


class OrderSummary extends Component   {
    
    
    render()    {   

    const ingredientSummary = Object.keys(this.props.ingredients).map(igKey=>{
        return (<li key={igKey}><span style={{textTransform:'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}</li>)})


    return  (
            <Auxi>
                <h3>Your Order</h3>
                <p>you have chosen the following ingredients: </p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>Total Price: {this.props.price}</p>
                <p>Continue to checkout?</p>
                <Button btnType="Danger" clicked={this.props.cancelC}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.continueC}>CONTINUE</Button>
            </Auxi>
        )
    }
    
}


export default OrderSummary;