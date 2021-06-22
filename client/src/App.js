import React from "react"
import {BrowserRouter} from 'react-router-dom'
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {Navbar} from "./components/Navbar";
import 'materialize-css'

function App() {
    const {login, logout, token, userId} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)
  return (
      <AuthContext.Provider value={{login, logout, userId, token, isAuthenticated}}>
          <BrowserRouter>
              { isAuthenticated ? <Navbar /> : null}
                <div className="container">
                    {routes}
                </div>
          </BrowserRouter>
      </AuthContext.Provider>
  )
}

export default App
