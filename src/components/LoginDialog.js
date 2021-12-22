import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from '@mui/styles';
import SignIn from './SignIn';
import { Link } from 'react-router-dom';

const useStyle = makeStyles({
    btn : {
        color : '#fff'
    },
    formlogin : {
      textAlign : 'center',
    }
})

export default function LoginDialog() {
    const classes = useStyle();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };




  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} className={classes.btn}>
        Login
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"LOGIN FORM"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" className={classes.formlogin}>
            please fill in details
            <SignIn />
            if you dont have an account <Link to='/MotoristForm' onClick={handleClose}> <div style={{color:'blue'}}>register</div> </Link>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
