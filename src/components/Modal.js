import React, {Component} from 'react'
import Auxi from '../hoc/Auxi'
import classes from './Modal.css'
import BackDrop from './BackDrop'

class Modal extends Component {


    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !==this.props.show || nextProps.children !== this.props.children;   
    }

    componentWillUpdate()   {
        
    }


    render()    {
        return (
            <Auxi>
                <BackDrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div>
                    <a className={classes.Modal} style={{transform:this.props.show ? 'translateY(0)' : 'translateY(-100vh)', opacity: this.props.show?'1':'0'}}> 
                        {this.props.children}
                    </a>
                </div>
            </Auxi>
        )
    }
        
}



export default Modal;


