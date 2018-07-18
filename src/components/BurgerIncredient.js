import React, {Component} from 'react';
import classes from './BurgerIngredient.css';
import PropTypes from 'prop-types';



class BurgerIncredient extends Component  {
   
   render() {
   
        let incredient=null;

        switch (this.props.type) {
            case ('bread-bottom'):
                incredient = <div className={classes.BreadBottom}></div>;
                break;
            case ('bread-top'):
                incredient=(
                    <div className={classes.BreadTop}>
                        <div className={classes.Seeds1}></div>
                        <div className={classes.Seeds2}></div>
                    </div>
                );
                break;
            case ('cheese'):
                incredient = <div className={classes.Cheese}></div>;
                break;
            case ('bacon'):
                incredient = <div className={classes.Bacon}></div>;
                break;
            case ('salad'):
                incredient = <div className={classes.Salad}></div>;
                break;
            case ('meat'):
                incredient = <div className={classes.Meat}></div>;
                break;
            default:
                incredient=null;
        }
        return incredient;
    }
}

BurgerIncredient.propTypes  =   {
    type: PropTypes.string.isRequired
}
export default BurgerIncredient;