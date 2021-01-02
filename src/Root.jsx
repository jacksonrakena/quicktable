import './Root.css';
import { Component } from 'react';
import App from './components/App';
import { Route, Switch } from 'react-router';
import { BrowserRouter, NavLink } from 'react-router-dom';
import { DateTime } from 'luxon';

export default class Root extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: DateTime.fromObject({zone: 'Pacific/Auckland'}),
            interval: setInterval(() => {
                this.setState({date: DateTime.fromObject({zone: 'Pacific/Auckland'})})
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
                    backgroundImage: 'linear-gradient(to bottom right, rgba(255,255,126,1), rgba(255,255,126,0))'
                }}>
                     <NavLink class="navbar-brand" to="/"><img alt="QT logo" src="/ms-icon-310x310.png" style={{
                        justifySelf: 'center',
                        width: '2em'
                     }}/> Quicktable, Scots College</NavLink><br />
                     <span style={{
                         color: 'gray',
                     }}><i className="far fa-clock" style={{
                         justifySelf: 'center',
                         display: 'inline',
                         width: '100%',
                         textAlign: 'center'
                     }}></i> {this.state.date.toFormat('DDDD, h:mm a (ZZZZZ)')}</span>
                </nav>
                <Switch>
                    <Route exact path="/" component={Homepage} />
                    <Route exact path="/app/:id" component={App} />
                    <Route component={Unknown} />
                </Switch>
            </div>
            <div className="qt-footer">
                <div className="container-fluid">
                    <span className="text-muted">
                        &copy; 2019-2021 Jackson Rakena. All rights reserved. <br />
                        Build <code>{this.props.version}</code>. <br />
                        <a href="https://developer.nytimes.com/"><img src="https://developer.nytimes.com/files/poweredby_nytimes_200a.png?v=1583354208344" /></a>
                    </span>
                </div>
            </div>
        </BrowserRouter>
    }
}

class Unknown extends Component {
    render() {
        return <div>
            That page was not found.
        </div>
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
                Welcome to the Quicktable @ Scots College student beta programme.
                <br />
                Quicktable is your all-in-one solution for life at Scots College.
                <br/>
                It includes quick access to your timetable, school resources, with more
                <br/>
                features coming soon.
                <br />
                <br />

                All you'll need to jump in is your 5 or 6-digit student ID number.
            </div>
            <form className="mt-3">
                <div className="form-row align-items-center justify-content-start">
                    <div className="col-auto">
                        <span>Please enter your student ID number:</span>
                    </div>
                    <div className="col-auto">
                        <div className="input-group">
                            <input type="number" className="form-control" id="inlineFormInputGroup" onChange={this.updateValue}  placeholder="5 or 6 digits" />
                        </div>
                    </div>
                    <div className="col-auto">
                        <NavLink to={`/app/${this.state.id}`}>
                            <button type="submit" className="btn btn-primary mb-1">Enter</button>
                        </NavLink>
                    </div>
                </div>
            </form>
            <div className="mt-5">
                <h4>Where can I find my student ID number?</h4>
                <span style={{color:'gray'}}>Your student ID number is stored solely on your device and is never sent to Quicktable's servers.</span>
                <div className="mt-2">
                    You've got a couple of options.
                    <div className="mt-2">
                        <b>Option 1: Your School-Issued Student ID Card</b> <br/>
                        <div>
                            Your student ID number is printed on the bottom of your school-issued student ID card, typically issued
                            to new students in March.<br />
                            It's located underneath the barcode, as you can see in the example image below, taken from a Senior School student
                            ID card issued in 2020.
                        </div>
                        <img alt="Diagram of student ID card" src="img/id_expl.png" width="250"/>
                    </div>
                    <div className="mt-2">
                        <b>Option 2: The PCSchool Portal</b><br />
                        <div>
                            Your student ID number is available on the PCSchool portal. You can go there directly by clicking <a href="https://spider.scotscollege.school.nz/Spider2011/Pages/StudentInformation.aspx">this link.</a><br />
                            It's located next to the "Barcode" label in your student information, as you can see in the example image below, taken
                            from a Senior School student's information page.
                        </div>
                        <img alt="Diagram of PCSchool Student Information page" src="img/net_expl.png" width="400" />
                    </div>
                </div>
            </div>
        </div>
    }
}