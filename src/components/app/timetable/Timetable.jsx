import { Component } from "react";
import { DateTime } from 'luxon'
import axios from 'axios'
import TimetableClass from './TimetableClass';
import DateUtils from "../../../utils/DateUtils";
import ReactDatePicker from "react-datepicker";
import './animations.css';

export default class Timetable extends Component {
    constructor(props) {
        super(props)
        var initialDate = DateUtils.findNearestWeekday(DateTime.local(), 'forwards');
        if (initialDate.hour >= 15) initialDate = DateUtils.nextWeekday(initialDate, 'forwards');
        this.state = {
            classes: [],
            id: props.id,
            error: '',
            date: initialDate,
            isDateEditorOpen: false,
            loadingMessage: ''
        }
        this.advance = this.advance.bind(this)
        this.backwards = this.backwards.bind(this)
        this.toggleDateEditor = this.toggleDateEditor.bind(this)
        this.setDate = this.setDate.bind(this)
    }

    updateTimetable(newDate) {
        this.setState({
            classes: [],
            done: false,
            loadingMessage: 'Loading...'
        })
        axios.post('https://spider.scotscollege.school.nz/Spider2011/Handlers/Timetable.asmx/GetTimetable_ByDayW', {
            LoadFutureDate: false,
            Date: (newDate ?? this.state.date).toFormat('dd/LL/yyyy'),
            StudentID: this.state.id,
            TeacherID: 0
        }).then(d => {
            var data = d.data.d;
            console.log(data)
            data = data.filter(c => {
                return c.SubjectDesc || c.Heading
            }).map(c => {
                var data = {
                    name: c.SubjectDesc,
                    teacher: c.Teacher ? <span>
                        {c.Teacher} <a style={{
                        color: 'black'
                    }} href={"mailto:"+c.TeacherEmail}><i class="far fa-envelope"></i></a>
                    </span> : <span>&nbsp;</span>,
                    email: c.TeacherEmail,
                    startTime: c.FromTime,
                    endTime: c.ToTime,
                    slot: c.Heading,
                    short: c.SubjectAbbrev,
                    class: c.Class,
                    startTimeF: DateTime.fromFormat(c.FromTime, "H'.'mm"),
                    endTimeF: DateTime.fromFormat(c.ToTime, "H'.'mm"),
                    day: c.Day,
                    isInterval: false,
                    isLunch: c.Heading && c.Heading.includes('Lunch') && !c.Heading.includes('Chapel') && !c.Heading.includes('Assembly'),
                    isAssembly: c.Heading && c.Heading.includes('Assembly'),
                    isChapel: c.Heading && c.Heading.includes('Chapel'),
                    isStudyPeriod: !c.Teacher && !c.Room && !c.SubjectDesc,
                };
                data.isSpecial = data.isInterval || data.isLunch || data.isAssembly || data.isChapel;
                data.room = (c.Room && !data.isLunch && !data.isInterval && !data.isAssembly && !data.isChapel && !data.isStudyPeriod) ? <span>Room {c.Room}</span> : <span>&nbsp;</span>;
                return data;
            })
            data.forEach((value, key) => {
                if (value.endTime === '13.15' && data[key+1].startTime === '14.00') {
                    data.splice(key+1, 0, {
                        name: 'Lunch',
                        isLunch: true,
                        isInterval: false,
                        isSpecial: true,
                        startTimeF: DateTime.fromFormat('13.15', "H'.'mm"),
                        endTimeF: DateTime.fromFormat('14.00', "H'.'mm"),
                        getIsNoColor: () => true,
                        noDisplayRoom: true
                    })
                }
            })
            if (data.length !== 0) {
                data.splice(2, 0, {
                    name: 'Interval',
                    isInterval: true,
                    isNoColor: true,
                    isSpecial: true,
                    startTimeF: DateTime.fromFormat('10.45', "H'.'mm"),
                    endTimeF: DateTime.fromFormat('11.15', "H'.'mm"),
                    getIsNoColor: () => true,
                    noDisplayRoom: true
                })
            }
            this.setState({
                classes: data,
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

    setToday() {
        var date = DateTime.local()
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
        return date.toFormat('EEEE')
    }

    render() {
        let timetablePanel;
        if (this.state.error) {
            timetablePanel = <div class="container h-100 d-flex justify-content-center align-content-center">
                <div class="jumbotron my-auto align-self-center">
                    <span>{this.state.error}</span>
                </div>
            </div>
        }
        else {
            timetablePanel = <div style={{
            }}>
                <div className="d-flex flex-column justify-content-between">
                <div style={{
            backgroundColor: 'grey',
            color: 'white',
            listStyle: 'none'
        }} className="p-2 text-center">
            <div className="d-flex flex-row justify-content-between">
                <div>
                    <button className="p-2 btn" style={{backgroundColor: '#dc3545',
                        color: 'white'}} onClick={this.backwards}>Back</button>
                </div>
                <strong className="align-self-center" style={{fontSize: '1.1em'}}>
                {this.state.isDateEditorOpen ? <div className="p-2" id='date-editor'>
                        <ReactDatePicker selected={this.state.date.toJSDate()} onChange={this.setDate} onCalendarClose={this.toggleDateEditor} startOpen={true} onCalendarOpen={this.onCalendarOpen}/>
                    </div> : <a href='#' className="p-2" onClick={this.toggleDateEditor} style={{color: 'white'}}>
                    {this.createRelativeDateDisplay(this.state.date)}{this.state.classes[0] ? (this.state.classes[0].day > 5 ? ", Week B" : ", Week A") : ""} <br />  <span style={{fontWeight: 'normal'}}>{this.state.date.toFormat('DDDD')}</span>
                    </a>}

                </strong>
                <div>
                <button className="p-2 btn" style={{backgroundColor: '#dc3545', color: 'white'}} id='date-editor-btn' onClick={this.advance}>
                        Next
                    </button>
                </div>
            </div>
            </div>
            
            {this.state.classes.length === 0 && !this.state.done ?
                <div style={{
                    //backgroundColor: this.generateColorForClass(this.props.entry.name || this.props.entry.slot) + 'AA',
                    listStyle: 'none',
                    border: '1px solid white',
                    //margin: '0 auto',
                    //background: 'linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3)'
                }} className={"p-2 align-middle animate-rainbow"}><span style={{
                    margin: '0 auto',
                    textAlign: 'center',
                    color: 'white',
                    fontWeight: 'bold'
                }}>{this.state.loadingMessage ?? 'Loading...'}</span><br /></div>
                /*<div class="jumbotron my-auto align-self-center">
                    <div class="spinner-border" role="status"></div>
                    <br />
                    <span>Loading timetable...</span>
                </div>*/
            : ''}
            {this.state.classes.length === 0 && this.state.done ?
                <span>No classes found.</span>
            : ''}
                {this.state.classes.map((element, i0) => {
                    return <TimetableClass entry={element} />
                })}
                </div>
            </div>
        }
        return <div>
            <h4>Your timetable {this.state.date.ordinal !== DateTime.local().ordinal ? <a href="#" onClick={this.setToday.bind(this)}>Today</a> : <></>}</h4>
            {/*<div style={{
                marginBottom: '10px',
                color: 'grey',
                textAlign: 'center',
                fontSize: 'larger',
                fontWeight: 'bold'
            }}>
                {this.createRelativeDateDisplay(this.state.date)} {this.state.date.ordinal !== DateTime.local().ordinal ? <a href="#" onClick={this.setToday.bind(this)}>Today</a> : <></>}
        </div>*/}
            <div style={{marginTop: '20px'}}>
                {timetablePanel}
            </div>
        </div>
    }
}