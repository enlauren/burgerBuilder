import React from 'react';

import classes from './Burger.css';
import BurgerIncredient from './BurgerIncredient';

const Burger = (props) =>{


    let transformedIngredients = Object.keys(props.ingredients)
                .map(igKey=>{return [...Array(props.ingredients[igKey])]
                    .map(( _, i) =>{return <BurgerIncredient key={igKey+i} type={igKey} />;})})
                    .reduce((arr,el)=>{return arr.concat(el)}, []);

    if(transformedIngredients.length === 0)    {
        transformedIngredients = <p>Please start adding ingredients.</p>
    };

/*
    let igKey = Object.keys(props.ingredients).map(igKey=>{return [...Array(props.ingredients[igKey])]});
    console.log(igKey)
    console.log(Object.keys(props.ingredients)
    .map(igKey=>{return [...Array(props.ingredients[igKey])]
        .map(( _, i) =>{return igKey+i;})}))
*/

    return (
        <div className={classes.Burger}>
            <BurgerIncredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIncredient type="bread-bottom"/>
        </div>
    );
}

export default Burger;