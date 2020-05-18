import React from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import {Button,Grid,Typography,Divider,Card,CardContent,CardActions,withStyles,Paper} from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import swal from 'sweetalert';




const styles = theme => ({
  main: {
    margin: theme.spacing.unit,
  },
  root: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing.unit*2,
    minWidth: 260,
  },
  pos: {
    marginTop: theme.spacing.unit,
  },
  res:{
    marginLeft :theme.spacing.unit*2,
  },
  card: {
    minWidth: 280,
    margin: theme.spacing.unit * 1,
    padding: theme.spacing.unit ,
    color: theme.palette.text.primary,
  },
  someDivision:{
    textAlign: 'center'
  },
  btn: {
    margin: theme.spacing.unit*2
}
});


const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + localStorage.getItem('token')
}

const branchName = localStorage.getItem('branch');

class LeaveApplications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      applications: [],
      submitted:false,
    }
  }

  componentDidMount() {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  
    Axios.get(`http://localhost:8080/hr/leaveApplications?branchName=${branchName}`,{headers:headers})
      .then((response) => {
          console.log(response.data.array)
        this.setState({applications:response.data.array})
        if(response.data.array.length == 0){
          swal("No Leave applications yet!");
        }
      })
      .catch((error)=>{
        if (error.response) {
          console.log(error.response.data.message);
          console.log(error.response.status);
      }
      });
 }


  render() {  
    const { classes } = this.props;
    if(this.state.submitted){
        return <Redirect to='/home'/>
    }
    return (
      <div className={classes.main}>
      <Paper>
        <Button onClick = {() => {this.setState({submitted:true})}} className={classes.btn}>
            <ArrowBackIosIcon />Go Back
        </Button>
      <Divider/>
      <Grid container spacing={32} justify='center'>
        {
           this.state.applications.map((single, index) => (
            <Grid item xs={12} sm={6} md={5} lg={4} key ={index} >
            <Card className={classes.card} elevation={6}>
                <CardContent>
                    <Typography variant="h6" component="h3">
                        Employee Details
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        Employee Name : 
                        <Typography display="inline" variant="h6" color='primary'>
                            {single.username.toUpperCase()}
                        </Typography>
                    </Typography>
                    
                    <Typography className={classes.pos} color="textSecondary">
                        Employee Id : 
                        <Typography display="inline" variant="h6" color='primary'>
                            {single.empId}
                        </Typography>
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        Total Present : {single.totalPresent}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        Leaves left : {single.leavesLeft}
                    </Typography>
                   
                    <Typography variant="h6" component="h3">
                        Leave Details
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                    Applied On : {single.appliedOn}
                    </Typography>

                    <Typography className={classes.pos} color="textSecondary">
                    Leave Type : {single.leaveType == 'sick' ? "Sick Leave" : "Casual Leave"}
                    </Typography>

                    <Typography className={classes.pos} color="textSecondary">
                    Number of Days : {single.days}
                    </Typography>
                    
                    <Typography className={classes.pos} color="textSecondary">
                    Leave On : {single.date}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                    Reason :
                    </Typography>
                    <Typography color="textSecondary">
                    {single.reason}
                    </Typography>
                </CardContent>
                <Divider/>
                <CardActions>
                  {
                    single.status == 'pending' 
                    ?
                    <div>
                      <Button color='primary' variant='contained' onClick = {() =>{
                        console.log(single.empId);
                        Axios.put(`http://localhost:8080/hr/acceptLeave?leaveId=${single.leaveId}&empId=${single.empId}`)
                        .then((res) =>{
                          console.log(res);
                          swal({
                            title: "Leave Accepted",
                            icon: "success",
                            button: "Okay",
                          })
                          .then(()=>{
                            window.location.reload();
                          })
                        })
                        .catch(err =>{
                          console.log(err);
                        })
                      }}>
                        Accept
                      </Button>
                      <Button color='secondary' className={classes.btn}  variant='contained' onClick = {() =>{
                        console.log(single.empId)
                        Axios.put(`http://localhost:8080/hr/rejectLeave?leaveId=${single.leaveId}`)
                        .then((res) =>{
                          console.log(res);
                          swal({
                            title: "Leave Rejected",
                            icon: "success",
                            button: "Okay",
                          })
                          .then(()=>{
                            window.location.reload();
                          })
                        })
                        .catch(err =>{
                          console.log(err);
                        })
                      }}>
                        Reject
                      </Button>
                    </div>
                    :
                    <Typography className={classes.res} color="secondary">
                    STATUS : {single.status.toUpperCase()}
                    </Typography>
                    }

                </CardActions>
            </Card>
            </Grid>
            
          ))
        }
        </Grid>
      
        </Paper>
      </div>
    )
  }
}



export default withStyles(styles)(((LeaveApplications)));