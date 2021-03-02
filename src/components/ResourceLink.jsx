import { Component } from "react";

export class ResourceLink extends Component {
    render() {
        return <li>
            <a href={this.props.url} target="_blank">{this.props.name}</a>
        </li>;
    }
}
