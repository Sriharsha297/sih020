import React from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles, Button, List, ListItem, ListItemIcon, ListItemText, withWidth, Typography } from '@material-ui/core';
import { CssBaseline, AppBar, Toolbar, Hidden, Drawer, IconButton } from '@material-ui/core';
import compose from 'recompose/compose';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import HelpIcon from '@material-ui/icons/HelpOutlineOutlined';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import VisibilityIcon from '@material-ui/icons/VisibilityOutlined';
import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';
import MailIcon from '@material-ui/icons/Mail';
// import UserMenu from './UserMenu';

const DRAWER_WIDTH = 240;

const styles = theme => ({
    root: {
        marginBottom: 2*theme.spacing.unit,
    },

    appBar: {
		background: '#08002A',
        'box-shadow': 'none',
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

class Navbar extends React.Component {

    state = {
        mobileOpen: false,
    };


    navRoutes = ['/', '/aboutUs', '/viewStatus', '/help', '/contactUs'];
    
    handleDrawerToggle = () => {
		this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };
    
    handleRedirection = (index, history) => {
        history.push(this.navRoutes[index]);
        this.setState({mobileOpen: false});
    }

    render() {
        const {classes, theme, history, loggedIn} = this.props;

        const icons = [<HomeIcon/>, <InfoIcon/>, <VisibilityIcon/>, <HelpIcon/>, <MailIcon/>];
        let hide = [ true, true, !loggedIn, true, true,loggedIn ];

        const drawer = (
            <div className={classes.toolbar} >
                <List>
                    {
                        ['Home', 'About us', 'View status', 'Help', 'Contact us','Logout'].map( (text, index) => (
                            hide[index] &&
                            <ListItem button onClick={ () => this.handleRedirection(index, history) } key={text}>
                                <ListItemIcon> { icons[index] } </ListItemIcon>
                                <ListItemText primary={text}/>
                            </ListItem>
                        ))
                    }
                </List>
            </div>
        );

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                        iugu
                        

                        {/* <UserMenu /> */}

                    </Toolbar>
                </AppBar>

                <nav className={classes.drawer}>
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    
                        <Drawer
                            container={this.props.container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={this.state.mobileOpen}
                            onClose={this.handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                        >
                            {drawer}
                        </Drawer>
                    
			    </nav>
            </div>
        )
    } 
}



export default compose(
    withWidth(),
    withStyles(styles, { withTheme: true }),
)((withRouter(Navbar)));