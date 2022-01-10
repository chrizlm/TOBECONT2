import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Box,
    Button,
    Card,
    CardHeader,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    Tooltip,
    Paper,
    Grid,

} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import SeverityPill from '../components/severity-pill';
import { makeStyles } from "@mui/styles";
import { UseForm, Form } from "../components/UseForm";
import Controls from "../components/controls/Controls";
import Avatar from '@mui/material/Avatar';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import React, {useState} from 'react';
import axios from "axios";
import AppUserService from "../service/AppUserService";
import MotoristService from "../service/MotoristService";
import TextField from "@mui/material/TextField";
import AdminServices from "../service/AdminServices";


const useStyles = makeStyles({
    pageContent: {
        margin: "40px",
        padding: "24px",
    },

});

const genderItems = [
    { id: "male", title: "Male" },
    { id: "female", title: "Female" },
    { id: "others", title: "Others" },
];



const initialFieldValues = {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    password: "",
    areaAssigned: ""

};



export default function AttendantRegistration(){
    const [attendantDetail, setAttendantDetail] =useState(initialFieldValues);

    const handleInputChange = e =>{

        const {name, value} = e.target
        setAttendantDetail({
            ...attendantDetail,
            [name]: value,
        })
    }


    const handleSubmit = (event) =>{
        event.preventDefault();
        const data = {
            //id: motoristDetail.id,
            firstName: attendantDetail.firstName,
            lastName: attendantDetail.lastName,
            email: attendantDetail.email,
            gender: attendantDetail.gender,
            password: attendantDetail.password,
            areaAssigned: attendantDetail.areaAssigned,
        }

        AdminServices.registerAttendant(data).then(response =>{
            console.log(response);
        }).catch(error =>{
            console.log(error)
        });
    };

    const classes = useStyles();

    return(
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        m: 1,
                        width: '100%',
                        height: '100%',
                    },
                }}
            >
                <Paper elevation={3} className={classes.pageContent}>
                    <Avatar /> {/*name*/}
                    <Form onSubmit={handleSubmit}>
                        <Grid container>
                            <Grid item xs={6}>
                                <Controls.Input
                                    variant="outlined"
                                    label="First Name"
                                    name="firstName"
                                    value={attendantDetail.firstName}
                                    onChange={handleInputChange}
                                />
                                <Controls.Input
                                    variant="outlined"
                                    label="Last Name"
                                    name="lastName"
                                    value={attendantDetail.lastName}
                                    onChange={handleInputChange}
                                />
                                <Controls.Input
                                    variant="outlined"
                                    label="Email"
                                    name="email"
                                    value={attendantDetail.email}
                                    onChange={handleInputChange}
                                />

                            </Grid>
                            <Grid item xs={6}>
                                <Controls.RadioGroup
                                    variant="outlined"
                                    name="gender"
                                    label="Gender"
                                    color="primary"
                                    value={attendantDetail.gender}
                                    genderItems={genderItems}
                                    onChange={handleInputChange}
                                />

                                <Controls.Input
                                    variant="outlined"
                                    label="Area Assigned"
                                    name="areaAssigned"
                                    value={attendantDetail.areaAssigned}
                                    onChange={handleInputChange}
                                />

                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    value={attendantDetail.password}
                                    onChange={handleInputChange}
                                    autoComplete="current-password"
                                />

                            </Grid>
                        </Grid>
                        <Button variant="contained"
                                fullWidth
                                onClick={handleSubmit}
                        >Submit</Button>
                    </Form>
                </Paper>
            </Box>
        </>
    )
}