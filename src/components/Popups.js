import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Typography } from '@mui/material';
import React from 'react'
import Controls from '../components/controls/Controls';
import CloseIcon from '@mui/icons-material/Close'

const useStyles = makeStyles({
    dialogWrapper:{
        padding : '16px',
        position : 'absolute',
        top : '40px'
    },
    dialogTitle:{
        paddingRight:'0px'
    }
})

export default function Popups(props){

    const classes = useStyles();
    
    const {title, children, openPopup, setOpenPopup} = props;
    return(
        <Dialog open={openPopup} maxWidth="md" classes={{paper : classes.dialogWrapper}}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{display:'flex'}}>
                    <Typography variant="h6" component="div" style={{flexGrow:1}}>
                        {title}
                    </Typography>
                    <Controls.ActionButton 
                    color="secondary"
                    onClick={()=>{setOpenPopup(false)}}>
                        <CloseIcon />
                    </Controls.ActionButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}