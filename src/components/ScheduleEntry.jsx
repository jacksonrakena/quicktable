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
        return <button type="button" class="btn btn-block slot" style={{
            backgroundColor: this.generateColorForClass(this.props.entry.name)
        }}>
            <span class="class-name">{this.props.entry.name}</span> <br />
            <b>Room {this.props.entry.room}</b> {this.props.entry.teacher} <br />
            {this.props.entry.slot} ({this.props.entry.startTime} - {this.props.entry.endTime})
        </button>
    }
}