import React, { useState,useEffect, useContext  } from 'react';
import { Link, useHistory  } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';



const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
    

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '400px',
      hieght: '700px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
}));

const Login = ({ handleClose }) => {
  const history = useHistory();
  const classes = useStyles();
  const { firebase } = useContext(FirebaseContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const isInvalid = password === '' || email === '';

  const handleLogin = async (event) => {
    event.preventDefault();
    
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        history.push(ROUTES.DASHBOARD);
    } catch (error) {
        setEmail('');
        setPassword('');
        setError(error.message);
    }
};

  useEffect(() => {
    document.title = 'Login - Dashboard';
}, [])
  return (
      <div>

      {error && <p aligned="center">{error}</p>}
      <form className={classes.root} onSubmit={handleLogin} method="POST" >
      <TextField
        label="Email"
        variant="filled"
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        variant="filled"
        type="password"
        required
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <div>
        <Button variant="contained" onClick={handleClose}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary" disabled={isInvalid}>
          Login
        </Button>
      </div>
       <div aligned="center">
                <p aligned="center">
                    Don't have an account?
                    <Link to={ROUTES.SIGN_UP} >
                        Sign up
                    </Link>
                </p>
        </div>
    </form>
    </div>
  );
};

export default Login;