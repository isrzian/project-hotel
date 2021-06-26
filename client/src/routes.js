import React from "react"
import {Switch, Route, Redirect} from "react-router-dom"
import {RoomsPage} from "./pages/RoomsPage";
import {CreateRoom} from "./pages/CreateRoom";
import {DetailRoom} from "./pages/DetailRoom";
import {AuthPage} from "./pages/AuthPage";
import {ConveniencePage} from "./pages/ConveniencePage";
import {EditRoom} from "./pages/EditRoom";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/rooms" component={RoomsPage} exact />
                <Route path="/create-room" component={CreateRoom} exact />
                <Route path="/conveniences" component={ConveniencePage} exact />
                <Route path="/room/:id" component={DetailRoom} />
                <Route path="/edit-room/:id" component={EditRoom} />
                <Redirect to="/rooms" />
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/" component={AuthPage} exact />
            <Redirect to="/" />
        </Switch>
    )
}