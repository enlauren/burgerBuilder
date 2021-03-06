import React from 'react';
import BuildControl from './BuildControl';
import classes from './BuildControls.css';


const controls = [
    { label: 'Salad', type: 'salad'},
    { label:'Bacon', type: 'bacon'},
    { label:'Cheese', type: 'cheese'},
    { label:'Meat', type: 'meat'}
];

const BuildControls = (props) => (

    

    <div className={classes.BuildControls}>
    <p>Current price: {props.totalPrice}</p>
        {controls.map(ctrl => (<BuildControl 
                                    key={ctrl.label} 
                                    label={ctrl.label} 
                                    added={()=>props.addIngredient(ctrl.type)}
                                    removed={()=>props.remIngredient(ctrl.type)}
                                    disabled={props.disabled[ctrl.type]}
                                    />))}

        <button className={classes.OrderButton}
                     disabled={!props.purchasable}
                     onClick={props.ordered}>ORDER NOW</button>
        
    </div>
);


export default BuildControls;