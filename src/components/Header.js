import { Badge, Grid, IconButton, Toolbar } from "@mui/material"
import React from "react"
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { AppBar } from '@mui/material';
import { InputBase } from "@mui/material";
import { makeStyles } from '@mui/styles';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import SearchIcon from '@mui/icons-material/Search';




const useStyles = makeStyles({
    searchInput: {
        opacity : '0.6',
        padding : '0px 8px',
        fontSize : '0.8rem',
        '&:hover':{
            backgroundColor: '#f5f5f7'
        },
        '& .MuiSvgIcon-root':{
            marginRight : '8px'
        }
    }
})


export default function Header(){

    const classes = useStyles();
    

    return(
        
        <AppBar position="static" style={{backgroundColor : 'white', transform : 'translateZ(0)'}}>
            <Toolbar>
                <Grid container>
                    <Grid item >
                        <InputBase 
                        placeholder="Search Topics"
                        className={classes.searchInput}
                        startAdornment={<SearchIcon fontSize="small" />} />
                    </Grid>
                    <Grid item sm></Grid>
                    <Grid item >
                        <IconButton>
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsActiveIcon fontSize="small"  />
                            </Badge>
                        </IconButton>
                        <IconButton>
                            <Badge badgeContent={3} color="primary">
                                <ChatBubbleIcon fontSize="small"  />
                            </Badge>
                        </IconButton>
                        <IconButton>
                            <PowerSettingsNewIcon fontSize="small" />
                        </IconButton>
                    </Grid> 

                </Grid>
            </Toolbar>
        </AppBar>
       
    )
}