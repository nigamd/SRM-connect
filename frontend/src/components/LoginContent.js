import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Header from './Header';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../actions/auth';
import {Redirect} from 'react-router-dom';
import compose from 'recompose/compose';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright ©️ '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = (theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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
});

class  Login extends Component{
  constructor(props) {
    super(props);
    this.state = {
      username:'',
      password : ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  static propTypes= {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  }
  onChange(event) {
    this.setState(
      { [event.target.name]:event.target.value }
    );
    event.preventDefault()
  }
  onSubmit(event) {
    event.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password
    };
    
    this.props.login(user);
  }
  render() {
    if (this.props.isAuthenticated){
      return <Redirect
        to='/'
      />
    }
    const { classes } = this.props;
    return (
      <React.Fragment>
          <Header/>
          <Container>
              <Box>
              <Grid container component="main" className={classes.root}>
                  <CssBaseline />
                  <Grid item xs={false} sm={4} md={7} className={classes.image} />
                  <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                  <div className={classes.paper}>
                      <Avatar className={classes.avatar}>
                      <LockOutlinedIcon />
                      </Avatar>
                      <Typography component="h1" variant="h5">
                      Sign in
                      </Typography>
                      <form className={classes.form} noValidate onSubmit={this.onSubmit}>
                      <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="username"
                          label="Username"
                          name="username"
                          autoFocus
                          onChange={this.onChange}
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
                          onChange={this.onChange}
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
                      <Box mt={5}>
                          <Copyright />
                      </Box>
                      </form>
                  </div>
                  </Grid>
              </Grid>
              </Box>
          </Container>
      </React.Fragment>
      
    );
  }

}

const mapStateToProps = state=>({
  isAuthenticated: state.auth.isAuthenticated,
});

export default compose(
  withStyles(useStyles),
  connect(mapStateToProps,{login})
)(Login);