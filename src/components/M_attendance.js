import React from "react";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { Grid } from "@material-ui/core";

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 4,
        marginBottom: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
})

class M_attendance extends React.Component {
    render(){
        const { classes } = this.props;
        return(
            <div className={classes.main}>
            <CssBaseline />
            <Paper className={classes.paper} elevation={8}>
                <form className={classes.form} onSubmit={this.handleLoginSubmit}>
                    <Typography color='primary' component="h1" variant="h5">
                        MANUAL ATTENDANCE
                    </Typography>
                    <br/>
                    <Grid container spacing={1} >
                        <Grid item xs={1}>
                           
                                <Typography>
                                    <HelpOutlineIcon fontSize ="large"/> 
                                </Typography>
                           
                        </Grid>
                        <Grid item xs={11}>
                       
                            <Typography>
                                   Type The Employee Id (Phone Number) and click submit for giving present day attendance.
                            </Typography>
                        </Grid>
                        </Grid>
                        <br/>
                    <Divider light={true}/>

                    <TextField
                        label="Phone Number"
                        className={classes.textField}
                        id="username"
                        placeholder="Enter Employee Id here"
                        type="text"
                        inputProps={{ minLength: 10 }}
                        margin="normal"
                        variant="outlined"
                        required={true}
                        fullWidth
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        SUBMIT ATTENDANCE
                    </Button>
                </form>
            </Paper>
        </div>
        )
    }
}
export default withStyles(styles)(M_attendance);