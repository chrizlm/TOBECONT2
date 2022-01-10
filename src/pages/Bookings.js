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
import moment from "moment";
import ParkingLotsWithDatesService from "../service/ParkingLotsWithDatesService";

const useStyles = makeStyles({
  pageContent: {
    margin: "40px",
    padding: "24px",
  },
 
});


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

  const initialSearchDetailsValues = {
      location: "",
      parkingLotName: "",
      parkingDate: "",
  }



export default function Bookings(props) {
  const [parkDetail, setParkDetail] = useState(initialFieldValues);
  const [searchParkDetails, setSearchParkDetails] = useState(initialSearchDetailsValues);
  const [selected, setSelected] = React.useState("");
  const [value, setValue] = React.useState(new Date());
  const [parkLot, setParkLot] = React.useState([]);
  const [searchLocation, setSearchLocation] = React.useState("");
  const [locationData, setLocationData] = useState([]);
  const [parkingLotData, setParkingLotData] = useState([]);
  const [searchParkingLot, setSearchParkingLot] = useState("");
  const [freeSpace, setFreeSpace] = useState(0);


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




  const getPkLotList = ({item}) => {

      if(item === searchParkingLot) {
        DataService.getParkingData(item).then(response => {
          setParkingLotData(response.data);
          console.log(response);
        }).catch(error => {
          console.log(error)
        })

      }

  };






  useEffect(() =>{
    retrieveAllParkingLots();
  }, []);

  const retrieveAllParkingLots = () =>{
      const currentDate = Date.now();
      const submittedDate = moment(currentDate).format('YYYY-MM-DD')

      ParkingLotsWithDatesService.getByDateOnly(submittedDate).then(response => {
      setParkLot(response.data);
      console.log(response);
    }).catch(error => {
      console.log(error)
    })
  }

  const handleInputChange = e =>{

    const {name, value} = e.target
    setParkDetail({
      ...parkDetail,
      [name]: value,
    })


  }

   const handleOptionOne = e =>{
     const {name, value} = e.target
     setSelected(value)
     setParkDetail({
       ...parkDetail,
       [name]: value,
     })


     const searchParkingLot = e.target.value;
     setSearchParkingLot(searchParkingLot);

   }

    const handleOptionOneSearch = e =>{
        const {name, value} = e.target
        setSelected(value)
        setSearchParkDetails({
            ...searchParkDetails,
            [name]: value,
        })


        const searchParkingLot = e.target.value;
        setSearchParkingLot(searchParkingLot);

    }
  const handleOptionTwo = e =>{
    const {name, value} = e.target
    setParkDetail({
      ...parkDetail,
      [name]: value,
    })
  }

    const handleOptionTwoSearch = e =>{
        const {name, value} = e.target
        setSearchParkDetails({
            ...searchParkDetails,
            [name]: value,
        })
    }

const handleDateChange = (date) =>{
    setParkDetail({
      parkingDate: date,
    })
  }





  const saveParkingDetail = () =>{
    const submittedDate = moment(parkDetail.parkingDate).format('YYYY-MM-DD')
    const submittedTime = moment(parkDetail.parkTime).format('HH:mm')
    const data ={
      numberPlate: parkDetail.numberPlate,
      vehicleType: parkDetail.vehicleType,
      location: parkDetail.location,
      parkingLotName: parkDetail.parkingLotName,
      parkingDate: submittedDate,
      parkTime: submittedTime,
      parkDuration: parkDetail.parkDuration,

    };
    ParkingDetailService.checkBookingSpace(data).then(response =>{
      console.log(response)
      setFreeSpace(response.data);

      if(response.data >= 0){
        ParkingDetailService.create(data).then(response => {
          console.log(response)
        })
            .catch(error => {
              console.log(error)
            })
      }else{
        alert("error submitting data");
      }
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
    })
        .catch(error => {
          console.log(error)
        })
  }

    const findParkingLotByLocationAndDate = () =>{
        const submittedDate = moment(searchParkDetails.parkingDate).format('YYYY-MM-DD')
        const data ={

            location: searchParkDetails.location,
            parkingLotName: searchParkDetails.parkingLotName,
            parkingDate: submittedDate,

        };

        ParkingLotsWithDatesService.getParkingDataSearch(data).then(response => {
            setParkLot(response.data);
            console.log(response);
            console.log(setParkLot);
        })
            .catch(error => {
                console.log(error)
            })
    }



/*
  const handleAvailableSpaces = (parkingLotName) =>{
    DataService.getFreeSpace(parkingLotName).then(response =>{
      console.log(response);
      setFreeSpace(response.data)


    }).catch(error =>{
      console.log(error)
    })
  }
  */








  const classes = useStyles();
 // const { values, setValues, resetForm, handleInputChange, errors, setErrors } = UseForm(initialFieldValues, false);

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
      <Form onSubmit={saveParkingDetail}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            variant="outlined"
            label="Number Plate"
            name="numberPlate"
            value={parkDetail.numberPlate}
            onChange={handleInputChange}
          />



          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">CarType</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select-label"
                name="vehicleType"
                value={parkDetail.vehicleType}
                label="Vehicle Type"
                onChange={handleInputChange}
            >
              <MenuItem value='Saloon'>Saloon</MenuItem>
              <MenuItem value='Lorry'>Lorry</MenuItem>
              <MenuItem value='Trailer'>Trailer</MenuItem>
            </Select>
          </FormControl>





          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                label="Basic example"
                value={value}

                onChange={(date) => {
                  setValue(date);

                  setParkDetail({
                    ...parkDetail,
                    parkingDate : date,
                  })
                }}
                renderInput={(params) => <TextField {...params}
                name="parkingDate" value={parkDetail.parkingDate}
                />}
            />
          </LocalizationProvider>



          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
                placeholder="Booking Time"
                value={value}
                onChange={(date) => {
                  setValue(date);

                  setParkDetail({
                    ...parkDetail,
                    parkTime : date,
                  })
                }}
                renderInput={(params) => <TextField {...params}
                    name="parkTime" value={parkDetail.parkTime}/>}
            />
          </LocalizationProvider>






        </Grid>
        <Grid item xs={6}>




          <FormControl fullWidth>
            <InputLabel id="dependant-dropdown">location</InputLabel>
            <Select
                labelId="dependant-dropdown"
                id="dependant-dropdown"
                name="location"
                value={parkDetail.location}
                label="Location"
                onChange={handleOptionOne}
            >{locationData.map((item ,index) =>
              <MenuItem value={item} key={index}
                        onClick={getPkLotList({item})}>{item}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="dropdown">Park Lot</InputLabel>
            <Select
                labelId="dropdown"
                id="dropdown"
                name="parkingLotName"
                value={parkDetail.parkingLotName}
                label="Park Lot"
                onChange={handleOptionTwo}>{
                  parkingLotData.map((item, index) =>
                  <MenuItem value={item} key={index} >{item}</MenuItem> )
            }</Select>
          </FormControl>


          <Controls.Input
              variant="outlined"
              label="Park Duration"
              name="parkDuration"
              value={parkDetail.parkDuration}
              onChange={handleInputChange}
          />
          </Grid>
        </Grid>
        <Button variant="contained"
        fullWidth
                onClick={saveParkingDetail}
        >Submit</Button>
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

        <Form>


            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Basic example"
                    value={value}

                    onChange={(date) => {
                        setValue(date);

                        setSearchParkDetails({
                            ...parkDetail,
                            parkingDate : date,
                        })
                    }}
                    renderInput={(params) => <TextField {...params}
                                                        name="parkingDate" value={searchParkDetails.parkingDate}
                    />}
                />
            </LocalizationProvider>

            <FormControl fullWidth>
                <InputLabel id="dependant-dropdown">location</InputLabel>
                <Select
                    labelId="dependant-dropdown"
                    id="dependant-dropdown"
                    name="location"
                    value={searchParkDetails.location}
                    label="Location"
                    onChange={handleOptionOneSearch}
                >{locationData.map((item ,index) =>
                    <MenuItem value={item} key={index}
                              onClick={getPkLotList({item})}>{item}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="dropdown">Park Lot</InputLabel>
                <Select
                    labelId="dropdown"
                    id="dropdown"
                    name="parkingLotName"
                    value={searchParkDetails.parkingLotName}
                    label="Park Lot"
                    onChange={handleOptionTwoSearch}>{
                    parkingLotData.map((item, index) =>
                        <MenuItem value={item} key={index} >{item}</MenuItem> )
                }</Select>
            </FormControl>

          <FormControl fullWidth>

            <Button variant="contained"
                    fullWidth
                    onClick={findParkingLotByLocationAndDate}
            >Search</Button>
          </FormControl>



          <div align="right">
            <Button variant="contained"
                    onClick={retrieveAllParkingLots}>Today</Button>
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
                      parkingLotName
                    </TableCell>
                    <TableCell>
                      totalParkingSpaces
                    </TableCell>
                    <TableCell>
                      AvailableSpaces
                    </TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    parkLot.map((park) =>(

                        <TableRow
                            hover
                            key={park.parkingLotId}
                        >

                          <TableCell>
                            {park.parkingLotName}
                          </TableCell>
                          <TableCell>
                            {park.totalCapacity}
                          </TableCell>
                          <TableCell>
                            {park.availableSpace}
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



/*
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
                AvailableSpaces
              </TableCell>
              <TableCell>
                Book
              </TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {
              parkLot.map((park) =>(

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
                    {park.availableSpace}
                  </TableCell>

                  <TableCell>

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
 */