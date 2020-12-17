import React, { useState } from 'react';
import Header from './Header.jsx';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { NavLink } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Artruista
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
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
    // marginTop: theme.spacing(8),
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',

    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(3),
  },
  container: {
    borderRadius: 5,
    border: 0,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(45, 29, 32, .3)',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function SignUp() {
  const classes = useStyles();

  // initial state with input keys are empty strings
  const [userSignUp, setUserSignUp] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  // handling on change for user
  const handleOnChage = (e) => {
    const { name, value } = e.target;
    setUserSignUp({
      ...userSignUp,
      [name]: value
    });
  };



  const handleUserSignUp = (e) => {
    e.preventDefault();
    // object that contains user input
    console.log(userSignUp)
    // axios request would go here

    // resetting input values
    setUserSignUp({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });
  };

  return (
    <React.Fragment>
      <Header />
    {/* <Container className={classes.container} component="main" maxWidth="xs"> */}
    <Grid container component="main" className={classes.root}>
      <CssBaseline />

      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>

      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleUserSignUp}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                value={userSignUp.firstName}
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                onChange={handleOnChage}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={userSignUp.lastName}
                autoComplete="lname"
                onChange={handleOnChage}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={userSignUp.email}
                autoComplete="email"
                onChange={handleOnChage}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                value={userSignUp.password}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleOnChage}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <NavLink to="/" variant="body2">
                Already have an account? Sign in
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={18}>
        <Copyright />
      </Box>

      </Grid>
    </Grid>
    {/* </Container> */}
    </React.Fragment>
  );
}