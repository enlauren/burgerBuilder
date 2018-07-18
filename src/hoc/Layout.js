import React, {Component} from 'react';
import classes from './Layout.css';
import Auxi from './Auxi';
import Toolbar from '../components/Navigation/Toolbar'
import SideDrawer from "../components/Navigation/SideDrawer";
import { connect } from 'react-redux'

class Layout  extends Component {


    state={
        showSideDrawer: false
    }

    sideDrawerOpenHandler=()  =>    {
        this.setState({showSideDrawer: true})
    }

    sideDrawerClosedHandler=()=>{
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }

    render ()   {
        return(
            <Auxi>
            <Toolbar token={this.props.token} isAuth={this.props.isAuthenticated} openSideDrawer={this.sideDrawerOpenHandler}/>
            <SideDrawer isAuth={this.props.isAuthenticated} token={this.props.token} closed={this.sideDrawerClosedHandler} open={this.state.showSideDrawer} />
            <main className={classes.Content}>
                {this.props.children}
            </main>
            </Auxi>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        isAuthenticated: state.auth.token !== null
    }
}


export default connect(mapStateToProps, null)(Layout);
