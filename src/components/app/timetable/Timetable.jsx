import { Component } from "react";
import { DateTime } from 'luxon'
import axios from 'axios'
import TimetableClass from './TimetableClass';
import DateUtils from "../../../utils/DateUtils";
import ReactDatePicker from "react-datepicker";

export default class Timetable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            classes: [],
            id: props.id,
            error: '',
            date: DateUtils.findNearestWeekday(DateTime.local(), 'forwards'),
            isDateEditorOpen: false
        }
        this.advance = this.advance.bind(this)
        this.backwards = this.backwards.bind(this)
        this.toggleDateEditor = this.toggleDateEditor.bind(this)
        this.setDate = this.setDate.bind(this)
    }

    updateTimetable(newDate) {
        this.setState({
            classes: [],
            done: false
        })
        axios.post('https://spider.scotscollege.school.nz/Spider2011/Handlers/Timetable.asmx/GetTimetable_ByDayW', {
            LoadFutureDate: false,
            Date: (newDate ?? this.state.date).toFormat('dd/LL/yyyy'),
            StudentID: this.state.id,
            TeacherID: 0
        }).then(d => {
            var data = d.data.d;
            console.log(data)
            this.setState({
                classes: data.filter(c => {
                    return c.SubjectDesc || c.Heading
                }).map(c => {
                    return {
                        name: c.SubjectDesc,
                        room: c.Room,
                        teacher: c.Teacher,
                        email: c.TeacherEmail,
                        startTime: c.FromTime,
                        endTime: c.ToTime,
                        slot: c.Heading,
                        color: '',
                        class: c.Class,
                        startTimeF: DateTime.fromFormat(c.FromTime, "H'.'mm"),
                        endTimeF: DateTime.fromFormat(c.ToTime, "H'.'mm")
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
        let d = DateUtils.findNearestWeekday(this.state.date.plus({ days: 1 }), 'forwards')
        this.setState({
            date: d
        })
        this.updateTimetable(d)
    }

    backwards() {
        let d = DateUtils.findNearestWeekday(this.state.date.plus({ days: -1 }), 'backwards')
        this.setState({
            date: d
        })
        this.updateTimetable(d)
    }

    setDate(date) {
        date = DateTime.fromJSDate(date)
        this.setState({
            date: date
        })
        this.updateTimetable(date)
    }

    toggleDateEditor() {
        this.setState({
            isDateEditorOpen: !this.state.isDateEditorOpen
        })
    }

    /**
     * 
     * @param {DateTime} date 
     */
    createRelativeDateDisplay(date) {
        var difference = date.diff(DateTime.local())
        var dayDifference = Math.round(difference.shiftTo('days').days)
        if (dayDifference == 0) {
            return 'Today'
        } else if (dayDifference == 1) {
            return 'Tomorrow'
        } else if (dayDifference == -1) {
            return 'Yesterday'
        } else if (date.weekNumber == DateTime.local().minus({ weeks: 1}).weekNumber) {
            return 'Last ' + date.toFormat('EEEE')
        } else if (date.weekNumber == DateTime.local().plus({ weeks: 1 }).weekNumber) {
            return 'Next ' + date.toFormat('EEEE')
        }
        return date.toFormat('DDDD')
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
                <div class="jumbotron my-auto align-self-center">No classes found.</div>
            </div>
        } else {
            timetablePanel = <div>
                <div className="d-flex flex-column justify-content-between">
                {this.state.classes.map((element, i0) => {
                    return <TimetableClass entry={element} />
                })}
                </div>
            </div>
        }
        return <div>
            <h4>Timetable</h4>
            <div style={{
                marginBottom: '10px',
                color: 'grey'
            }}>
                {this.createRelativeDateDisplay(this.state.date)}
            </div>
            <div>
                {timetablePanel}
                <div className="d-flex flex-row mt-3 justify-content-between">
                    <button className="p-2 btn btn-warning" onClick={this.backwards}>Back</button>
                    
                    {this.state.isDateEditorOpen ? <div className="p-2">
                        <ReactDatePicker selected={this.state.date.toJSDate()} onChange={this.setDate} onCalendarClose={this.toggleDateEditor} startOpen={true}/>
                    </div> : <a href='#' className="p-2" onClick={this.toggleDateEditor}>
                        {this.state.date.toFormat('DDDD')}
                    </a>}

                    <button className="p-2 btn btn-warning" onClick={this.advance}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    }
}