import { Component } from "react";
import '../Root.css';
import './App.css';
import TodaySection from "./app/TodaySection";
import Timetable from "./app/timetable/Timetable";

class ResourceLink extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <li>
            <a href={this.props.url} target="_blank">{this.props.name}</a>
        </li>
    }
}

export default class App extends Component {
    constructor(props) {
        super(props)
        this.id = props.match.params.id
        this.links = {
            'Daily Notices': 'http://www.scotscollege.school.nz/daily-notices/',
            'Scot-E': 'https://scotscollegenz.sharepoint.com/SitePages/Home.aspx',
            'School email': 'https://outlook.office.com/mail/inbox',
            'School spider': 'https://spider.scotscollege.school.nz/Spider2011/Pages/Home.aspx',
            'NZQA Results': 'https://secure.nzqa.govt.nz/for-learners/records/index.do',
            'Education Perfect': 'https://www.languageperfect.com/app/#/dashboard',
            'Printing (Scots Wi-Fi only)': 'http://scotsprn03:9191/user',
            'Career Central credit tracker': 'https://app.careercentral.school.nz/my-credits'
        }
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
                                {Object.keys(this.links).map(key => {
                                    return <ResourceLink url={this.links[key]} name={key} />
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}