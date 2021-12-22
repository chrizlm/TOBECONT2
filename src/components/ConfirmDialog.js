import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { IconButton } from '@mui/material';
import React from 'react'
import Controls from './controls/Controls';
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation'
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    dialog:{
        padding: '16px',
        position: 'absolute',
        top: '40px'
    },
    dialogTitle:{
        textAlign: 'center'
    },
    dialogContent:{
        textAlign: 'center'
    },
    dialogAction:{
        justifyContent: 'center'
    },
    titleIcon:{
        backgroundColor:  'crimson',
        color: 'blue',
        '&:hover':{
            backgroundColor: 'cyan',
            cursor: 'default'
        },
        '& .MuiSvgIcon-root':{
            fontSize: '8rem',
        }
    }
})

export default function ConfirmDialog(props){
    const { color, confirmDialog, setConfirmDialog } = props;
    const classes = useStyles();

    return(
        <Dialog open={confirmDialog.isOpen} classes={{paper: classes.dialog}}>
            <DialogTitle className={classes.dialogTitle}>
                <IconButton disableFocusRipple className={classes.titleIcon}>
                    <NotListedLocationIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <Typography variant="h6">
                    {confirmDialog.title}
                </Typography>
                <Typography variant="subtitle2">
                    {confirmDialog.subTitle}
                </Typography>
            </DialogContent>
            <DialogActions className={classes.dialogAction}>
                <Controls.MuiButton
                text="No"
                color="default"
                onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false})} />
                <Controls.MuiButton
                text="Yes"
                color="secondary"
                onClick={confirmDialog.onConfirm} />
            </DialogActions>
        </Dialog>
    )
}