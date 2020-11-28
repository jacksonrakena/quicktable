import { Component } from "react";
import '../App.css';
import './Schedule.css';
import ScheduleEntry from "./ScheduleEntry";
import EventEntry from './EventEntry';
import axios from 'axios';
import { DateTime } from 'luxon';

export default class Schedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            classes: [],
            id: props.match.params.id,
            error: '',
            date: DateTime.local(),
            events: [],
            doneEvents: [],
            eventsError: ''
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
        let timetablePanel;
        if (this.state.error) {
            timetablePanel = <div class="container h-100 d-flex justify-content-center align-content-center">
            <div class="jumbotron my-auto align-self-center">
                <span>{this.state.error}</span>
            </div>
            </div>
        } else if (this.state.classes.length === 0 && !this.state.done) {
            timetablePanel = <div class="container h-100 d-flex justify-content-center align-content-center">
            <div class="jumbotron my-auto align-self-center">
                <div class="spinner-border" role="status"></div>
                <br />
                <span>Loading timetable...</span>
            </div>
            </div>
        } else if (this.state.classes.length === 0 && this.state.done) {
            timetablePanel = <div class="container h-100 flex-column justify-content-center align-content-center">
            <div class="jumbotron my-auto align-self-center">No classes today.</div>
            <div class="d-flex flex-row justify-content-between align-items-baseline my-auto">
                <button class="btn btn-primary" onClick={this.backwards}>
                    Back
                </button>
                <span>
                    {this.state.date.toFormat('DDDD')}
                </span>
                <button class="btn btn-primary" onClick={this.advance}>
                    Next
                </button>
            </div>
            </div>
        } else {
            timetablePanel = <div>
            {this.state.classes.map((element, i0) => {
                return <ScheduleEntry entry={element} />
            })}
            <div class="d-flex flex-row justify-content-between align-items-baseline">
                <button class="btn btn-primary" onClick={this.backwards}>
                    Back
                </button>
                <span>
                    {this.state.date.toFormat('DDDD')}
                </span>
                <button class="btn btn-primary" onClick={this.advance}>
                    Next
                </button>
            </div>
            </div>
        }

        return <div class="container-fluid">
            <div class="row">
                <div class="col-sm panel">
                    <h4>Timetable</h4>
                    <div class="tt-subheading">
                        {this.state.date.toFormat('DDDD')}
                    </div>
                    {timetablePanel}
                </div>
                <div class="col-sm panel">
                    <h4>Assignments</h4>
                    <div>
                        This feature is coming soon.
                    </div>
                </div>
            </div>
        </div>
    }
}