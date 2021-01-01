import { Component } from "react";
import axios from 'axios';

export default class NewsSection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            error: ''
        }
    }

    componentDidMount() {
        axios.get('https://api.nytimes.com/svc/topstories/v2/world.json?api-key=eR31PriIHABUEKqz1gOvvfSLrdZfFaPB').then(d => {
            this.setState({data: d.data.results})
        }).catch(c => {
            this.setState({error: 'News service unavailable.', data: []})
        })
    }

    render() {
        return <div>
            <h4>News</h4>
            {this.state.error ?? ""}
            {this.state.data.length !== 0 ? <div>
                <ul>
                {this.state.data.slice(0, 5).map((art) => {
                    return <li key={art.uri}>
                        <a href={art.url} target="_blank">{art.title}</a>
                    </li>
                })}
                </ul>   
            </div> : <div>
                <div className="spinner-border" role="status"></div>
                <br />
                <span>Loading the latest news...</span>
            </div>}
        </div>
    }
}