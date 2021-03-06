/*global google*/

import React, {Component} from 'react';
import Map from './Map';
import "../App.css"
import {Redirect} from 'react-router-dom';
import { withStyles, Button, Divider , Grid} from '@material-ui/core';
import swal from 'sweetalert';

import Axios from 'axios';

const googleMapURL = `https://maps.googleapis.com/maps/api/js?libraries=geometry,drawing&key=AIzaSyBTHrx8pxJEFfVSVHjFVM7e2YS8ZbNqECU`;

const styles = theme => ({
  btn: {   
      margin: theme.spacing.unit*2,
  }
})

const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + localStorage.getItem('token')
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: null,
      fence: null,
      previousPolygon: null,
      zone:'',
      submitted:false,
      branchName:'',
    };
  }

  componentDidMount() {
    this.watchLocation();
    const branchName = localStorage.getItem('branch');
    this.setState({branchName})
    console.log("cdm ",this.state.fence);
    
  }

  componentWillUnmount() {
    this.unwatchLocation();
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

  unwatchLocation() {
    if ('geolocation' in navigator && this.state.watchID) {
      navigator.geolocation.clearWatch(this.state.watchID);
    }
  }

  getLocation(position) {
    this.setState({
      center: {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    });
    console.log("Hurrey");
  }



  doneDrawing(polygon) {
    if (this.state.previousPolygon) {
      this.state.previousPolygon.setMap(null);
    }

    this.setState({previousPolygon: polygon});
    this.setState({
      fence: new google.maps.Polygon({
        paths: polygon.getPaths(),
      }),
    });


  }
  handleSubmit = () =>{
    const fenceObj = this.state.fence;
    let polygon = [];
    
    fenceObj.getPaths().forEach(e => {
      e.forEach(ele => {
        polygon.push(ele.toJSON());
      })
    });

    Axios.post(`http://localhost:8080/hr/saveFence?branchName=${this.state.branchName}`,polygon,{headers:headers})
    .then((res)=>{
      console.log(res.data);
      swal({
        title: "Submitted",
        icon: "success",
        button: "Okay",
      }).then(() =>{
        this.setState({submitted:true})
      })
    }).catch((err) =>{
      console.log("Err Msg : "+ err)
    })
  }

  render() {
    const { classes } = this.props;
    if (!this.state.center) {
      return <div />
    }
    if(this.state.submitted){
      return <Redirect to='/home'/>
    }
    return (
      <div className="App">      
        <Map
          googleMapURL={googleMapURL}
          loadingElement={
            <p>Loading maps...</p>
          }
          containerElement={
            <div className="map-container" />
          }
          mapElement={
            <div className="map" />
          }
          center={this.state.center}
          doneDrawing={this.doneDrawing.bind(this)}
        />
        <Button className={classes.btn} onClick={this.handleSubmit} disabled={!this.state.fence} variant="contained" color="primary">
          Save GeoFence
        </Button>
        <Button onClick={() => {
           this.state.previousPolygon.setMap(null);
          }
          } className={classes.btn}  variant="contained" color="primary">
          Refresh
        </Button>
        
        <Button className={classes.btn}  variant="contained" color="secondary">
          Go Back
        </Button>

      </div>
    );
  }
}

export default withStyles(styles)(App);