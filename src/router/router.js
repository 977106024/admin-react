import React from "react";
import {Switch, Route} from "react-router-dom";

import Login from '../pages/Login/Login'
import Index from '../pages/Index/Index'
import GameConfig from '../pages/game/GameConfig/GameConfig'
import GameDetails from '../pages/game/GameConfig/GameDetais/GameDetails'
import GameQuery from '../pages/game/GameQuery/GameQuery'

class RouterMain extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Route exact path="/" component={GameConfig}></Route>
                <Route exact path="/index/gameConfig" component={GameConfig}></Route>
                <Route exact path="/index/gameConfig/gameDetails" component={GameDetails}></Route>
                <Route path="index/gameQuery" component={GameQuery}></Route>
            </div>
        )
    }
}

class RouterApp extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/index" component={Index}/>
                <Route path="/" component={Index}/>
            </Switch>
        )
    }
}

export {
    RouterMain,
    RouterApp
}
