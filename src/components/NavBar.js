import React from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles, Button, List, ListItem, ListItemIcon, ListItemText, withWidth, Typography, Menu, MenuItem } from '@material-ui/core';
import { CssBaseline, AppBar, Toolbar, Hidden, Drawer, IconButton } from '@material-ui/core';
import compose from 'recompose/compose';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import MailIcon from '@material-ui/icons/Mail';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Axios from 'axios';
// import UserMenu from './UserMenu';

const DRAWER_WIDTH = 240;

const styles = theme => ({
    root: {
        marginBottom: 2*theme.spacing.unit,
    },

    appBar: {
		background: '#08002A',
        'box-shadow': 'none',
        flexGrow: 1,
        position: 'sticky !important'
	},

    drawer: {
		[theme.breakpoints.up('sm')]: {
		width: DRAWER_WIDTH,
		flexShrink: 0,
		},
	},

    navLinks: {
        marginRight: 1*theme.spacing.unit,
        color: '#eaeaea',
    },

    navIcon: {
        marginLeft: theme.spacing.unit,
        marginRight: (1/2)*theme.spacing.unit,
        color: '#eaeaea'
    },

    drawerPaper: {
		'border-right': '0px',
		background: '#fff',
		width: DRAWER_WIDTH,
    },
    
	content: {
		flexGrow: 1,
		padding: theme.spacing.unit * 3,
		height: '100vh',
		position: 'fixed',
		overflow: 'scroll'
	},

    toolbar: theme.mixins.toolbar,
});

const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
}

class Navbar extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          submitted:false,
        };
    }
    handleLogout = () =>{
        console.log("hey");
    }

    render() {
        const {classes} = this.props;


        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                        >
                            <MenuIcon />
                        </IconButton>
                        NYKS HR
                        {
                            !!localStorage.getItem('token')   &&
                            <div style={{marginLeft: 'auto'}}>
                                <Button
                                    color="inherit"
                                    aria-haspopup="true"
                                    onClick = {this.handleLogout}
                                >
                                    <Typography color="inherit" variant="subtitle2" onClick = {() =>{
                                        const headers = {
                                            'Content-Type': 'application/json',
                                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                                        }
                                        Axios.post(`http://localhost:8080/hr/logout`,null,{headers:headers})
                                        .then(()=>{
                                            console.log("Successfully logged out!");
                                        })
                                        localStorage.clear();
                                        this.props.history.push('/')
                                         
                                    }}>
                                        LOGOUT
                                    </Typography>
                                </Button>
                            </div>
                        }

                    </Toolbar>
                </AppBar>
            </div>
        )
    } 
}



export default compose(
    withWidth(),
    withStyles(styles, { withTheme: true }),
)((withRouter(Navbar)));