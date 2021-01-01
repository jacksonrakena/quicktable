import { Component } from "react";
import axios from 'axios';
import { DateTime } from 'luxon';

export default class TodaySection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            quote: {
                text: 'Loading quote...',
                source: 'Unknown'
            }
        }
    }
    componentDidMount() {
        axios.get('https://quotes.rest/qod?category=students&language=en', {headers: {accept: 'application/json'}}).then(d => {
            var data = d.data.contents.quotes[0]
            this.setState({
                quote: {
                    text: data.quote,
                    source: data.author
                }
            })
        }).catch(e => {
            this.setState({
                quote: {
                    text: 'Failed to load quote.'
                }
            })
        })
    }

    render() {
        return <div>
            <h4>Today</h4>
            Welcome to Quicktable! <br />
            It's {DateTime.fromObject({zone: 'Pacific/Auckland'}).toFormat('DDDD', {

            })} in Wellington.
            <br />
            <br />
            <div>
                Here's the quote of the day:
            </div>
            <span style={{
                color: 'gray',
                marginTop: '10px'
            }}>
                “{this.state.quote.text}{this.state.quote.text.endsWith(".") ? "" : "."}”<br /></span><span>
                <i>—{this.state.quote.source}</i>
            </span>
        </div>
    }
}