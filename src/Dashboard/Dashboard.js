import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import './Dashboard.css';
import squareimg from './square-logo-light.png';
import spotifyimg from './spotify.png';
import loading from '../Callback/loading.svg';
import axios from 'axios';
import Sidebar from 'react-sidebar';
import logoimg from '../logo.png';
import menu from '../menu.png';
import Analytics from '../Analytics/Analytics';
import Integration from '../Integration/Integration.js';

class Dashboard extends Component {


  state ={
    menuOpen:true,
    componentToRender:'Analytics',
    importFile:0
  };

  componentToRenderReturn(){
    if(this.state.componentToRender == "Analytics")
      return <Analytics />;
    else if(this.state.componentToRender == "Integration")
      return <Integration />;
  }

  changeComponent(){
    console.log("Analytics");
  }

  menuToggle() {
    this.setState({importFile:this.state.importFile+1});
    this.setState({menuOpen:!this.state.menuOpen});
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }  

  componentWillMount() {
    this.setState({ email: '', location_id: '', location_response_state: false, square_connection_status: false, spotify_connection_status: false});
    const { isAuthenticated ,getAccessToken } = this.props.auth;
    if (!isAuthenticated()) {
      this.props.auth.login();
    }
    else {
      const headers = {'Authorization': `Bearer ${getAccessToken()}`};
      console.log(headers);
      axios.get('https://api.exemplar.ai/locations', {headers})
      .then(response => {
        this.setState({location_response_state: true});
        console.log(response);
        if (response.status === 200) {
          this.setState({location_id: response.data[0].id, spotify_block_class: 'integration-block', spotify_button_disable: false, square_connection_status: true})
          if (response.data[0].playHistoryProviders.spotify) {
            this.setState({spotify_connection_status: true});
          }
        }
        else if (response.status === 404) {
          this.setState({ spotify_block_class: 'integration-block-grayout', spotify_button_disable: true});
        }
      })
      .catch(error => {
        this.setState({location_response_state: true});
        console.log(error.response);
        if (error.response.status === 404) {
          this.setState({ spotify_block_class: 'integration-block-grayout', spotify_button_disable: true});
        }
      });
  
      const { userEmail, getEmail } = this.props.auth;
      if (!userEmail) {
        getEmail((err, email) => {
          this.setState({ email: email });
        });
      } else {
        this.setState({ email: userEmail });
      }
    }    
  }

  render() {

     var sidebarContent = <div className="sidebar-nav">
      <div className="brand-logo">
        <a href="javascript:void();"><img src={logoimg} alt="Main Logo"/></a>
      </div>
      <div className="sidebar-nav-content">
        <h3>Main Menu</h3>
        <ul>
          <li className={ this.state.componentToRender == "Analytics" ? "active" : null} ><a onClick={() => this.setState({componentToRender:"Analytics"})} href="javascript:void();">Analytics</a></li>
          <li className={ this.state.componentToRender == "Integration" ? "active" : null}><a onClick={() => this.setState({componentToRender:"Integration"})}  href="javascript:void();">Integration</a></li>
        </ul>
      </div>
      </div>;

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
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated()) {
      if (this.state.location_response_state) {
        return (
          <div className="container-fluid">
          <Sidebar sidebar={sidebarContent}
               open={this.state.menuOpen} docked={this.state.menuOpen}>
            <div className="profile-area">
              <img className="brand-logo" onClick={this.menuToggle.bind(this)} src={menu} style={{height:27,width:27,position:'relative'}} />
              {
                  this.state.componentToRender == "Analytics"
                  ?
                  <Analytics />
                  :
                  <Integration 
                      spotify_button_disable={this.state.spotify_button_disable}
                      spotify_button_dissable={this.state.spotify_button_disable}
                      spotify_connesction_status={this.state.spotify_connection_status}
                      spotify_blocsk_class={this.state.spotify_block_class} 
                      square_connection_status={this.state.square_connection_status}  
                      email={this.state.email}
                      location_id={this.state.location_id}
                      />
              }
            </div>
            </Sidebar>
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
    else {
      this.login();
      return (
        <div style={style}>
          <img src={loading} alt="loading"/>
        </div>
      );
    }
  }
}
export default Dashboard;
