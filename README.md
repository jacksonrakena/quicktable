# ⭐️ Scots College: Timetable Link (Quicktable)
https://timetable.scots.link/  
Quicktable is a React Progressive Web Application (PWA) timetable manager for students of Scots College. It uses the open PCSchool timetable API to fetch users' timetables using their provided student ID number.

## Authorization flow - technical explanation
Quicktable users can opt to either authorize with their student ID number, or their school username and password. This section will explain these two authorization flows.    
  
**School username and password**  
Quicktable (client-side) will send an HTTPS request to `Spider2011/Handlers/Login.asmx/GetWebLogin` ([usage](https://github.com/scotscollegenz/quicktable/blob/main/src/Root.jsx#L175)) with the username and password in the body. The returned user object (if authorized) will contain a `MEMBER_ID` property which contains their student ID number, which is then forwarded onto the next flow.  
  
**Student ID number**  
The student ID number is cached in the request URL (i.e. `/app/idnumber`).
  
**Requests**  
For each request for timetable information for a given date, Quicktable sends a request to `Spider2011/Handlers/Timetable.asmx/GetTimetable_ByDayW` ([usage](https://github.com/scotscollegenz/quicktable/blob/main/src/components/app/timetable/Timetable.jsx#L29)) with the date and student ID number attached. The response data is an array of classes, and is filtered and rendered using the [TimetableClass](https://github.com/scotscollegenz/quicktable/blob/main/src/components/app/timetable/TimetableClass.jsx) React component.

## How to run
`npm install` and `npm start` will start the CRA development server.

## Data privacy
Quicktable is designed to run as a serverless (static) web app on Netlify, Vercel, GitHub Pages, or other static host. It does not have a database or backend server and all data is stored in the browser.

## Copyright
(**Formerly**) &copy; 2019-2021 Jackson Rakena *et al.*, all rights previously reserved.  
&copy; 2021-present Scots College Student Digital Committee (Komiti Matihiko), under the GNU GPLv3 license. 
