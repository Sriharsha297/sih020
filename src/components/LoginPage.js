import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Divider } from '@material-ui/core';
import { withRouter,Redirect } from "react-router-dom";
import Axios from 'axios';
import swal from 'sweetalert';



const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
})


class LoginPage extends React.Component {
  constructor(props) {
      super(props);
      this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
      this.state = {
          isAuthorised: false,
          error:'',
         // open:true
      }
  }
  handleLoginSubmit(e)
  {
      e.preventDefault();
      console.log("Hello");
      const hrId = e.target.elements.username.value.trim();
      const password = e.target.elements.password.value.trim();

      const loginObj = {
          hrId,
          password
      }

      Axios.post(`http://localhost:8080/hr/login`,loginObj)
      .then((response) => {
        console.log(response.data)
        localStorage.setItem('name',response.data.hr.name);
        localStorage.setItem('empId',response.data.hr.hrId);
        localStorage.setItem('branch',response.data.hr.branch);
        localStorage.setItem('token',response.data.token);
        this.setState({isAuthorised:true})
      })
      .catch((error)=>{
        console.log(error);
        if (error.response.status == 400) {
          swal("Invalid Credentials!","","error")
        }
      });
  }
  render(){

    const {classes} = this.props;
    if(!!localStorage.getItem('token')){
      return <Redirect to='/home'/>
    }
    if (this.state.isAuthorised) {
      return <Redirect to="/home" />
    }
   
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            HR SIGN IN
          </Typography>
          <form className={classes.form} onSubmit ={this.handleLoginSubmit} >
            <TextField
              variant="outlined"
              margin="normal"
              required ={true}
              // inputProps={{ minLength: 10 }}
              fullWidth
              id="uername"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>


        <Divider/>
      </Container>
    );
  }
}
export default withStyles(styles)(withRouter(LoginPage));