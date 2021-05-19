import { Component } from 'react';
import axios from 'axios';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            username: '',
            password: '',
            loading: false,
            idNumber: '',
            displayTrust: false
        };

        if (document.cookie && document.cookie.startsWith('qt-id::')) {
            var id = document.cookie.replace('qt-id::', '');
            this.props.history.push('/app/' + id);
        }

        this.updateValue = this.updateValue.bind(this);
    }

    updateValue(v, d) {
        this.setState({
            id: v.target.value
        });
    }

    render() {
        return <div className="content" /*style={{
            margin: '0 auto',
            width: '50%',
            marginTop: '25px',
            marginBottom: '25px'
        }}*/>
            <br />
            <div style={{
                //borderRadius: '25px',
                //border: '3px solid #dc3545',
                //padding: '25px',
                //margin: '0 auto',
                maxWidth: '700px',
            }}>
            <form style={{
                //margin: '0 auto'
            }}>
                <b style={{
                }}>Login with your school account</b>
                <div class="text-danger mb-3">
                    <b>{this.state.error}</b>
                </div>
                {/*<div class="form-group">
                    <label for="domain">🌐 Domain</label>
                    <input id='domain' style={{
                        width: '250px'
                    }} className="form-control" type="text" placeholder="SCOTSCOLLEGE\student" readOnly />
                </div>*/}

                <div class="form-group" style={{
                    width: '350px'
                }}>
                    <label for="usernameInput">Username</label>
                    <div class="input-group">
                        <input type="text" className="form-control" id="usernameInput" onChange={(v, d) => {
                            this.setState({
                                username: v.target.value
                            });
                        }} style={{
                            width: '200px !important'
                        }} placeholder="Username" />

                        <div class="input-group-append">
                            <span class="input-group-text" id="usernameInput">@scotscollege.school.nz</span>
                        </div>
                    </div>
                </div>

                <div className="form-group" style={{
                    width: '300px'
                }}>
                    <label for="passwordInput">Password</label>
                    <input type="password" className="form-control" id="passwordInput" onChange={(v, d) => {
                        this.setState({
                            password: v.target.value
                        });
                    }} placeholder="Password" />
                    <small id="usernameHelp" className="form-text text-muted">
                        Your password is only sent to Scots College and is never saved.
                    </small>
                </div>

                <div className="form-group">
                    <button type="submit" onClick={(d) => {
                        d.preventDefault();
                        if (this.state.username && this.state.password) {
                            this.setState({ loading: true });
                            axios.post('https://spider.scotscollege.school.nz/Spider2011/Handlers/Login.asmx/GetWebLogin', {
                                UserName: this.state.username,
                                Password: this.state.password,
                                SecurityKey: ""
                            }).then(d => {
                                console.log('Authorized');
                                console.log(d);
                                var id = d.data.d.filter(f => f.Key === "MEMBER_ID")[0].Value;
                                document.cookie = 'qt-id::' + id;
                                this.props.history.push('/app/' + id);
                            }).catch(c => {
                                this.setState({ loading: false, error: c.response.data.Message });
                            });
                        }
                    }} className="btn btn-danger mb-1" disabled={this.state.loading}>{this.state.loading ? <div>
                        <span>Connecting...</span>
                    </div> : "Login"}</button>
                    <br />
                    <br />
                    
                    {// eslint-disable-next-line 
                    <a href='javascript:void();' /*style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            textDecoration: 'underline',
                            display: 'inline',
                            margin: 0,
                            padding: 0
                    }} */ onClick={() => this.setState({displayTrust: !this.state.displayTrust})}>Can I trust the Timetable app?</a>}
                    <div style={{
                        display: this.state.displayTrust ? 'block' : 'none'
                    }}>
                        Yes, you can! <br /> <br />
                        <img style={{width: '100%' }} src="https://i.imgur.com/AMd3tWF.png" /> <br /> <br />
                        As seen in the above image, your browser only sends your school username and password to
                        Scots College's timetable infrastructure to get your student ID, which is used for
                        timetable information and events. <br /><br />
                        To protect your data in the transport process, all user information is sent securely with HTTPS, as seen in the image below.<br /> <br />
                        <img src="https://i.imgur.com/OHGYmnB.png" style={{width: '50%'}}/>
                    </div>
                </div>
            </form>
            </div>
        </div>;
    }
}
