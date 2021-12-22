import * as React from "react";
import { Link } from "react-router-dom";
import { SideMenu } from "./SideMenu";
import {AttendantSideMenu} from "./AttendantSideMenu";
import {AdminSideMenu} from "./AdminSideMenu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import LoginDialog from "../LoginDialog";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Divider } from '@mui/material';
import {useEffect, useState} from "react";
import AuthService from "../../service/auth.service";

export default function SideNavBar() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const[motoristPage, setMotoristPage] = useState(false);
  const[attendantPage, setAttendantPage] = useState(false);
  const[adminPage, setAdminPage] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);


  useEffect(() =>{
    const user = AuthService.getCurrentUser();
    if(user){
      setCurrentUser(user);
      setMotoristPage(user.role.includes("ROLE_MOTORIST"));
      setAttendantPage(user.role.includes("ROLE_ATTENDANT"));
      setAdminPage(user.role.includes("ROLE_ATTENDANT"));
    }
  }, []);

  const login = () =>{
    setIsAuthenticated(true);
    console.log("loggedInUser:" + isAuthenticated);
  }

  const logout = () =>{
    setIsAuthenticated(false);
    console.log("loggedInUser:" + isAuthenticated);
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
          onClick={handleClick}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon  />
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >

                {motoristPage && (
                  SideMenu.map((menuitem, index) => {
                    return (
                        <div key={index}>
                          <MenuItem onClick={handleClose}>
                            <li key={index}>
                              <Link to={menuitem.path}>
                                {menuitem.icon}
                                {menuitem.title}
                              </Link>
                            </li>
                          </MenuItem>
                        </div>
                    );
                  }))
                }
              {attendantPage && (
                  AttendantSideMenu.map((menuitem, index) => {
                    return (
                        <div key={index}>
                          <MenuItem onClick={handleClose}>
                            <li key={index}>
                              <Link to={menuitem.path}>
                                {menuitem.icon}
                                {menuitem.title}
                              </Link>
                            </li>
                          </MenuItem>
                        </div>
                    );
                  }))
              }
              {adminPage && (
                  AdminSideMenu.map((menuitem, index) => {
                    return (
                        <div key={index}>
                          <MenuItem onClick={handleClose}>
                            <li key={index}>
                              <Link to={menuitem.path}>
                                {menuitem.icon}
                                {menuitem.title}
                              </Link>
                            </li>
                          </MenuItem>
                        </div>
                    );
                  }))
              }

              <Divider />
             <div><MenuItem onClick={handleClose}>Profile</MenuItem></div>
             <div><MenuItem onClick={handleClose}>My account</MenuItem></div>
             <div><MenuItem onClick={logout}>Logout</MenuItem></div>
            </Menu>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Parking App
          </Typography>
          <LoginDialog />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
