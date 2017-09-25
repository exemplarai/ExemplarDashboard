import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import './Dashboard.css';
import squareimg from './square-logo-light.png';
import spotifyimg from './spotify.png';



class Dashboard extends Component {

  componentWillMount() {
    this.setState({ profile: {} });
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
    }
  }
  render() {
    const { profile } = this.state; 
    return (
      <div className="container">
        <div className="profile-area">
          <h2 className="heading1">Link Your Account To Begin Learning:</h2>
          <div className="settings-form-block">
            <div className="integration-block">
              <div className='image-block'>
                <img className="img-square" src={squareimg} alt="Square Logo"/> 
                <a href={'https://connect.squareup.com/oauth2/authorize?client_id=sq0idp-JOcI7wPMrutdlGthWLCUYQ&state=' + profile.name+ '&scope=MERCHANT_PROFILE_READ%20PAYMENTS_READ%20CUSTOMERS_READ%20ITEMS_READ'} style={{'marginLeft':'74%'}}>
                  <RaisedButton className="en_button" label="Enable" buttonStyle={{'borderRadius':'15px'}} labelColor="#fff" backgroundColor="#FF5744" style={{'borderRadius':'15px'}}/>
                </a>
              </div>
              <div className="text-block1">
                <h4 className="subtext" >{'With Square, we are able to link all your payments onto one place and collect'}<br/>{'data to time a purchase is made.'} </h4>
              </div>            
            </div>
            <div className="integration-block">
              <div className='image-block'>
                <img className="img-spotify" src={spotifyimg} alt="Spotify Logo"/> 
                <a href={'https://accounts.spotify.com/authorize/?client_id=84bd052b5f844708861f1c3dc8685633&response_type=code&redirect_uri=https%3A%2F%2Farceaq2a1d.execute-api.us-west-2.amazonaws.com%2Fprod%2Fcallbacks%2Foauth%2Fspotify&state=' + profile.name + '&scope=user-read-private%20user-read-email%20user-read-recently-played'} style={{'marginLeft':'74%'}}>
                  <RaisedButton className="en_button" label="Enable" buttonStyle={{'borderRadius':'15px'}} labelColor="#fff" backgroundColor="#FF5744" style={{'borderRadius':'15px'}}/>
                </a>
              </div>
              <div className="text-block2">
                <h4 className="subtext">{'With Spotify, we link all your music onto one place and collect data to time a'}<br/>{'purchase is made.'} </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Dashboard;
