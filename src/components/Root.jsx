import './Root.css';
import { Component } from 'react';
import App from './App';
import { Route, Switch } from 'react-router';
import { BrowserRouter, NavLink } from 'react-router-dom';
import { DateTime } from 'luxon';
import { Unknown } from '../Unknown';
import { Login } from './Login';

export default class Root extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: DateTime.fromObject({ zone: 'Pacific/Auckland' }),
            interval: setInterval(() => {
                this.setState({ date: DateTime.fromObject({ zone: 'Pacific/Auckland' }) })
            }, 60000)
        }
    }
    componentWillUnmount() {
        clearInterval(this.state.interval)
    }
    render() {
        return <BrowserRouter>
            <div>
                <nav class="navbar  navbar-light" style={{
                    backgroundImage: 'linear-gradient(to bottom right, rgba(154, 147, 242, 0.667), rgba(154, 147, 242, 0))'
                }}>
                    <NavLink class="navbar-brand" to="/"><img alt="QT logo" src="/master-transparent.png" style={{
                        justifySelf: 'center',
                        width: '2em'
                    }} /> Quicktable, Scots College</NavLink><br />
                    <span><i className="far fa-clock" style={{
                        justifySelf: 'center',
                        display: 'inline',
                        width: '100%',
                        textAlign: 'center'
                    }}></i> {this.state.date.toFormat('DDDD, h:mm a (ZZZZZ)')}</span>
                </nav>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/app/:id" component={App} />
                    <Route component={Unknown} />
                </Switch>
            </div>
            <div className="qt-footer">
                <div className="container-fluid">
                    <span className="text-muted">
                        &copy; 2019-2021 <a href="http://github.com/scotscollegenz">Scots College Digital Committee (Komiti Matihiko).</a><br />
                        {/*}All rights reserved. Build <code>{this.props.version}</code>.<br />
                        Made in New Zealand <img src="/img/nz_flag.svg" style={{
                            height: '1em',
                            width: 'auto',
                            justifySelf: 'center'
                        }}/>*/}
                    </span>
                </div>
            </div>
        </BrowserRouter>
    }
}