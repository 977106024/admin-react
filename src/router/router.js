import React from "react";
import {Route} from "react-router-dom";

import Login from '../pages/Login/Login'
import Index from '../pages/Index/Index'
import GameConfig from '../pages/game/GameConfig/GameConfig'
import GameQuery from '../pages/game/GameQuery/GameQuery'

export default class RouterApp extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Route path="/login" component={Login}></Route>
                <Route path="/gameConfig" component={GameConfig}></Route>
                <Route path="/gameQuery" component={GameQuery}></Route>
            </div>
        )
    }
}