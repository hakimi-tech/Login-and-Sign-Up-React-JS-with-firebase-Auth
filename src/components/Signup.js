import React, { useState,useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FirebaseContext from '../context/firebase';
import { Link, useHistory } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { doesUsernameExist } from '../services/firebase';

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

const Signup = () => {
  const classes = useStyles();
  // create state variables for each input
  const { firebase } = useContext(FirebaseContext);
  const history = useHistory();
  const [userName, setUserName] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isInvalid = userName === '' || fullName === '' || password === '' || email === '';

  const handleSignUp = async (event) => {
    event.preventDefault();

    const usernameExists = await doesUsernameExist(userName);
        if (!usernameExists.length) {
            try {
                const createdUserResult = await firebase.auth().createUserWithEmailAndPassword(email, password);
                
                await createdUserResult.user.updateProfile({
                    displayName: userName
                });
                
                await firebase.firestore().collection('users').add({
                   
                    userId: createdUserResult.user.uid,
                    username: userName.toLowerCase(),
                    fullName,
                    emailAddress: email.toLowerCase(),
                    following: [],
                    followers: [],
                    dateCreated: Date.now()
                });
                history.push(ROUTES.DASHBOARD);
            } catch (error) {
                setFullName('');
                setError(error.message);
            }
        } else {
            setUserName('');
            setFullName('');
            setEmail('');
            setPassword('');
            setError('That username is already taken, please try another!')
        }       
    }
    


    useEffect(() => {
    document.title = 'Signup - Dashboard';
  }, [])

  return (
    <div>
      {error && <p aligned="center">{error}</p>}
    <form className={classes.root} onSubmit={handleSignUp}>
      <TextField
        label="User Name"
        variant="filled"
        required
        value={userName}
        onChange={({ target }) => setUserName(target.value.toLowerCase())}
      />
      <TextField
        label="Full Name"
        variant="filled"
        required
        value={fullName}
        onChange={({ target }) => setFullName(target.value)}
      />
      <TextField
        label="Email"
        variant="filled"
        type="email"
        required
        value={email}
        onChange={({ target }) => setEmail(target.value.toLowerCase())}
      />
      <TextField
        label="Password"
        variant="filled"
        type="password"
        required
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />
      <div>
        <Button variant="contained" onClick={handleSignUp}>
              <Link to={ROUTES.LOGIN} className="font-bold">
        Login
              </Link>
     
        </Button>
        <Button type="submit" variant="contained" color="primary" disabled={isInvalid}>
                        Sign up         
        </Button>
      </div>
    </form>
    </div>
  );
};

export default Signup;

