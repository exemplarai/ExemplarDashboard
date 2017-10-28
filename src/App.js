import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import FlatButton from 'material-ui/FlatButton';
import './App.css';
import logoimg from './logo.png';
import loading from './Callback/loading.svg';
import menu from './menu.png';
import Sidebar from 'react-sidebar';

class App extends Component {

  state ={
    menuOpen:true
  };

  menuToggle() {
    console.log(this.state.menuOpen);
    this.setState({menuOpen:!this.state.menuOpen});
  }

  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  handleLogin() {
    let { isAuthenticated }=this.props.auth;
    let { location } = this.props.history;
    if(location.pathname === '/' && !isAuthenticated()) {
      this.login();
    }
    else if(location.pathname === '/' && isAuthenticated()) {
      this.goTo('dashboard');
    }
  }

  componentDidMount() { 
    this.handleLogin();
  }

  componentDidUpdate() { 
    this.handleLogin();
  }

  render() {
    const style = {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      height: '100vh',
      width: '100vw',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
    }

    var sidebarContent = <div className="sidebar-nav">
      <div className="brand-logo">
        <a href="javascript:void();"><img src={logoimg} alt="Main Logo" style={{margin:'10px 10px'}}/></a>
      </div>
      <div className="sidebar-nav-content">
        <h3>Main Menu</h3>
        <ul>
          <li className="active"><a href="javascript:void();">Analytics</a></li>
          <li><a href="javascript:void();">Integration</a></li>
        </ul>
      </div>
      </div>;

    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated()) {
      return (
        <div>
         
          <Navbar fluid style={{'backgroundColor': '#fff'}}>
            <Navbar.Header>             
                <div className="menu-toggle">
                  
                </div>
                  {
                    !isAuthenticated() && (
                        <FlatButton label="Log In" onClick={this.login.bind(this)} style={{ margin: '32px 3px'}}/>
                      )
                  }

                  {
                    isAuthenticated() && (
                        <FlatButton label="Log out" onClick={this.logout.bind(this)} style={{ margin: '32px 3px'}}/>
                      )
                  }
              
            </Navbar.Header>
          </Navbar>
          <div className="container">
            {this.props.children}
          </div>
        </div>
      );
    }
    else {
      return (
        <div style={style}>
          <img src={loading} alt="loading"/>
        </div>
      );
    }
  }
}
export default App;
