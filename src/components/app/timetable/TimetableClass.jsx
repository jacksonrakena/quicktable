import { Component } from "react";
const randomColor = require('randomcolor');

export default class TimetableClass extends Component {
    generateColorForClass(name) {
        /*
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
        return color;*/
        return randomColor({
            seed: name,
            luminosity: 'light'
        })
    }
    
    render() {
        console.log(this.props.entry)
        var styles = {
            backgroundColor: this.generateColorForClass(this.props.entry.name || this.props.entry.slot) + '8C',
            listStyle: 'none',
            border: '1px solid white',
        }
        if (this.props.entry.isSpecial) {
            //styles.marginTop = '10px';
            //styles.marginBottom = '10px';
            //styles.borderTop = styles.borderBottom =  '5px solid black';
            styles.backgroundColor = 'white';
        }
        var header = this.props.entry.name ? <span>
            {this.props.entry.class} {this.props.entry.name}
        </span> : <span>
            {
                this.props.entry.slot.startsWith('Lesson ') ? <span>Study Period</span> : <span>{this.props.entry.slot}</span>
            }
        </span>

        if (this.props.entry.isChapel) {
            header = <span>{this.props.entry.slot}</span>
            this.props.entry.room = <span>&nbsp;</span>
        }
        if (this.props.entry.isStudyPeriod) {
            header = <span>Study Period</span>
            this.props.entry.room = <span>&nbsp;</span>
            styles.backgroundColor = 'white';
        }
        if (this.props.entry.isLunch) {
            header = <span>Lunch</span>
            this.props.entry.room = <span>&nbsp;</span>
        }
        if (this.props.entry.isInterval) {
            header = <span>Interval</span>
            this.props.entry.room = <span>&nbsp;</span>
        }
        if (this.props.entry.isAssembly) {
            this.props.entry.room = <span>&nbsp;</span>
            header = <span>{this.props.entry.slot}</span>
        }
        var isCompact = false;
        if (isCompact) {
            return <div style={styles} className={"p-2 align-middle"}>
            {/* Period time row */}
            <div className="d-flex flex-row justify-content-between">
                <span>{this.props.entry.startTimeF.toFormat('h:mm a')} </span>
                <b style={{paddingLeft: '5px', paddingRight: '5px'}}>{header}</b>
                <span>{this.props.entry.endTimeF.toFormat('h:mm a')}</span>
            </div>
            </div>
        }
        return <div style={styles} className={"p-2 align-middle"}>
            {/* Period time row */}
            <div className="d-flex flex-row justify-content-between">
                <span>{this.props.entry.startTimeF.toFormat('h:mm a')} </span>
                <b style={{paddingLeft: '5px', paddingRight: '5px'}}>{header}</b>
                <span>{this.props.entry.endTimeF.toFormat('h:mm a')}</span>
            </div>
            {this.props.entry.room !== "" && this.props.entry.teacher && this.props.entry.email && !this.props.entry.isAssembly && !this.props.entry.isChapel ? <div>
                <div className="text-center">
                   {this.props.entry.room}
                </div>
                {this.props.entry.teacher ? <div className="text-center">
                    {this.props.entry.teacher}</div> : <></>}
                </div> : <div>
                    {this.props.entry.room ? <div className="text-center">
                    {this.props.entry.room}
                </div> : <></>}
                <div className="text-center">
                &nbsp;
                </div>
    </div>}
        </div>
    }
}