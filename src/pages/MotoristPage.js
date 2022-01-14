import React , { useState , useEffect} from "react";
import SideNavBar from "../components/SideBar/SideNavBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Bookings from "./Bookings";
import About from "./About";
import Support from "./Support";
import Registration from './Registration';
import AttendantRegistration from "./AttendantRegistration";
import ParkingLot from "./ParkingLot";
import PTable from "./PTable";
import GuardedRoute from "../components/GuardedRoute";
import AuthService from "../service/auth.service";
import ParkingLotDetails from "./ParkingLotDetails";
import AttendantPage from "./AttendantPage";
import BookingDetails from "./BookingDetails";
import AccountSettingsAdmin from "./AccountSettingsAdmin";
import {MessagesSettings} from "./MessagesSettings";
import AccountSettingsAttendant from "./AccountSettingsAttendant";
import AccountSettingsMotorist from "./AccountSettingsMotorist";

export default function MotoristPage() {
  const[isAutheticated, setisAutheticated] = useState(false);


  return (
    <>
      <Router>
        <SideNavBar />
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/booking" component={Bookings}></Route>
          <Route exact path="/bookingDetails" component={BookingDetails}></Route>
          <Route exact path="/about" component={About}></Route>
          <Route exact path="/support" component={Support}></Route>
          <Route exact path="/registration" component={Registration}></Route>
          <Route exact path="/attendantRegistration" component={AttendantRegistration}></Route>
          <Route exact path="/parkingLot" component={ParkingLot}></Route>
          <Route exact path="/parkingLotsDetails" component={ParkingLotDetails}></Route>
          <Route exact path="/attendantsList" component={AttendantPage}></Route>
          <Route exact path="/accountAdmin" component={AccountSettingsAdmin}></Route>
          <Route exact path="/accountAttendant" component={AccountSettingsAttendant}></Route>
          <Route exact path="/accountMotorist" component={AccountSettingsMotorist}></Route>
        </Switch>
      </Router>
    </>
  );
}


/*
  const[motoristPage, setMotoristPage] = useState(false);
  const[attendantPage, setAttendantPage] = useState(false);
  const[adminPage, setAdminPage] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);


  useEffect(() =>{
    const user = AuthService.getCurrentUser();
    if(user){
      setCurrentUser(user);
      setMotoristPage(user.role.includes(""));
      setAttendantPage(user.role.includes(""));
      setAdminPage(user.role.includes(""));
    }
  }, []);
 */