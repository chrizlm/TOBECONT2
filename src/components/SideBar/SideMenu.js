import React from "react"
import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";
import { } from "react-icons/io";


export const SideMenu = [
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
        title: 'ParkingTable',
        path: '/pTable',
        icon: <AiIcons.AiOutlineBook />,
        className: 'nav-text'
    },
    {
        title: 'Motorist',
        path: '/Motorist',
        icon: <AiIcons.AiOutlineBook />,
        className: 'nav-text'
    }
]
