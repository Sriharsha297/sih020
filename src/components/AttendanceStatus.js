import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import Axios from "axios";
import StatusList from "../attendance.json";
import { withRouter,Link } from "react-router-dom";
import {TablePagination,Typography,Paper,Table,TableBody,TableCell,TableHead,TableRow,withStyles} from '@material-ui/core';
import swal from "sweetalert";


const styles = theme => ({
  main: {
    margin: theme.spacing.unit,
    [theme.breakpoints.up(1200 + theme.spacing.unit * 3 * 2)]: {
        width: 1200,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
  },
  root: {
    ...theme.mixins.gutters(),
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  someDivision:{
    textAlign: 'center'
  }
});

const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + localStorage.getItem('token')
}

class GrievancesInZone extends React.Component {
  constructor(props) {
    super(props);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.state = {
      attendanceList: [],
      page: 0,
      rowsPerPage: 5,
      length:null,
    }
  }

  handleDialogClose(){
    this.setState({ open: false,error:'' });
  }

   componentDidMount() {
      const branchName = "hyd";
      Axios.get(`http://localhost:8080/hr/attendanceStatus?branchName=${branchName}`)
          .then((response) =>{
            console.log(response.data.array);
            if(response.status === 200){
                this.setState({attendanceList:response.data.array,length:response.data.array.length})
            }
          })
          .catch((err)=>{
            if (err.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              swal("Oops!", err.response.data.message, "error");
                console.log(err.response.data.message);
                console.log(err.response.status);
          }
          });
  }
  handleChangePage =  page => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    // if(!(localStorage.getItem('token'))) {
    //   return(
    //       <div>
    //           <p>You need to be <strong>logged in </strong>to do that <Link to='/'>Please Login</Link></p>
    //       </div>
    //   )
    // } 
    const { classes } = this.props;

    return (
      <div className={classes.main}>
        <Typography color='primary' component="h1" variant="h5">
           PRESENT DAY STATUS
        </Typography>
        <Paper className={classes.root} elevation={10}>
            
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell >S.No</TableCell>
                        <TableCell >Employee Id</TableCell>
                        <TableCell >Employee Name</TableCell>
                        <TableCell >Total Present </TableCell>
                        <TableCell >Leaves Taken</TableCell>
                        <TableCell >Current Day status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {
                    this.state.attendanceList.map((item,i) => 
                    {
                        return(
                            <TableRow key={i}>
                                <TableCell>{i+1}</TableCell>
                                <TableCell>{(item.empId)}</TableCell>
                                <TableCell>{item.username.toUpperCase()}</TableCell>
                                <TableCell>{(item.totalPresent)}</TableCell>
                                <TableCell>{(item.leavesTaken)}</TableCell>
                                <TableCell>
                                    {
                                        (item.status === 'present')
                                        ?
                                        <Typography color='primary' variant="subtitle1" >
                                            {item.status.toUpperCase()}
                                        </Typography>
                                        :
                                        <Typography color='secondary' variant="subtitle1" >
                                            {item.status.toUpperCase()}
                                        </Typography>
                                    }
                                </TableCell>
                                
                            </TableRow>   
                        )
                    })
                    
                }
                </TableBody>
            </Table>
        </Paper>
      </div>

    )
  }
}



export default withStyles(styles)((withRouter(GrievancesInZone)));