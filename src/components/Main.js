import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './Home';
import EditProduct from './EditProduct';
import NoMatch from './NoMatch'
import { initializeProductAction } from '../store/actions';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('data init');
    this.props.dispatch(initializeProductAction());
  }

  render() {
    return (
      <div className="App-wrapper">
        <BrowserRouter>
            <div className='container'>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/edit-product' component={EditProduct} />
                <Route component={NoMatch} />
              </Switch>
            </div>
        </BrowserRouter>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    // user: state.currentUser || {},
    // isAuth: state.isAuthenticated,
  }
}

export default connect(mapStateToProps)(Main);
