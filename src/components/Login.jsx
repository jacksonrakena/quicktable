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
            idNumber: ''
        };

        this.updateValue = this.updateValue.bind(this);
    }

    updateValue(v, d) {
        this.setState({
            id: v.target.value
        });
    }

    render() {
        return <div className="content">
            <div>
                <h3>Quicktable</h3>
                Welcome to the Quicktable @ Scots College student portal.
                <br />
                Quicktable is your all-in-one solution for life at Scots College.
                <br />
                It includes quick access to your timetable, school resources, with more
                <br />
                features coming soon.
                <br />
                <br />

                All you'll need to jump in is your school username and password, <strong>or</strong> your student ID number.
            </div>
            <br />
            <form className="mb-5 mt-2">
                <b>Option 1: Your Student ID Number (Photocopier ID)</b>
                <div class="form-group">
                    <label for="id">Your student ID number (or photocopier ID)</label>
                    <input id='id' style={{
                        width: '250px'
                    }} className="form-control" inputMode="numeric" type="number" placeholder="5 or 6 digits" onChange={(v, d) => {
                        this.setState({
                            idNumber: v.target.value
                        });
                    }} />

                </div>
                <button type="submit" onClick={(d) => {
                    d.preventDefault();
                    this.props.history.push('/app/' + this.state.idNumber);
                }} className="btn btn-danger mb-1" disabled={this.state.loading}>{this.state.loading ? <div>
                    <span>Connecting...</span>
                </div> : "Connect to Scots College"}</button>
            </form>
            <hr />
            <form>
                <b>Option 2: Your School Username And Password</b>
                <div class="text-danger mb-3">
                    <b>{this.state.error}</b>
                </div>
                <div class="form-group">
                    <label for="domain">Domain</label>
                    <input id='domain' style={{
                        width: '250px'
                    }} className="form-control" type="text" placeholder="SCOTSCOLLEGE\student" readOnly />
                </div>

                <div class="form-group" style={{
                    width: '350px'
                }}>
                    <label for="usernameInput">Your school username</label>
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
                    <label for="passwordInput">Your school password</label>
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
                                this.props.history.push('/app/' + d.data.d.filter(f => f.Key === "MEMBER_ID")[0].Value);
                            }).catch(c => {
                                this.setState({ loading: false, error: c.response.data.Message });
                            });
                        }
                    }} className="btn btn-danger mb-1" disabled={this.state.loading}>{this.state.loading ? <div>
                        <span>Connecting...</span>
                    </div> : "Connect to Scots College"}</button>
                </div>
            </form>

            {false && <div className="mt-5">
                <h4>Where can I find my student ID number?</h4>
                <span style={{ color: 'gray' }}>Your student ID number is stored solely on your device and is never sent to Quicktable's servers.</span>
                <div className="mt-2">
                    You've got a couple of options.
                    <div className="mt-2">
                        <b>Option 1: Your School-Issued Student ID Card</b> <br />
                        <div>
                            Your student ID number is printed on the bottom of your school-issued student ID card, typically issued
                            to new students in March.<br />
                            It's located underneath the barcode, as you can see in the example image below, taken from a Senior School student
                            ID card issued in 2020.
                        </div>
                        <img alt="Diagram of student ID card" src="img/id_expl.png" width="250" />
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
            </div>}
        </div>;
    }
}
