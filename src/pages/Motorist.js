import React, { useState, useEffect } from "react";
import {
  InputAdornment,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import MotoristForm from "./MotoristForm";
import UseTable from "../components/UseTable";
import axios from "axios";
import * as MotoristService from "../service/MotoristService";
import { Search } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import Popups from "../components/Popups";
import CloseIcon from "@mui/icons-material/Close";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Controls from "../components/controls/Controls";
import PageHeader from "../components/PageHeader";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import Notification from "../components/Notification";
import ConfirmDialog from "../components/ConfirmDialog";

const useStyles = makeStyles({
  pageContent: {
    margin: "40px",
    padding: "24px",
  },
  searchInput: {
    width: "75%",
  },
  newButton: {
    position: "absolute",
    right: "10px",
  },
});

const headcells = [
  { id: "motoristFirstName", label: "First Name" },
  { id: "motoristLastName", label: "Last Name" },
  { id: "motoristEmail", label: "Email", disableSorting: true },
  { id: "motoristMobile", label: "Mobile", disableSorting: true },
];

export default function Motorist() {
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const classes = useStyles();
  //const [records, setRecords] = useState(MotoristService.getAll());
  const [repo, setRepo] = useState([]);
  const getRepo = () => {
    axios
      .get("http://localhost:8080/api/motorist/all")
      .then((response) => {
        console.log(response);
        /* const myRepo = response.data;
        setRepo(myRepo); */
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => getRepo(), []);

  const {
    TablContainer,
    TablHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = UseTable(repo, headcells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.fullName.toLowerCase().includes(target.value)
          );
      },
    });
  };

  const addOrEdit = (motorist, resetForm) => {
    if (motorist.id == 0) MotoristService.create(motorist);
    else MotoristService.update(motorist);
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    setRepo(getRepo());
    setNotify({
      isOpen: true,
      message: "Submitted Successfully",
      type: "success",
    });
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    MotoristService.deleteMotorist(id);
    setRepo(getRepo());
    setNotify({
      isOpen: true,
      message: "Deleted Successfully",
      type: "error",
    });
  };

  return (
    <>
      <PageHeader
        title="Motorist"
        subTitle="Design with validation"
        icon={<PeopleOutlineIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Input
            label="Search Motorist"
            className={classes.searchInput}
            InputProps={{
              startAdonment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
        </Toolbar>

        <Controls.MuiButton
          text="Add New"
          variant="outlined"
          startIcon={<AddIcon />}
          className={classes.newButton}
          onClick={() => {
            setOpenPopup(true);
            setRecordForEdit(null);
          }}
        />

        <TablContainer>
          <TablHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow key={item.motoristId}>
                <TableCell>{item.motoristFirstName}</TableCell>
                <TableCell>{item.motoristLastName}</TableCell>
                <TableCell>{item.motoristEmail}</TableCell>
                <TableCell>{item.motoristMobile}</TableCell>
                <TableCell>
                  <Controls.ActionButton
                    color="primary"
                    onClick={() => {
                      openInPopup(item);
                    }}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </Controls.ActionButton>
                  <Controls.ActionButton
                    color="secondary"
                    onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title: "Are you sure to delete record?",
                        subTitle: "You cant undo",
                        onConfirm: () => {
                          onDelete(item.id);
                        },
                      });
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </Controls.ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TablContainer>
      </Paper>
      <Popups
        title="Motorist Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <MotoristForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popups>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={ConfirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}

/* export default function Motorist(){

    const classes = useStyles();
    const [records, setRecords] = useState(MotoristService.getAll());

    const {TablContainer} = UseTable();

    return(
        <>
        <Paper className={classes.pageContent}>
            <MotoristForm />
            <TablContainer>
                <TableBody>
                
{records.map(item =>(
                        <TableRow key={item.motoristId}>
                            <TableCell>{item.motoristFirstName}</TableCell>
                            <TableCell>{item.motoristLastName}</TableCell>
                            <TableCell>{item.motoristEmail}</TableCell>
                            <TableCell>{item.motoristMobile}</TableCell>
                        </TableRow>
                    ))}

                </TableBody>
            </TablContainer>
        </Paper>
        </>
    )
} */

/* 
{records.map(item =>(
                        <TableRow key={item.motoristId}>
                            <TableCell>{item.motoristFirstName}</TableCell>
                            <TableCell>{item.motoristLastName}</TableCell>
                            <TableCell>{item.motoristEmail}</TableCell>
                            <TableCell>{item.motoristMobile}</TableCell>
                        </TableRow>
                    ))}
*/
