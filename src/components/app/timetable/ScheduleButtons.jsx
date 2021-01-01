import { Component } from "react";

export class ScheduleButtons extends Component {
    constructor(props) {
        super(props);
        this.advance = props.advance;
        this.backwards = props.backwards;
        this.date = props.date;
        console.log(this.date)
    }

    render() {
        return <div className="d-flex flex-row mt-3 justify-content-between">

            <button className="p-2 btn btn-primary" onClick={this.backwards}>
                Back
            </button>
            
            <div className="p-2">
                {this.date.toFormat('DDDD')}
            </div>

            <button className="p-2 btn btn-primary" onClick={this.advance}>
                Next
            </button>
        </div>
    }
}
