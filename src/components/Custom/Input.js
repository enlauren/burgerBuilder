import React from 'react';
import classes from './Input.css'

const Input =(props) => {

    let inElement = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType) {
        case ('input'):
            inElement = <input className={inputClasses.join(' ')} onChange={props.changed} {...props.elementConfig} value={props.value}/>;
            break;
        case ('textarea'):
            inElement = <textarea className={inputClasses.join(' ')} onChange={props.changed} {...props.elementConfig} value={props.value}/>;
            break;
        case ('select'):
            inElement = <select onChange={props.changed} className={classes.InputElement} value={props.value}>
                            {props.elementConfig.options.map(op=>(
                                <option key={op.value}value={op.value}>{op.displayValue}</option>
                            ))}</select>;
            break;
        default:
            inElement = <input className={classes.Input} {...props.elementConfig} value={props.value}/>;
            break;
    }

    return (
        <div className={classes.Input} >
            <label htmlFor={props.label} className={classes.Label}>{props.label}</label>
            {inElement}
        </div>
    )
}


export default Input;