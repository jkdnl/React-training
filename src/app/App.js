import React from "react"
import NavBar from "./components/ui/navBar"
import Users from "./layouts/users"
import { Switch, Route, Redirect } from "react-router-dom"
import Login from "./layouts/login"
import Main from "./layouts/main"

export default function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/users/:userId?" component={Users} />
                <Redirect to="/" />
            </Switch>
        </>
    )
}
