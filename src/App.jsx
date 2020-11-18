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
                    <Route exact path="/" component={Homepage} />
                </Switch>
            </div>
        </BrowserRouter>
    }
}

class Homepage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: ''
        }

        this.updateValue = this.updateValue.bind(this)
    }

    updateValue(v, d) {
        this.setState({
            id: v.target.value
        })
    }

    render() {
        return <div className="content">
            <div>
                Welcome to the Quicktable beta.
            </div>
            <form>
                <div class="form-row align-items-center justify-content-start">
                    <div class="col-auto">
                        <span>Please enter your student ID number:</span>
                    </div>
                    <div class="col-auto">
                        <div class="input-group">
                            <input type="text" class="form-control" id="inlineFormInputGroup" onChange={this.updateValue}  placeholder="5 or 6 digits" />
                        </div>
                    </div>
                    <div class="col-auto">
                        <NavLink to={`/app/${this.state.id}`}>
                            <button type="submit" class="btn btn-primary mb-1">Enter</button>
                        </NavLink>
                    </div>
                </div>
            </form>
            <footer class="footer">
                <div class="container">
                    <span class="text-muted">
                        Copyright &copy; 2019-2021 Jackson Rakena
                    </span>
                </div>
            </footer>
        </div>
    }
}