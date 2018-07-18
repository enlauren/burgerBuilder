import React, {Component } from 'react'
import Input from '../components/Custom/Input'
import Button from '../components/Button'
import classes from './Auth.css'
import * as action from '../store/actions/index'
import { connect } from 'react-redux'
import Spinner from '../components/Navigation/Spinner'
import { Redirect } from 'react-router-dom'

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'mail address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail:true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 7
                },
                valid: false,
                touched: false
            },
        },
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: false,
                touched: false
            },

            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'A valid email adress'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },

            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 7
                },
                valid: false,
                touched: false
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
                },
                valid: false,
                touched: false
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
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: false,
    }


    switchAuthModeHandler = () => {
        this.props.resetError();
        if(this.props.location.pathname === '/auth') {
            this.props.history.push('/auth/register');
            this.setState({isSignUp: true})
        } else {
            this.props.history.push('/auth');
            this.setState({isSignUp: false})
        }
    }

    inputChangeHandler = (event, controlName, stateFormType, formName) => {
        const updatedControls = {
            ...stateFormType,
            [controlName]: {
                ...stateFormType[controlName],
                value: event.target.value,
               valid: this.checkValidity(event.target.value, stateFormType[controlName].validation),
                touched: true
            }
        }

     //   this.setState({controls: updatedControls}); this was wrong and reseting my first form

        this.setState(prevState => {
            prevState[formName] = updatedControls;

            return {
                ...prevState
            }
        })
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    submitHandler = (E) => {
        E.preventDefault();
        this.state.isSignUp ? 
            this.props.onAuth(this.state.orderForm, true, this.props.token) :
            this.props.onAuth(this.state.controls, false, this.props.token);
    }


    render () {

        const formElArray = [];
        for (let k in this.state.controls) {
            formElArray.push({
                id:k,
                config: this.state.controls[k]
            })
        }

        const formElArrayRegister=[];
        for(let k in this.state.orderForm)    {
            formElArrayRegister.push({
                id:k,
                config: this.state.orderForm[k]
            })
        }

        /*
            <Route path={this.props.match.path + '/contact-data'}
                        component={ContactData}
                //        render={()=>(<ContactData ingredients={this.props.ings}
                        />
        */

       let form = formElArray.map(formE => (
            <Input key={formE.id}
                        elementType={formE.config.elementType}
                        elementConfig = {formE.config.elementConfig}
                        value = {formE.config.value}
                        invalid = {!formE.config.valid}
                        shouldValidate = {formE.config.validation}
                        touched = {formE.config.touched}
                        changed = {(event) => this.inputChangeHandler(event, formE.id, this.state.controls, 'controls')}
                />
            ));
        

        if(this.props.location.pathname === '/auth/register') {
                form=formElArrayRegister.map(formE => (
                    <Input key={formE.id}
                        elementType={formE.config.elementType}
                        elementConfig = {formE.config.elementConfig}
                        value = {formE.config.value}
                        invalid = {!formE.config.valid}
                        shouldValidate = {formE.config.validation}
                        touched = {formE.config.touched}
                        changed = {(event) => this.inputChangeHandler(event, formE.id, this.state.orderForm, 'orderForm')}
                    />  
            ));
        }



        let sp = <Spinner />;
        if(!this.props.loading) {
            sp = <div>
            
                <form onSubmit={this.submitHandler}>
                    {form}
                    {this.state.isSignUp ? <Button btnType="Success">Sign Up</Button> : <Button btnType="Success">Sign In</Button> }
                </form>
                <p className={classes.pHint}>{this.state.isSignUp ? 
                                            <span>Already a user? <Button clicked={this.switchAuthModeHandler} btnType="Danger"> Sign In</Button></span> 
                                            : <span>Create account? <Button clicked={this.switchAuthModeHandler} btnType="Danger"> Sign Up</Button></span>}
                                        </p></div>;
        }

        let errMsg = null;
        if(this.props.error) {
        errMsg = (<div>{this.props.error}</div>);
        }

        let authRedir = null;
        if(this.props.isAuthenticated) {
            authRedir = <Redirect to='/'/>;
        }

        return (
            <div className={classes.Auth}>
                {authRedir}
                {errMsg}
                {sp}
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onAuth: (a, isSignUp, token) => dispatch(action.authInit(a, isSignUp, token)),
        resetError: () => dispatch(action.emptyErrorMsg())
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);