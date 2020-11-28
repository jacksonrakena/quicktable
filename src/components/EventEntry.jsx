import { Component } from "react";

export default class EventEntry extends Component {
    render() {
        return <li>
            {this.props.entry.name}
        </li>
    }
}