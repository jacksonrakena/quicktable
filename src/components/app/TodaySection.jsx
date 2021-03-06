import { Component } from "react";

export default class TodaySection extends Component {
    render() {
        return <div>
            <h4>Today</h4>
            <span style={{marginTop: '10px', marginBottom: '10px', color: 'black', background: 'repeating-linear-gradient(45deg, white, white 10px, yellow 10px, yellow 20px)', padding: '10px'}}>
                <strong style={{backgroundColor: 'white', padding: '5px'}}>
                Wellington is at Alert Level 1.
                </strong>
            </span><br /><br />
            Make sure to check out the <a href="https://www.instagram.com/scots.co.nz/">@scots.co.nz</a> Instagram page.
        </div>
    }
}
