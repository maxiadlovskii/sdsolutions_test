import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect} from "react-router-dom";
import {menuItems} from "../constants";
import Home from './home'
import Employees from './Employees'

class index extends Component {
    render() {
        if(!menuItems.map(item=>item.link.replace(/[.\/\\]/g,"")).includes(this.props.pathname)) return <Redirect from = '/' to = '/home/'/>
        const props = this.props
        return (
            <div>
            <Switch>
                <Route exact path={'/home/'} component={Home}/>
                <Route exact path={'/emp/'} render={routeProps => (<Employees {...routeProps} {...props}/>)}/>
                </Switch>
            </div>
        );
    }
}

index.propTypes = {};
index.defaultProps = {};

export default index;
