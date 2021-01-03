import { Component } from "react";

export default class TimetableClass extends Component {
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
            backgroundColor: this.generateColorForClass(this.props.entry.name || this.props.entry.slot) + 'AA',
            listStyle: 'none'
        }} className="p-2">
            <div className="d-flex flex-row justify-content-between">
                <span>{this.props.entry.startTimeF.toFormat('h:mm a')} </span>
                <b>{this.props.entry.name ? <span>
                    {this.props.entry.class} {this.props.entry.name}
                </span> : <span>
                    {this.props.entry.slot}
                </span>}</b>
                <span>{this.props.entry.endTimeF.toFormat('h:mm a')}</span>
            </div>
            {this.props.entry.room && this.props.entry.room !== " " ? 
                <div className="text-center">
                    Room {this.props.entry.room} - {this.props.entry.teacher} <a style={{
                        color: 'black'
                    }} href={"mailto:"+this.props.entry.email}><i class="far fa-envelope"></i></a>
                </div> : ""}
        </div>
    }
}