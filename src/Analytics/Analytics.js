import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import squareimg from './square-logo-light.png';
import spotifyimg from './spotify.png';
import menu from '../menu.png';
import loading from '../Callback/loading.svg';
import axios from 'axios'
import Sidebar from 'react-sidebar';
import './Analytics.css'
import blog1 from '../images/blog1.png'
import blog2 from '../images/blog2.png'

import logoimg from '../logo.png';

import SimpleBarChart from './BarChart';
import Spider from './Spider';
import SimpleAreaChart from './Area';
import { Chart } from 'react-google-charts';

class Analytics extends Component {

  state ={
    data: [
            100,120,124,125,321
          ]
  };
  
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

        return (
          <div className="container-fluid">          
              <div className="">
                <div className="settings-form-block">
                  <div className="integration-block">
                    <h4 className="h4-title">Recent Tracks :</h4>
                    <div className="recent_track-block clearfix">
                      <div className="block-row">
                        <div className="block-col">
                          <div className="block-inner">
                            <div className="block-img">
                              <img style={{maxWidth:239}} src={blog1} />
                            </div>
                            <div className="block-content">
                              <h6>Bruno Mars - Alone</h6>
                              <p>Now Playing</p>
                              <a href="javascript:void();">  </a>
                            </div>
                          </div>
                        </div>
                        <div className="block-col">
                          <div className="block-inner">
                            <div className="block-img">
                              <img style={{maxWidth:239}} src={blog1} />
                            </div>
                            <div className="block-content">
                              <h6>Bruno Mars - Alone</h6>
                              <p>Now Playing</p>
                              <a href="javascript:void();">  </a>
                            </div>
                          </div>
                        </div>
                        <div className="block-col">
                          <div className="block-inner">
                            <div className="block-img">
                              <img style={{maxWidth:239}} src={blog1} />
                            </div>
                            <div className="block-content">
                              <h6>Bruno Mars - Alone</h6>
                              <p>Now Playing</p>
                              <a href="javascript:void();">  </a>
                            </div>
                          </div>
                        </div>
                        <div className="block-col">
                          <div className="block-inner">
                            <div className="block-img">
                              <img style={{maxWidth:239}} src={blog1} />
                            </div>
                            <div className="block-content">
                              <h6>Bruno Mars - Alone</h6>
                              <p>Now Playing</p>
                              <a href="javascript:void();">  </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>         
                  </div>     
                  <div className="graph_chart-section">
                    <h4 className="h4-title">Correlations of Sales and Music Feature (hourly) :</h4>
                    <div className="box">
                      <h4 className="h4-title text-center">Correlations between music features and sales (N=172)</h4>
                      <hr />
                      <SimpleBarChart color="#FF5F3F"/>
                    </div>
                  </div>
                  <div className="graph_chart-section">
                    <h4 className="h4-title">Average Price Per Unit and Music Feature Correlations (hourly) :</h4>
                    <div className="box">
                      <h4 className="h4-title text-center">Correlations between music features and sales (N=172)</h4>
                      <hr />
                      <SimpleBarChart color="#23264F"/>
                    </div>
                  </div> 
                  <div className="graph_chart-section">
                    <h4 className="h4-title">Music Baseline Analysis (General) :</h4>
                    <div className="box">
                      <Spider color="#FD8069" opacity="1" />
                    </div>
                  </div>  
                  <div className="graph_chart-section clearfix">
                    <div className="graph_chart-row">
                      <div className="graph_chart-col">
                        <div className="graph_chart-inner">
                          <div className="box">
                            <h4 className="h4-title text-center">Track duration (minutes)</h4>
                            <Chart
                              chartType="CandlestickChart"
                              data={[["DAY","val1","val2","val3","val4"],["Mon",20,28,38,45],["Tue",31,38,55,66],["Wed",50,55,77,80],["Thu",77,77,66,50],["Fri",68,66,22,15]]}
                              options={{legend: 'none',
                                  bar: { groupWidth: '100%' },
                                  candlestick: {
                                    fallingColor: { strokeWidth: 0, fill: 'darkorange' }, 
                                    risingColor: { strokeWidth: 0, fill: 'darkorange' } 
                                  }}}
                              width="100%"
                              height="400px"
                              fill="orange"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="graph_chart-col">
                        <div className="graph_chart-inner">
                          <div className="box">
                            <h4 className="h4-title text-center">Loudness (dBs)</h4>
                            <Chart
                              chartType="CandlestickChart"
                              data={[["DAY","val1","val2","val3","val4"],["Mon",20,28,38,45],["Tue",31,38,55,66],["Wed",50,55,77,80],["Thu",77,77,66,50],["Fri",68,66,22,15]]}
                              options={{legend: 'none',
                                  bar: { groupWidth: '100%' },
                                  candlestick: {
                                    fallingColor: { strokeWidth: 0, fill: 'darkorange' }, 
                                    risingColor: { strokeWidth: 0, fill: 'darkorange' } 
                                  }}}
                              width="100%"
                              height="400px"
                              fill="orange"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="graph_chart-col">
                        <div className="graph_chart-inner">
                          <div className="box">
                            <h4 className="h4-title text-center">Tempo (bpm)</h4>
                            <Chart
                              chartType="CandlestickChart"
                              data={[["DAY","val1","val2","val3","val4"],["Mon",20,28,38,45],["Tue",31,38,55,66],["Wed",50,55,77,80],["Thu",77,77,66,50],["Fri",68,66,22,15]]}
                              options={{legend: 'none',
                                  bar: { groupWidth: '100%' },
                                  candlestick: {
                                    fallingColor: { strokeWidth: 0, fill: 'darkorange' }, 
                                    risingColor: { strokeWidth: 0, fill: 'darkorange' } 
                                  }}}
                              width="100%"
                              height="400px"
                              fill="orange"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> 
                  <div className="graph_chart-section two-col clearfix">
                    <h4 className="h4-title">Music Baseline Analysis (General) :</h4>
                    <div className="graph_chart-row">
                      <div className="graph_chart-col">
                        <div className="graph_chart-inner">
                          <div className="box">
                            <Spider color="#23264F" />
                          </div>
                        </div>
                      </div>
                      <div className="graph_chart-col">
                        <div className="graph_chart-inner">
                          <div className="box">
                            <Spider color="#23264F" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> 
                  <div className="graph_chart-section sales-statics clearfix">
                    <h4 className="h4-title">Sales Statistics :</h4>
                    <div className="graph_chart-row">
                      <div className="graph_chart-col">
                        <div className="graph_chart-inner">
                          <div className="box">
                            <h4 className="h4-title">Average Purchase Value</h4>
                            <SimpleAreaChart color="#FF846B"/>
                          </div>
                        </div>
                      </div>
                      <div className="graph_chart-col">
                        <div className="graph_chart-inner">
                          <div className="box">
                            <h4 className="h4-title">Average # of Items Purchased</h4>
                            <SimpleAreaChart color="#FF846B"/>
                          </div>
                        </div>
                      </div>
                      <div className="graph_chart-col">
                        <div className="graph_chart-inner">
                          <div className="box">
                            <h4 className="h4-title">Average Price per Item Purchased</h4>
                            <SimpleAreaChart color="#FF846B"/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>           
                </div>
              </div>
          </div>
        );
      }
  }

export default Analytics;
