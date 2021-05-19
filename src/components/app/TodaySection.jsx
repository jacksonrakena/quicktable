import { Component } from "react";
import { DateTime } from 'luxon';

export default class TodaySection extends Component {
    render() {
        return <div>
            <h4>Today</h4>
            {/*<div style={{width: 'max-content', marginTop: '10px', marginBottom: '10px', color: 'black', background: 'repeating-linear-gradient(45deg, white, white 10px, yellow 10px, yellow 20px)', padding: '10px'}}>
                <div style={{backgroundColor: 'white', padding: '10px'}}>
                    <div style={{color: 'grey'}}>
                        COVID-19 Update
                    </div>
                    <strong>Wellington is at Alert Level 1.</strong>
                </div>
            </div>*/}
            <span><i className="far fa-clock" style={{
                        justifySelf: 'center',
                        display: 'inline',
                        width: '100%',
                        textAlign: 'center'
                    }}></i> It's {DateTime.fromObject({zone: 'Pacific/Auckland'}).toFormat("h:mm a 'on' DDDD'.'")}</span>
                    <br />
        </div>
    }
}
