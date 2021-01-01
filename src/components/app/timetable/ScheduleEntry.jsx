import { Component } from "react";
import './ScheduleEntry.css';

export default class ScheduleEntry extends Component {
    generateColorForClass(name) {
        var hash = 0;
        if (name.length === 0) return hash;
        for (var i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
            hash = hash & hash;
        }
        var color = '#';
        for (var i = 0; i < 3; i++) {
            var value = (hash >> (i * 8)) & 255;
            color += ('00' + value.toString(16)).substr(-2);
        }
        return color;
    }
    render() {
        return <div style={{
            backgroundColor: this.generateColorForClass(this.props.entry.name) + 'AA',
            listStyle: 'none'
        }} className="p-2">
            <div className="d-flex flex-row justify-content-between">
                <span>{this.props.entry.startTimeF.toFormat('h:mm a')} </span>
                <b>{this.props.entry.class} {this.props.entry.name}</b>
                <span>{this.props.entry.endTimeF.toFormat('h:mm a')}</span>
            </div>
            <div className="text-center">
                Room {this.props.entry.room} - {this.props.entry.teacher}
            </div>
        </div>
    }
}