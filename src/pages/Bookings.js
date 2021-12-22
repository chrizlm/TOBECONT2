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



export default function Bookings(props) {
  const [parkDetail, setParkDetail] = useState(initialFieldValues);
  const [selected, setSelected] = React.useState("");
  const [value, setValue] = React.useState(new Date());
  const [parkLot, setParkLot] = React.useState([]);
  const [searchLocation, setSearchLocation] = React.useState("");
  const [locationData, setLocationData] = useState([]);
  const [parkingLotData, setParkingLotData] = useState([]);
  const [searchParkingLot, setSearchParkingLot] = useState("");


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

    ParkingLotService.getAll().then(response => {
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
  const handleOptionTwo = e =>{
    const {name, value} = e.target
    setParkDetail({
      ...parkDetail,
      [name]: value,
    })
  }

const handleDateChange = (date) =>{
    setParkDetail({
      parkingDate: date,
    })
  }





  const saveParkingDetail = () =>{
    var data ={
      numberPlate: parkDetail.numberPlate,
      vehicleType: parkDetail.vehicleType,
      location: parkDetail.location,
      parkingLotName: parkDetail.parkingLotName,
      parkingDate: parkDetail.parkingDate,
      parkTime: parkDetail.parkTime,
      parkDuration: parkDetail.parkDuration,

    };
    ParkingDetailService.create(data).then(response => {
      console.log(response)
    })
        .catch(error => {
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
    })
        .catch(error => {
          console.log(error)
        })
  }










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




/*
  const algorithm = [
    "Searching Algorithm",
    "Sorting Algorithm",
    "Graph Algorithm",
  ];
  const MOMBASAROAD = ["C++", "Java", "COOLMBS", "C#"];
  const KAREN = ["Arrays", "LinkedList", "Stack", "Queue", "KAREN CAR PARK"];


  let type = null;


  let options = null;





  if (selected === "Algorithm") {
    type = algorithm;
  } else if (selected === "MOMBASAROAD") {
    type = MOMBASAROAD;
  } else if (selected === "KAREN") {
    type = KAREN;
  }


  if (type) {
    options = type.map((el) => (<MenuItem key={el} value={el}>{el}</MenuItem>));
  }

 */


/*
 useEffect(() => {
   async function getData() {

     await axios
         .get(`http://localhost:8080/apiv1/parkingLot/get`, {
           params: "KA001"
         })
         .then((response) => {
           console.log(response.data);
           return setData(response.data);

         });
   }
 });

 */



/*
<!--
          <Autocomplete
              onChange={(_, locationData) => getPkLotList()}
              options={locationData}
              renderInput={(params) => (
                  <TextField {...params} label="Location" variant="outlined" />
              )}
          />

          <Autocomplete
              onChange={handleInputChange}
              key={parkingLotData}
              options={parkingLotData}
              renderInput={(params) => (
                  <TextField {...params} label="Parking Lots" variant="outlined" />
              )}
          />

            -->
 */

/*
<!--
          <FormControl fullWidth>
          <InputLabel id="dependant-dropdown">location</InputLabel>
          <Select
              labelId="dependant-dropdown"
              id="dependant-dropdown"
              name="location"
              value={parkDetail.location}
              label="Location"
              onChange={handleOptionOne}
          >
            <MenuItem value='Choose...'>Choose...</MenuItem>
            <MenuItem value='Algorithm'>Algorithm</MenuItem>
            <MenuItem value='MOMBASAROAD'>MOMBASAROAD</MenuItem>
            <MenuItem value='KAREN'>KAREN</MenuItem>
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
              onChange={handleOptionTwo}>{options}</Select>
        </FormControl>

        -->
 */