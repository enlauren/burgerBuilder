import React, {Component} from 'react'
import Button from './Button';
import classes from './ContactData.css'
import axios from '../axios-orders';
import Spinner from './Navigation/Spinner';
import Input from './Custom/Input'
import { connect } from 'react-redux';
import withErrorHandler from '../hoc/withErrorHandler'
import * as actions from '../store/actions/index';


class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name'
                },
                value: '',
                validation: {
                    required: true
                }
            },

            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'A valid email adress'
                },
                value: '',
                validation: {
                    required: true
                }
            },

            adress: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Adress'
                },
                value: '',
                validation: {
                    required: true
                }
            },

            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZipCode'
                },
                value: '',
                validation: {
                    required: true
                }
            },

            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{value: 'fastest', displayValue: 'Fastest'},
                              {value: 'cheapest', displayValue: 'Cheapest'}]
                },
                value: 'fastest'
            }
        }
    }

    checkValidity(value, rules) {
        let isVal = false;
        if(rules.required)  {
            isVal = value.trim() !== '';
        }
        return isVal;
    }

    orderHandler=(event) =>{
        event.preventDefault();
        const fD = {};
        for(let f in this.state.orderForm)  {
            fD[f] = this.state.orderForm[f].value
        }
        
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: fD
        } 
        this.props.onOrderBurger(order,this.props.token);
    }

    inputChangeHandler =(e, inId) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }

        const s = {
            ...updatedOrderForm[inId]
        }

        s.value = e.target.value;
     //   s.valid = this.checkValidity(s.value, s.validation);
        updatedOrderForm[inId] = s;
        this.setState({orderForm: updatedOrderForm});
    }

    render() {

        const formElementsArray=[];
        for(let key in this.state.orderForm)    {
            formElementsArray.push({
                id:key,
                config: this.state.orderForm[key]
            })
        }

        let form = (<form>
                        
                        {formElementsArray.map(c => (
                            <Input elementType={c.config.elementType}
                                   elementConfig={c.config.elementConfig}
                                   value={c.config.value}
                                   key={c.id}
                                   changed={(e) => this.inputChangeHandler(e, c.id)}/>
                        ))}
                        <Button btnType="Success" clicked={this.orderHandler}>Order</Button>      
                    </form>);
        if(this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        )

    }
}

const mapStateToProps = state => {
    return {
        ings: state.burger.ingredients,
        price: state.burger.totalPrice,
        loading: state.order.loading,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (p, token) => dispatch(actions.purchaseBurger(p,token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));