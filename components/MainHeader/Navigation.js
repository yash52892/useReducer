import React from 'react';

import classes from './Navigation.module.css';
import UserContext from '../Context/auth.context';

const Navigation = (props) => {
  return (
    <UserContext.Consumer>
      {
        (ctx)=>{
          return (
            <nav className={classes.nav}>
      <ul>
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <button onClick={props.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
          )
        }
      }
      </UserContext.Consumer>
  );
};

export default Navigation;
