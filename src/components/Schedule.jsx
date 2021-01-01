import { Component } from "react";
import '../App.css';
import './Schedule.css';
import ScheduleEntry from "./app/timetable/ScheduleEntry";
import EventEntry from './EventEntry';
import axios from 'axios';
import { DateTime } from 'luxon';
import TodaySection from "./app/TodaySection";
import { ScheduleButtons } from "./app/timetable/ScheduleButtons";
import Timetable from "./app/timetable/Timetable";

export default class Schedule extends Component {
    constructor(props) {
        super(props)
        this.quotes = [
            {
                text: 'So we beat on, boats against the current, borne back ceaselessly into the past.',
                source: 'The Great Gatsby, F. Scott Fitzgerald'
            }
        ]
        this.state = {
            classes: [],
            id: props.match.params.id,
            error: '',
            date: DateTime.local(),
            events: [],
            doneEvents: [],
            eventsError: '',
            quote: {}
        }
        this.advance = this.advance.bind(this)
        this.backwards = this.backwards.bind(this)
    }

    updateTimetable(newDate) {
        console.log('tt update:' + (newDate ?? this.state.date).toFormat('dd/LL/yyyy'))
        this.setState({
            classes: [],
            done: false
        })
        console.log()
        axios.post('https://spider.scotscollege.school.nz/Spider2011/Handlers/Timetable.asmx/GetTimetable_ByDayW', {
            LoadFutureDate: false,
            Date: (newDate ?? this.state.date).toFormat('dd/LL/yyyy'),
            StudentID: this.state.id,
            TeacherID: 0
        }).then(d => {
            var data = d.data.d;
            this.setState({
                classes: data.filter(c => {
                    return c.SubjectDesc
                }).map(c => {
                    return {
                        name: c.SubjectDesc,
                        room: c.Room,
                        teacher: c.Teacher,
                        startTime: c.FromTime,
                        endTime: c.ToTime,
                        slot: c.Heading,
                        color: ''
                    }
                }),
                done: true
            })
        }).catch(c => {
            this.setState({
                error: 'There was an error.'
            })
            console.log(c)
        })
    }

    componentDidMount() {
        this.updateTimetable()
    }

    advance() {
        let d = this.state.date.plus({ days: 1 })
        this.setState({
            date: d
        })
        this.updateTimetable(d)
    }

    backwards() {
        let d = this.state.date.plus({ days: -1 })
        this.setState({
            date: d
        })
        this.updateTimetable(d)
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
                        {<Timetable id={this.state.id} />}
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