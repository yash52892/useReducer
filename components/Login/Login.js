import React, { useState, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) =>{
  if(action.type==='U_I')
  return {value:action.val, Isvalid:action.val.includes('@')}
   if(action.type==='U_B')
   return {value:state.value, Isvalid:state.value.includes('@')}
}

const passReducer=(state, action)=>{
  if(action.type==='U_I')
  return {value:action.val, Isvalid:action.val.trim().length > 6}
  if(action.type==='U_B')
  return {value:state.value, Isvalid:state.value.trim().length > 6}
}
const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [stateEmail, dispEmail]=useReducer(emailReducer, {value:'',Isvalid:null})

  const[statePass, dispPass]=useReducer(passReducer, {value:'',Isvalid:null})

  const emailChangeHandler = (event) => {
    dispEmail(
      {
        type: 'U_I',
        val:event.target.value
      }
    )
    setFormIsValid(
      statePass.Isvalid && event.target.value.includes('@')
    );
  };

  const validateEmailHandler=()=>{
   // setEmailIsValid(stateEmail.Isvalid);
    dispEmail({type: 'U_B'});
  };

  const passwordChangeHandler = (event) => {
    dispPass({type: 'U_I',val:event.target.value});

    setFormIsValid(statePass.Isvalid && stateEmail.Isvalid);};

  const validatePasswordHandler = (event) => {
    dispPass({type: 'U_B'})};

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(stateEmail.value, statePass.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            stateEmail.Isvalid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={stateEmail.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            statePass.Isvalid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={statePass.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
