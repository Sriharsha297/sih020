/*global google*/

import React from 'react';
import { withStyles, Typography, Paper, Button, Divider , Grid} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {  Link } from 'react-router-dom';
import ShowMap from "./ShowMap"
import DeleteIcon from '@material-ui/icons/Delete';
import Axios from 'axios';
import swal from 'sweetalert';

const googleMapURL = `https://maps.googleapis.com/maps/api/js?libraries=geometry,drawing&key=AIzaSyBTHrx8pxJEFfVSVHjFVM7e2YS8ZbNqECU`;

const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  }


const styles = theme => ({
    root: {
        marginLeft:theme.spacing.unit*2,
        marginRight:theme.spacing.unit*2,
        flexGrow: 1,

    },
    paper:{
        
        marginTop: theme.spacing.unit *2 ,
        minHeight:'180px',
        textAlign:'center',
        padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },

   
    btn: {
        
        marginTop: theme.spacing.unit*2,
        marginBottom: theme.spacing.unit*2,
    }

})

class HomePage extends React.Component
{
    constructor(props) {
        super(props);
    
        this.state = {
            paths: "",
            branchName:'',
        };
      }
    
    componentDidMount() {
        this.watchLocation();
        const branchName = localStorage.getItem('branch');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        this.setState({branchName});
        console.log("Hello");

        Axios.get(`http://localhost:8080/hr/getFence?branchName=${branchName}`,{headers:headers})
        .then((res)=>{
            console.log(res.data);
            this.setState({paths:res.data.ok[0].fence})       
        }).catch((err) =>{
        console.log("Err Msg : "+ err)
        })
        
    }
    watchLocation() {
        if ('geolocation' in navigator) {
          const geoOptions = {
            enableHighAccuracy: true,
            maximumAge : 30000,
            timeout : 27000
          };
    
          navigator.geolocation.watchPosition(this.getLocation.bind(this), null, geoOptions);
        } else {
          alert('Geolocation is not supported by this browser.');
        }
      }
      getLocation(position) {
        this.setState({
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          content: `Location found.`,
        });
      }
    render(){
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <Typography align="center" variant="h2" gutterBottom={true}>
                           HR HOME
                </Typography>
                    <Divider light/>
            <Grid container spacing={3}>
                <Grid item xs={12} sm ={6}>


                <Paper className={classes.paper} elevation={1} >
                    {console.log(this.state.paths)}
                    {!! this.state.paths ?
                    <div>
                        <ShowMap
                        googleMapURL={googleMapURL}
                        center={this.state.center}
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `400px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        paths = {this.state.paths}
                        />
                    <Typography variant="h4" gutterBottom={true}>
                            Created GeoFence
                    </Typography>
                    <Button className={classes.btn} 
                    onClick = {() =>{
                        swal({
                            title: "Are you sure?",
                            text: "Once deleted, you will not be able to recover!",
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                        })
                        .then(willDelete =>{
                            if(willDelete){
                                Axios.get(`http://localhost:8080/hr/deleteFence?branchName=${this.state.branchName}`,{headers:headers})
                                .then((ok) =>{
                                swal({
                                    title: "Deleted",
                                    icon: "success",
                                    button: "Okay",
                                })
                                .then(()=>{
                                    window.location.reload();
                                })
                            })
                            }
                        })
                    }}  
                    variant="contained"
                    color="secondary">
                        DELETE<DeleteIcon fontSize="small"/>
                    </Button>
                    </div>
                    
                    :
                    <div>
                        <Typography variant="h6" gutterBottom={true}>
                                It seems that GeoFence is not yet Created.
                        </Typography>
                        <Typography >
                            Click below to Create the Geo Fence
                        </Typography>
                        <Button className={classes.btn} component={Link} to={'/home/geo-fence'} variant='outlined'>
                            Create GeoFence
                        </Button>
                    </div>
                    }
                    
                </Paper>


                </Grid>
                <Grid alignItems="center" item xs={12} sm={6}>
                    <Paper className={classes.paper} elevation={1} >
                       
                        <Typography variant="h4" gutterBottom={true}>
                                MANUAL ATTENDENCE
                        </Typography>
                        <Button component={Link} to={'/home/manual-attendance'} variant='outlined'>
                            Click Here<NavigateNextIcon/>
                        </Button>
                    </Paper>
                    <Paper className={classes.paper} elevation={1} >
                        <Typography variant="h4" gutterBottom={true}>
                                LEAVE APPLICATIONS
                        </Typography>
                        <Button component={Link} to={'/home/leave-applications'} variant='outlined'>
                            Click Here<NavigateNextIcon/>
                        </Button>
                    </Paper>
                    <Paper className={classes.paper} elevation={1} >
                        <Typography variant="h4" gutterBottom={true}>
                                ATTENDANCE STATUS
                        </Typography>
                        <Button component={Link} to={'/home/attendance-status'} variant='outlined'>
                            Click Here<NavigateNextIcon/>
                        </Button>
                    </Paper>
                </Grid>
                
            </Grid>
            </div>
        )
    }

}

export default withStyles(styles)(HomePage);