import { Component } from "react";

import { ResourceLink } from "../ResourceLink";

export default class SchoolResourceSection extends Component {
    constructor(props) {
        super(props)
        this.links = {
            'Daily Notices': 'http://www.scotscollege.school.nz/daily-notices/',
            'Scot-E': 'https://scotscollegenz.sharepoint.com/SitePages/Home.aspx',
            'School email': 'https://outlook.office.com/mail/inbox',
            'School spider': 'https://spider.scotscollege.school.nz/Spider2011/Pages/Home.aspx',
            'NZQA Results': 'https://secure.nzqa.govt.nz/for-learners/records/index.do',
            'Education Perfect': 'https://www.languageperfect.com/app/#/dashboard',
            'Anonymous Problem Form': 'https://forms.office.com/Pages/ResponsePage.aspx?id=4UXEQo29zUinql1hG4EBcw-cgxuQRblHiPNDV08vuEFUOFhBRFlVRko5SElQVTdTV0RVWVRJMU45Ui4u',
            'School Mental Health Resources': 'https://www.scotscollege.school.nz/middle-school/pastoral-care/',
            'Career Central credit tracker': 'https://app.careercentral.school.nz/my-credits'
        }
    }
    render() {
        return <div>
            <h4>School resources</h4>
                        <p style={{color: 'darkgrey'}}>Last updated: March 2, 2021</p>
                        <div>
                            <ul>
                                {Object.keys(this.links).map(key => {
                                    return <ResourceLink url={this.links[key]} name={key} />
                                })}
                            </ul>
                            <div>
                                {// eslint-disable-next-line 
                    <a href='javascript:void();' /*style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            textDecoration: 'underline',
                            display: 'inline',
                            margin: 0,
                            padding: 0
                    }} */ onClick={() => {
                        document.cookie = '';
                        this.props.history.push('/')
                    }}>Sign out</a>}
                            </div>
            </div>
        </div>
    }
}