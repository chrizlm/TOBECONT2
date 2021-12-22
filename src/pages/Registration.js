/*
import React from 'react'
import Controls from "../components/controls/Controls";
import { UseForm, Form } from "../components/UseForm";
import { Grid } from '@mui/material';

const initialFieldValues = {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    password: ""
   
  };


export default function Registration() {

    const handleSubmit = e =>{
        e.preventDefault()
      }
      const { values, setValues, resetForm, handleInputChange, errors, setErrors } = UseForm(initialFieldValues, true);

      
    return (
        <div>
            <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            variant="outlined"
            label="First Name"
            name="motoristFirstName"
            value={values.motoristFirstName}
            onChange={handleInputChange}
          />
          <Controls.Input
            variant="outlined"
            label="Last Name"
            name="motoristLastName"
            value={values.motoristLastName}
            onChange={handleInputChange}
          />
          <Controls.Input
            variant="outlined"
            label="Email"
            name="motoristEmail"
            value={values.motoristEmail}
            onChange={handleInputChange}
          />
          <Controls.Input
            variant="outlined"
            label="Mobile"
            name="motoristMobile"
            value={values.motoristMobile}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          
          <Controls.Input
            variant="outlined" 
            label="Password"
            name="motoristPassword"
            value={values.motoristPassword}
            onChange={handleInputChange}
          />

          <div>
            <Controls.MuiButton
            type="submit"
            text="Submit"
            />
            <Controls.MuiButton
            text="reset"
            color="default"
            onClick={resetForm}
            />
          </div>
        </Grid>
      </Grid>
    </Form>
        </div>
    )
}
*/


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
import React from 'react';
import axios from "axios";
import AppUserService from "../service/AppUserService";


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
    password: ""

};

export default function Registration(props) {
    const validate =(fieldValues = values) =>{
        let temp = {...errors}
        if('firstName' in fieldValues)
            temp.firstName = fieldValues.firstName?"":"This field is required."
        if('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ?"":"Invalid Email."
        setErrors({
            ...temp
        })

        if(fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }


    const handleSubmit = e =>{
        e.preventDefault()

        AppUserService.register(values)
           .then(response => {
             console.log(response)
           })
           .catch(error => {
             console.log(error)
           })

    }

    const classes = useStyles();
    const { values, setValues, resetForm, handleInputChange, errors, setErrors } = UseForm(initialFieldValues, true, validate);

    return (
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
                                    value={values.firstName}
                                    onChange={handleInputChange}
                                    error={errors.firstName}
                                />
                                <Controls.Input
                                    variant="outlined"
                                    label="Last Name"
                                    name="lastName"
                                    value={values.lastName}
                                    onChange={handleInputChange}
                                />
                                <Controls.Input
                                    variant="outlined"
                                    label="Email"
                                    name="email"
                                    value={values.email}
                                    error={errors.email}
                                    onChange={handleInputChange}
                                />

                            </Grid>
                            <Grid item xs={6}>
                                <Controls.RadioGroup
                                    variant="outlined"
                                    name="gender"
                                    label="Gender"
                                    color="primary"
                                    value={values.gender}
                                    genderItems={genderItems}
                                    onChange={handleInputChange}
                                />
                                <Controls.Input
                                    variant="outlined"
                                    label="Password"
                                    name="password"
                                    value={values.password}
                                    onChange={handleInputChange}
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



