import React from 'react'
import classes from './Order.css'

const order = (props) => {

  const nts = [];
  for(let key in props.ingredients)  {
    nts.push({name: key, amount: props.ingredients[key]})
  }

  const inOutput = nts.map(ig=>{
    return <span style={{ 
                          textTransform: 'capitalize', 
                          display: 'inline-block',
                          border: '1px solid #ccc',
                          margin: '0 8px',
                          padding: '2px 5px 0 5px'
                        }}
                 key={ig.name}> {ig.name}   {ig.amount} </span>
  })

  return (
    <div className={classes.Order}>
        <p>Ingredients: {inOutput}</p>
        <p>Price: <strong>USD {props.price}</strong></p>
    </div>
  )
}

export default order
