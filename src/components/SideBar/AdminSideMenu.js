import React from "react"
import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";
import { } from "react-icons/io";


export const AdminSideMenu = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        className: 'nav-text'
    },
    {
        title: 'Bookings',
        path: '/booking',
        icon: <AiIcons.AiFillCar />,
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
        title: 'AttendantRegistration',
        path: '/attendantRegistration',
        icon: <AiIcons.AiOutlineBook />,
        className: 'nav-text'
    },
    {
        title: 'Registration',
        path: '/registration',
        icon: <AiIcons.AiOutlineBook />,
        className: 'nav-text'
    },
    {
        title: 'ParkingLot',
        path: '/parkingLot',
        icon: <AiIcons.AiOutlineBook />,
        className: 'nav-text'
    },
    {
        title: 'ParkingLotDetails',
        path: '/parkingLotsDetails',
        icon: <AiIcons.AiOutlineBook />,
        className: 'nav-text'
    },
    {
        title: 'AttendantsList',
        path: '/attendantsList',
        icon: <AiIcons.AiOutlineBook />,
        className: 'nav-text'
    },
    {
        title: 'BookingDetails',
        path: '/bookingDetails',
        icon: <AiIcons.AiOutlineBook />,
        className: 'nav-text'
    }
]
