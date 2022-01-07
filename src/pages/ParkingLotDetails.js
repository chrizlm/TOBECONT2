//contains all the list of parking lots


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
import { makeStyles } from "@mui/styles";
import { UseForm, Form } from "../components/UseForm";
import Controls from "../components/controls/Controls";
import Avatar from '@mui/material/Avatar';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import React, { useState, useEffect  } from 'react'
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import TextField from "@mui/material/TextField";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from '@mui/lab/DatePicker';
import TimePicker from "@mui/lab/TimePicker";
import ParkingLotService from "../service/ParkingLotService";
import ParkingDetailService from "../service/ParkingDetailService";
import DataService from "../service/DataService";

const useStyles = makeStyles({
    pageContent: {
        margin: "40px",
        padding: "24px",
    },

});

/*
const initialFieldValues = {
    id: 0,
    numberPlate: "",
    vehicleType: "",
    location: "",
    parkingLotName: "",
    parkingDate: "",
    parkTime: "",
    parkDuration: "",

};

 */

export default function ParkingLotDetails(props){
   // const [parkDetail, setParkDetail] = useState(initialFieldValues);
   // const [selected, setSelected] = React.useState("");
   // const [value, setValue] = React.useState(new Date());
    const [parkLot, setParkLot] = React.useState([]);
    const [searchLocation, setSearchLocation] = React.useState("");
    const [locationData, setLocationData] = useState([]);
    const [parkingLotData, setParkingLotData] = useState([]);
    const [searchParkingLot, setSearchParkingLot] = useState("");
    const [currentParkingList, setCurrentParkingList] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);

    useEffect(() =>{
        retrieveAllParkingLotsAreaData();
    }, []);

    const retrieveAllParkingLotsAreaData = () =>{
        DataService.getLocData().then(response => {
            setLocationData(response.data);
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



    useEffect(() =>{
        retrieveAllParkingLots();
    }, []);

    const retrieveAllParkingLots = () =>{
        ParkingLotService.getAll().then(response => {
            setParkLot(response.data);
            console.log(response);
        }).catch(error => {
            console.log(error)
        })
    }

    const onChangeSearchLocation = e =>{
        const searchLocation = e.target.value;
        setSearchLocation(searchLocation);
    }

    const findParkingLotByLocation = () =>{
        ParkingLotService.findByLocation(searchLocation).then(response => {
            setParkLot(response.data);
            console.log(response);
            console.log(setParkLot);
            refreshList();
        })
            .catch(error => {
                console.log(error)
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

                <Form>

                    <FormControl fullWidth>
                        <InputLabel id="parkings">Find parking lots</InputLabel>
                        <Select
                            labelId="parkings"
                            id="parkings"
                            name="location"
                            value={searchLocation}
                            label="Find parking lots"
                            onChange={onChangeSearchLocation}
                        >{locationData.map((item ,index) =>
                            <MenuItem value={item} key={index}>{item}</MenuItem>)}
                        </Select>
                        <Button variant="contained"
                                fullWidth
                                onClick={findParkingLotByLocation}
                        >Search</Button>
                    </FormControl>



                    <div align="right">
                        <Button variant="contained"
                                onClick={retrieveAllParkingLots}>GetAll</Button>
                    </div>

                </Form>

                <Card {...props}>
                    <CardHeader title="Parking lots" />
                    <PerfectScrollbar>
                        <Box sx={{ minWidth: 800 }}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            parkingLotId
                                        </TableCell>
                                        <TableCell>
                                            parkingLotName
                                        </TableCell>
                                        <TableCell>
                                            totalParkingSpaces
                                        </TableCell>
                                        <TableCell>
                                            Book
                                        </TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {parkLot.map((park) =>(
                                        <TableRow
                                            hover
                                            key={park.parkingLotId}
                                        >
                                            <TableCell>
                                                {park.parkingLotId}
                                            </TableCell>
                                            <TableCell>
                                                {park.parkingLotName}
                                            </TableCell>
                                            <TableCell>
                                                {park.totalParkingSpaces}
                                            </TableCell>
                                            <TableCell>
                                                <Button>Book</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </PerfectScrollbar>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            p: 2
                        }}
                    >
                        <Button
                            color="primary"
                            endIcon={<ArrowRightIcon fontSize="small" />}
                            size="small"
                            variant="text"
                        >
                            View all
                        </Button>
                    </Box>

                </Card>
            </Box>
            </>
    )
}