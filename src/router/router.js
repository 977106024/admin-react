import React from "react";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

import Login from '../pages/Login/Login'
import Index from '../pages/Index/Index'

export default class RouterApp extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Router>
                <Route path="/" component={Login}></Route>
                <Route path="/Index" component={Index}></Route>
            </Router>
        )
    }
}