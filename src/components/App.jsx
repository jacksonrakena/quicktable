import { Component } from "react";
import '../Root.css';
import './App.css';
import TodaySection from "./app/TodaySection";
import Timetable from "./app/timetable/Timetable";

export default class App extends Component {
    constructor(props) {
        super(props)
        this.id = props.match.params.id
    }
    render() {
        return <div>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm panel">
                        {<TodaySection />}
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm panel">
                        {<Timetable id={this.id} />}
                    </div>
                    <div class="col-sm panel">
                        <h4>School resources</h4>
                        <div>
                            <ul>
                                <li><a href="http://www.scotscollege.school.nz/daily-notices/">Daily Notices</a></li>
                                <li><a href="https://scotscollegenz.sharepoint.com/SitePages/Home.aspx">Scot-E</a></li>
                                <li><a href="https://outlook.office.com/mail/inbox">School email</a></li>
                                <li><a href="https://spider.scotscollege.school.nz/Spider2011/Pages/Home.aspx">School spider</a></li>
                                <li><a href="https://secure.nzqa.govt.nz/for-learners/records/index.do">NZQA Results</a></li>
                                <li><a href="https://www.languageperfect.com/app/#/dashboard">Education Perfect</a></li>
                                <li><a href="http://scotsprn03:9191/user">Printing (Scots Wi-Fi only)</a></li>
                                <li><a href="https://app.careercentral.school.nz/my-credits">Career Central credit tracker</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="qt-footer">
                <div class="container-fluid">
                    <span class="text-muted">
                        &copy; 2019-2021 Jackson Rakena
                    </span>
                </div>
            </div>
        </div>
    }
}