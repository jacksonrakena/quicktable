import { Component } from "react";
import '../Root.css';
import './App.css';
import TodaySection from "./app/TodaySection";
import Timetable from "./app/timetable/Timetable";
import NewsSection from "./app/NewsSection";

export default class App extends Component {
    constructor(props) {
        super(props)
        this.id = props.match.params.id
    }
    render() {
        return <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm panel">
                        {<TodaySection />}
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm panel">
                        {<Timetable id={this.id} />}
                    </div>
                    <div className="col-sm panel">
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
                        <NewsSection />
                    </div>
                </div>
            </div>
            <div className="qt-footer">
                <div className="container-fluid">
                    <span className="text-muted">
                        &copy; 2019-2021 Jackson Rakena
                    </span>
                </div>
            </div>
        </div>
    }
}