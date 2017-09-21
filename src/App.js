import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import FlatButton from 'material-ui/FlatButton';
import './App.css';
import logoimg from './logo.png';

class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
        <Navbar fluid style={{'backgroundColor': '#fff','minHeight': '100px'}}>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#"><img src={logoimg} alt="Main Logo" style={{margin:'10px 10px'}}/></a>
            </Navbar.Brand>
            
            {
              !isAuthenticated() && (
                  
                  <FlatButton label="Log In" onClick={this.login.bind(this)} style={{ margin: '32px 3px'}}/>
                )
            }
            {
              isAuthenticated() && (
                  <FlatButton label="Dashboard" primary={true} onClick={this.goTo.bind(this, 'dashboard')} style={{ margin: '32px 3px'}}/>
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
          {
            !isAuthenticated() && (
                <h4>
                  You are not logged in! Please{' '}
                  <a
                    style={{ cursor: 'pointer' }}
                    onClick={this.login.bind(this)}
                  >
                    Log In
                  </a>
                  {' '}to continue.
                </h4>
              )
          }
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
