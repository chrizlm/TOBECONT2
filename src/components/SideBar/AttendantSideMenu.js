import React from "react"
import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";
import { } from "react-icons/io";


export const AttendantSideMenu = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        className: 'nav-text'
    },
    {
        title: 'ParkingLot',
        path: '/parkingLot',
        icon: <AiIcons.AiOutlineBook />,
        className: 'nav-text'
    },
    {
        title: 'About',
        path: '/about',
        icon: <AiIcons.AiFillProfile />,
        className: 'nav-text'
    },
    {
        title: 'Support',
        path: '/support',
        icon: <MdIcons.MdHelp />,
        className: 'nav-text'
    },
    {
        title: 'ParkingLotDetails',
        path: '/parkingLotsDetails',
        icon: <AiIcons.AiOutlineBook />,
        className: 'nav-text'
    },
    {
        title: 'BookingDetails',
        path: '/bookingDetails',
        icon: <AiIcons.AiOutlineBook />,
        className: 'nav-text'
    }


    //booking details
    //parkinglot details
]
