import React from 'react'
import logo from '../../logo.svg';
import '../../App.css';

const Layout = ({children}) => (
   <div className="App">
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to Apollo & GraphQL</h1>
      </header>
      <div className="App-intro">
      { children }
      </div>
   </div>
)

export default Layout