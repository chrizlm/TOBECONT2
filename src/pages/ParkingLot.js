import {
    Box,
    Button,
    Card,
    CardHeader,
    TableContainer,
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
import { makeStyles } from "@mui/styles";
import { UseForm, Form } from "../components/UseForm";
import Controls from "../components/controls/Controls";
import Avatar from '@mui/material/Avatar';
import React, { useState, useEffect  } from 'react';
import ParkingLotService from "../service/ParkingLotService";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

/*
import axios from "axios";
import { Link } from "react-router-dom";
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import SeverityPill from '../components/severity-pill';
import PerfectScrollbar from 'react-perfect-scrollbar';
 */

const useStyles = makeStyles({
    pageContent: {
        margin: "40px",
        padding: "24px",
    },

});



const initialFieldValues = {
    parkingLotId: 0,
    parkingRegNo: "",
    parkingLotLocation: "",
    parkingLotName: "",
    totalParkingSpaces: 0,
   // parkingLotDate: "",

};


export default function ParkingLot(props) {
    const [parkDetail, setParkDetail] = useState(initialFieldValues);
    const [parkLot, setParkLot] = React.useState([]);
    const [searchLocation, setSearchLocation] = React.useState("");
    const [currentParkingList, setCurrentParkingList] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [value, setValue] = React.useState(new Date());
  /*

    const baseURL = "http://localhost:8080/apiv1/parkingLot/get";
    const [selected, setSelected] = React.useState("");
    const [value, setValue] = React.useState(new Date());
    const [search, setSearch] = React.useState("");
    const [parkings, setParkings] = useState([]);
   */



    useEffect(() =>{
        retrieveAllParkingLots();
    }, []);

    const onChangeSearchLocation = e =>{
        const searchLocation = e.target.value;
        setSearchLocation(searchLocation);
    }
    
    const saveParkingLot = () =>{
        const data ={
            parkingRegNo: parkDetail.parkingRegNo,
            parkingLotLocation: parkDetail.parkingLotLocation,
            parkingLotName: parkDetail.parkingLotName,
            totalParkingSpaces: parkDetail.totalParkingSpaces,
            //parkingLotDate: parkDetail.parkingLotDate,
        };
        ParkingLotService.create(data).then(response => {
            console.log(response)
        })
            .catch(error => {
                console.log(error)
            })
    }


   

    const retrieveAllParkingLots = () =>{

        ParkingLotService.getAll().then(response => {
            setParkLot(response.data);
            console.log(response);
        }).catch(error => {
            console.log(error)
        })
    }

    const refreshList = () =>{
        retrieveAllParkingLots();
        setCurrentParkingList(null);
        setCurrentIndex(-1);
    }

    const setActiveParkingList = (parking, index) => {
        setCurrentParkingList(parking);
        setCurrentIndex(index);
    };

    const findParkingLotByLocation = () =>{

        ParkingLotService.findByLocation(searchLocation).then(response => {
            setParkLot(response.data);
            console.log(response);
            console.log(setParkLot);
        })
            .catch(error => {
                console.log(error)
            })
    }


    const removeParkingLot = () =>{
        ParkingLotService.removeAll().then(response => {
            console.log(response.data);
            refreshList();
        })
            .catch(e => {
                console.log(e);
            });
    }


    const handleInputChange = e =>{

        const {name, value} = e.target
        setParkDetail({
            ...parkDetail,
            [name]: value,
        })

    }






    const classes = useStyles();

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
                    <Form onSubmit={saveParkingLot}>
                        <Grid container>
                            <Grid item xs={6}>
                                <Controls.Input
                                    variant="outlined"
                                    label="Parking LotReg"
                                    name="parkingRegNo"
                                    value={parkDetail.parkingRegNo}
                                    onChange={handleInputChange}
                                />

                                <Controls.Input
                                    variant="outlined"
                                    label="Parking Location"
                                    name="parkingLotLocation"
                                    value={parkDetail.parkingLotLocation}
                                    onChange={handleInputChange}
                                />

                                <Controls.Input
                                    variant="outlined"
                                    label="Parking Lot name"
                                    name="parkingLotName"
                                    value={parkDetail.parkingLotName}
                                    onChange={handleInputChange}
                                />

                                <Controls.Input
                                    variant="outlined"
                                    label="Parking Lot spaces"
                                    name="totalParkingSpaces"
                                    value={parkDetail.totalParkingSpaces}
                                    onChange={handleInputChange}
                                />



                            </Grid>

                            <Button variant="contained"
                                    fullWidth
                                    onClick={saveParkingLot}
                            >Submit</Button>

                        </Grid>

                    </Form>
                </Paper>
            </Box>
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
                    <div>
                    <Controls.Input
                        variant="outlined"
                        label="Search Parking Lot"
                        value={searchLocation}
                        onChange={onChangeSearchLocation}
                    />
                        <Button variant="contained"
                                onClick={findParkingLotByLocation}>Search</Button>
                    </div>
                    <div align="right">
                    <Button variant="contained"
                            onClick={retrieveAllParkingLots}>GetAll</Button>
                    </div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Reg no.</TableCell>
                                    <TableCell align="right">location</TableCell>
                                    <TableCell align="right">Name</TableCell>
                                    <TableCell align="right">Total Space</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {parkLot.map((row, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell>{row.parkingRegNo}</TableCell>
                                        <TableCell align="right">{row.parkingLotLocation}</TableCell>
                                        <TableCell align="right">{row.parkingLotName}</TableCell>
                                        <TableCell align="right">{row.totalParkingSpaces}</TableCell>
                                    </TableRow>
                                ))
                                }

                            </TableBody>
                        </Table>
                    </TableContainer>


                </Paper>
            </Box>
        </>
    )
}



/*
<LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Basic example"
                                        value={value}
                                        onChange={(date) => {
                                            setValue(date);

                                            setParkDetail({
                                                ...parkDetail,
                                                parkingLotDate : date,
                                            })
                                        }}
                                        renderInput={(params) => <TextField {...params}
                                                                            name="parkingDate" value={parkDetail.parkingLotDate}
                                        />}
                                    />
                                </LocalizationProvider>
 */