import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import Layout from './hoc/Layout';
import BurgerBuilder from './containers/BurgerBuilder';
import Checkout from './containers/Checkout';
import  Orders  from './components/Orders/Orders'
import Auth from './containers/Auth';
import Logout from './containers/Logout';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class App extends Component {
  render() {
    return (
        <Layout>
          <Switch>
              <Route path="/checkout" component={Checkout}/>
              {this.props.token ? <Route path="/orders" component={Orders}/> : <Route path="/auth" component={Auth}/>}
              <Route path="/logout" component={Logout} />
              <Route path="/auth" component={Auth} />
              <Route path="/" exact component={BurgerBuilder}/>
          </Switch>
        </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token
  }
}

export default withRouter(connect(mapStateToProps)(App));
