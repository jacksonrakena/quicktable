import './App.css';
import { Component } from 'react';
import Schedule from './components/Schedule';
import { Route, Switch } from 'react-router';
import { BrowserRouter, Link, NavLink } from 'react-router-dom';


export default class App extends Component {
    render() {

        return <BrowserRouter>
            <div>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <NavLink class="navbar-brand" to="/">Quicktable</NavLink>

                    {/*<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                            <NavLink class="nav-item nav-link" activeClassName="nav-item nav-link active" to="/assignments">Assignments</NavLink>
                            {/* <li class="nav-item active">
                                <a class="nav-link" href="#">Timetable <span class="sr-only">(current)</span></a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Assignments</a>
                            </li>}
                        </ul>
                </div>*/}
                </nav>
                <Switch>
                    <Route exact path="/app/:id" component={Schedule} />
                    <Route exact path="/" component={Empty} />
                </Switch>
            </div>
        </BrowserRouter>
    }
}

class Empty extends Component {
    render() {
        return <div>Hi.</div>
    }
}