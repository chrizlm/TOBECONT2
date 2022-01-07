//LIST OF ALL ATTENDANTS
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
import AdminServices from "../service/AdminServices";

const useStyles = makeStyles({
    pageContent: {
        margin: "40px",
        padding: "24px",
    },

});

export default function AttendantPage(props) {
    const [attendants, setAttendants] = React.useState([]);
    const [searchLocation, setSearchLocation] = React.useState("");
    const [regNumber, setRegNumber]= React.useState("");
    const [currentAttendantsList, setCurrentAttendantsList] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);

    useEffect(() =>{
        retrieveAllAttendants();
    }, []);

    const onChangeSearchRegistrationNumber = e =>{
        const regNumber = e.target.value;
        setRegNumber(regNumber);
    }

    const retrieveAllAttendants = () =>{
        AdminServices.getAllAttendants().then(response => {
            setAttendants(response.data);
            console.log(response);
        }).catch(error => {
            console.log(error);
        })
    }

    const refreshList = () =>{
        retrieveAllAttendants();
        setCurrentAttendantsList(null);
        setCurrentIndex(-1);
    }

    const onChangeSearchLocation = e =>{
        const searchLocation = e.target.value;
        setSearchLocation(searchLocation);
    }

    const findAttendantByID = () =>{
        AdminServices.getAttendant(regNumber).then(response =>{
            setAttendants(response.data);
            console.log(response);
        }).catch(error => {
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
                <Paper elevation={3} className={classes.pageContent}>
                    <div>
                        <Controls.Input
                            variant="outlined"
                            label="Search Attendant (Reg Num)"
                            value={regNumber}
                            onChange={onChangeSearchRegistrationNumber}
                        />
                        <Button variant="contained"
                                onClick={findAttendantByID}>Search</Button>
                    </div>
                    <div align="right">
                        <Button variant="contained"
                                onClick={retrieveAllAttendants}>GetAll</Button>
                    </div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>

                                    <TableCell align="right">firstName</TableCell>
                                    <TableCell align="right">lastName</TableCell>
                                    <TableCell align="right">email</TableCell>
                                    <TableCell align="right">gender</TableCell>
                                    <TableCell align="right">areaAssigned</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {attendants.map((row, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell>{row.firstName}</TableCell>
                                        <TableCell align="right">{row.lastName}</TableCell>
                                        <TableCell align="right">{row.email}</TableCell>
                                        <TableCell align="right">{row.gender}</TableCell>
                                        <TableCell align="right">{row.areaAssigned}</TableCell>
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