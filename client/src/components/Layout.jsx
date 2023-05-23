import React from 'react';
import { NavBar } from './NavBar.jsx'


export const Layout = ({ children }) => {
   return (
      <React.Fragment>
         <NavBar />
         <div className='container'>
            { children }
         </div>
      </React.Fragment>
   )
}
