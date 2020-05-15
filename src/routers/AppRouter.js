import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "../components/HomePage";
import NavBar from "../components/NavBar";
import LoginPage from "../components/LoginPage.js";
import PageNotFound from "../components/NotFoundPage";
import Footer from "../components/Footer";
import App from "../components/App";
import M_attendance from "../components/M_attendance"
import App_test from "../App_test"
import AttendanceStatus from "../components/AttendanceStatus"
import LeaveApplications from "../components/LeaveApplications";


const AppRouter = () => (
    <BrowserRouter>
        <div>

        <NavBar/>
            <Switch>
                <Route path="/" exact component={LoginPage} />
                <Route path="/home" exact component={HomePage} />
                <Route path ="/home/geo-fence" exact component={App}/>
                <Route path="/home/manual-attendance" exact component={M_attendance}/>
                <Route path="/home/attendance-status" exact component={AttendanceStatus}/>
                <Route path="/home/leave-applications" exact component={LeaveApplications}/>
                <Route component={PageNotFound} />
            </Switch>
        <Footer/>
        </div>
    </BrowserRouter>
)

export default AppRouter;
