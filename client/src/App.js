import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom"
import './App.css';
import Navbar from "../src/components/layout/Navbar"
import Footer from "../src/components/layout/Footer"
import Landing from "../src/components/layout/Landing"
import Login from "../src/components/auth/Login"
import Register from "../src/components/auth/Register"
// import Landing from "../src/components/layout/Landing"
// import Landing from "../src/components/layout/Landing"

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Navbar/>
                    <Route exact path='/' component={Landing}/>
                    <div className="container">
                        <Route exact path='/login' component={Login}/>
                        <Route exact path='/register' component={Register}/>
                    </div>
                    <Footer/>
                </div>
            </Router>
        );
    }
}

export default App;
