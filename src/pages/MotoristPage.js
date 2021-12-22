import React , { useState , useEffect} from "react";
import SideNavBar from "../components/SideBar/SideNavBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Bookings from "./Bookings";
import About from "./About";
import Support from "./Support";
import Registration from './Registration';
import ParkingLot from "./ParkingLot";
import PTable from "./PTable";
import Motorist from "./Motorist";
import GuardedRoute from "../components/GuardedRoute";
import AuthService from "../service/auth.service";

export default function MotoristPage() {
  const[isAutheticated, setisAutheticated] = useState(false);


  return (
    <>
      <Router>
        <SideNavBar />
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/booking" component={Bookings}></Route>
          <Route exact path="/about" component={About}></Route>
          <Route exact path="/support" component={Support}></Route>
          <Route exact path="/registration" component={Registration}></Route>
          <Route exact path="/parkingLot" component={ParkingLot}></Route>
          <Route exact path="/pTable" component={PTable}></Route>
          <Route exact path="/motorist" component={Motorist}></Route>
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