import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import './Dashboard.css';
import squareimg from './square-logo-light.png';
import spotifyimg from './spotify.png';
import loading from '../Callback/loading.svg';
import axios from 'axios'

class Dashboard extends Component {

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  componentWillMount() {
    this.setState({ email: '', location_id: '', location_response_state: false, square_connection_status: false, spotify_connection_status: false});
    const { getAccessToken } = this.props.auth;
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
    .catch(error => console.log(error.message));

    const { userEmail, getEmail } = this.props.auth;
    if (!userEmail) {
      getEmail((err, email) => {
        this.setState({ email: email });
      });
    } else {
      this.setState({ email: userEmail });
    }
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
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated()) {
      if (this.state.location_response_state) {
        return (
          <div className="container">
            <div className="profile-area">
              <h2 className="heading1">Link Your Account To Begin Learning:</h2>
              <div className="settings-form-block">
                <div className="integration-block">
                  <div className='image-block'>
                    <img className="img-square" src={squareimg} alt="Square Logo"/> 
                  </div>
                  <table className="block-table" style={{'width':'100%'}}>
                    <tbody>
                      <tr>
                        <td>
                          <div className="text-block1">
                            <h4 className="subtext" >{'With Square, we are able to link all your payments onto one place and collect data to time a purchase is made.'} </h4>
                          </div>
                        </td>
                        <td style={{'width':'100px'}}>
                          {
                            this.state.square_connection_status ?
                            (
                              <a href={'https://connect.squareup.com/oauth2/authorize?client_id=sq0idp-JOcI7wPMrutdlGthWLCUYQ&state=' + this.state.email+ '&scope=MERCHANT_PROFILE_READ%20PAYMENTS_READ%20CUSTOMERS_READ%20ITEMS_READ'}>
                                <RaisedButton className="en_button" label="Disable" buttonStyle={{'borderRadius':'15px'}} labelColor="#fff" backgroundColor="rgb(191,191,191)" style={{'borderRadius':'15px', 'marginRight':'20px'}}/>                                
                              </a>
                            ):
                            (
                              <a href={'https://connect.squareup.com/oauth2/authorize?client_id=sq0idp-JOcI7wPMrutdlGthWLCUYQ&state=' + this.state.email+ '&scope=MERCHANT_PROFILE_READ%20PAYMENTS_READ%20CUSTOMERS_READ%20ITEMS_READ'}>
                                <RaisedButton className="en_button" label="Enable" buttonStyle={{'borderRadius':'15px'}} labelColor="#fff" backgroundColor="#FF5744" style={{'borderRadius':'15px', 'marginRight':'20px'}}/>                                
                              </a>
                            )
                          }
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className={this.state.spotify_block_class}>
                  <div className='image-block'>
                    <img className="img-spotify" src={spotifyimg} alt="Spotify Logo"/> 
                  </div>
                  <table className="block-table" style={{'width':'100%'}}>
                    <tbody>
                      <tr>
                        <td>
                          <div className="text-block2">
                            <h4 className="subtext">{'With Spotify, we link all your music onto one place and collect data to time a purchase is made.'} </h4>
                          </div>
                        </td>
                        <td style={{'width':'100px'}}>
                          {
                            this.state.spotify_connection_status ?
                            (
                              <a href={'https://accounts.spotify.com/authorize/?client_id=84bd052b5f844708861f1c3dc8685633&response_type=code&redirect_uri=https%3A%2F%2Farceaq2a1d.execute-api.us-west-2.amazonaws.com%2Fprod%2Fcallbacks%2Foauth%2Fspotify&state=' + this.state.location_id + '%23' + this.state.email + '&scope=user-read-private%20user-read-email%20user-read-recently-played'}>
                                <RaisedButton className="en_button" disabled={this.state.spotify_button_disable} label="Disable" buttonStyle={{'borderRadius':'15px'}} labelColor="#fff" backgroundColor="rgb(191,191,191)" style={{'borderRadius':'15px', 'marginRight':'20px'}}/>                                
                              </a>
                            ):
                            (
                              <a href={'https://accounts.spotify.com/authorize/?client_id=84bd052b5f844708861f1c3dc8685633&response_type=code&redirect_uri=https%3A%2F%2Farceaq2a1d.execute-api.us-west-2.amazonaws.com%2Fprod%2Fcallbacks%2Foauth%2Fspotify&state=' + this.state.location_id + '%23' + this.state.email + '&scope=user-read-private%20user-read-email%20user-read-recently-played'}>
                                <RaisedButton className="en_button" disabled={this.state.spotify_button_disable} label="Enable" buttonStyle={{'borderRadius':'15px'}} labelColor="#fff" backgroundColor="#FF5744" style={{'borderRadius':'15px', 'marginRight':'20px'}}/>                                
                              </a>
                            )
                          }
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              {
                this.state.spotify_connection_status ?
                (
                  <div className="survey-block">
                    <h2 className="heading1">Help us better understand your business</h2>
                    <div className="row">
                      <div className="col-xs-6 text-center">
                        <a className="typeform-share button" href="https://nathan372.typeform.com/to/qaejOk" data-mode="drawer_right" data-hide-headers={true} data-hide-footer={true} target="_blank">
                          Describe your business
                        </a>
                      </div>
                      <div className="col-xs-6 text-center">
                        <a className="typeform-share button" href="https://nathan372.typeform.com/to/AlcHsV" data-mode="drawer_right" data-hide-headers={true} data-hide-footer={true} target="_blank">
                          Music Preference
                        </a>
                      </div>
                    </div>
                  </div>
                ):
                (
                  null
                )
              }
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
