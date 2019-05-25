import React from "react";
import {Switch,Route} from "react-router-dom";

import Login from '../pages/Login/Login'
import Index from '../pages/Index/Index'
import GameConfig from '../pages/game/GameConfig/GameConfig'
import GameDetails from '../pages/game/GameConfig/GameDetais/GameDetails'
import GameQuery from '../pages/game/GameQuery/GameQuery'

export default class RouterApp extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route path="/login" component={Login}></Route>
                    <Route exact path="/gameConfig" component={GameConfig}></Route>
                    <Route path="/gameConfig/gameDetails" component={GameDetails}></Route>
                    <Route path="/gameQuery" component={GameQuery}></Route>
                </Switch>
            </div>
        )
    }
}