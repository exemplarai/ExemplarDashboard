import React, { Component } from 'react';
import {Bar, Radar,Line} from 'react-chartjs-2';
import { Chart } from 'react-google-charts';
import loading from '../Callback/loading.svg';
import {Chart as chartjs} from 'react-chartjs-2';
import RecentTracks from './RecentTracks';
import MusicBaselineGeneral from './MusicBaselineGeneral';
import * as service from '../Services/services';

class Charts extends Component {

  constructor(props){
    super(props);
    this.state={
      coorelations:{
        data:{
          labels: ['Album Popularity', 'Loudness', 'Energy', 'Dancebility', 'Duration', 'Tempo', 'Mode'],
          datasets: [
            {
              label: 'Correlations of Sales and Music Feature',
              backgroundColor: '#FA836F',
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(255,99,132,0.4)',
              hoverBorderColor: 'rgba(255,99,132,1)',
              data: [65, 59, 80, 81, 56, 55, 40]
            }
          ]
      },
    },
    priceCoorelations:{
      data:{
        labels: ['Album Popularity', 'Loudness', 'Energy', 'Dancebility', 'Duration', 'Tempo', 'Mode'],
        datasets: [
          {
            label: 'Correlations of Sales and Music Feature',
            backgroundColor: '#23264F',
            borderWidth: 1,
            data: [65, 59, 80, 81, 56, 55, 40]
          }
        ]
    },
  },
    baselineMorning:{
      data:{
        labels: [],
        datasets: [
          {
            label: 'Morning',
            backgroundColor: 'rgba(253,109,88,0.5)',
            pointBackgroundColor: 'rgba(179,181,198,1)',
            pointBorderColor: '#272A51',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(179,181,198,1)',
            data: []
          }
        ]
    },
  },
  baselineGeneral:{
    data:{
      labels: [],
      datasets: [
        {
          label: 'General',
          backgroundColor: 'rgba(253,109,88,0.5)',
          pointBackgroundColor: 'rgba(179,181,198,1)',
          pointBorderColor: '#272A51',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(179,181,198,1)',
          data: []
        }
      ]
  },
},
  baselineAfternoon:{
    data:{
      labels: [],
      datasets: [
        {
          label: 'Afternoon',
          backgroundColor: 'rgba(253,109,88,0.5)',
          pointBackgroundColor: 'rgba(179,181,198,1)',
          pointBorderColor: '#272A51',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(179,181,198,1)',
          data: []
        }
      ]
  },
},
  baseline:{
    data:{
      labels: [],
      datasets: [
        {
          label: 'Music Baseline',
          backgroundColor: 'rgba(253,109,88,0.5)',
          pointBackgroundColor: 'rgba(179,181,198,1)',
          pointBorderColor: '#272A51',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(179,181,198,1)',
          data: []
        }
      ]
  },
},
  tracksDurationData:[],
  tracksLoudnessData:[],
  tracksTempoData:[],
  payment:{
    data:{
      labels: [],
      datasets: [
        {
          label: 'Average Purchase Value',
          fill: true,
          backgroundColor:'#FA836F',
          data: []
        }
      ]
    }
  },
  averageItemPurchased:{
    data:{
      labels: [],
      datasets: [
        {
          label: 'Average Item Purchased',
          fill: true,
          backgroundColor:'#FA836F',
          data: []
        }
      ]
    }
  },
  averagePricePurchased:{
    data:{
      labels: [],
      datasets: [
        {
          label: 'Average Price Purchased',
          fill: true,
          backgroundColor:'#FA836F',
          data: [],
        }
      ]
    }
  },
      options:{
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            stacked: false,
            beginAtZero: true,
            ticks: {
                stepSize: 1,
                min: 0,
                autoSkip: false
            }
        }]
      }
    },
    paymentOptions:{
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true,
                callback: function(label, index, labels) {
                  return '$'+label;
              }
            },
        }],
        xAxes: [{
          stacked: false,
          beginAtZero: true,
          ticks: {
              stepSize: 1,
              min: 0,
              autoSkip: false
          }
      }]
    }
  },
  coreationOption:{
    scaleLineColor: 'transparent',
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
          barPercentage: 0.4,
          ticks: {
            autoSkip: false,
            maxRotation: 90,
            minRotation: 90,
            fontSize: 20
          },
      }],
      yAxes: [{
        display: false,
        gridLines: {
          color: "rgba(0, 0, 0, 0)",
          display : false,
      }
    }]
  }
  },
  radarOptions:{
    maintainAspectRatio: false,
    scale: {
    pointLabels: {
      fontSize: 20,
  },
      ticks: {
            beginAtZero: true,
            userCallback: function (value, index, values) {
                return '';
            }
        }
    }
      }
    }
  }

  componentDidMount(){
    chartjs.pluginService.register({
                afterDraw: (e) => {
                  if(typeof this.refs.chart !== 'undefined'){
                    let ctx = this.refs.chart.chart_instance.chart.ctx;
                    ctx.font = "15px Arial";
                    ctx.fillStyle = "#2A2D55";
                    ctx.textAlign = "center";
                    ctx.textBaseline = "bottom";
                    this.refs.chart.chart_instance.chart.config.data.datasets.forEach(function (dataset) {
                            const dataArray = dataset.data;
                              dataset._meta[Object.keys(dataset._meta)[0]].data.forEach(function (bar, index) {
                                  ctx.fillText(dataArray[index]+'%', bar._view.x, bar._view.y);
                              });
                    })
                  }

                  if(typeof this.refs.chart1 !== 'undefined'){
                    let ctx1 = this.refs.chart1.chart_instance.chart.ctx;
                    ctx1.font = "15px Arial";
                    ctx1.fillStyle = "#2A2D55";
                    ctx1.textAlign = "center";
                    ctx1.textBaseline = "bottom";

                    this.refs.chart1.chart_instance.chart.config.data.datasets.forEach(function (dataset) {
                            const dataArray = dataset.data;
                              dataset._meta[Object.keys(dataset._meta)[0]].data.forEach(function (bar, index) {
                                  ctx1.fillText(dataArray[index]+'%', bar._view.x, bar._view.y);
                              });
                    })
                  }
                }
            });
  }

  componentWillMount(){
    /* Get Payments API */
        service.getPayments().then((result)=>{
              let labels = [];
              let data = [];
              let averageItemPurchasedData = [];
              let averagePricePurchasedData = [];
              result.data.map((item)=>{
                labels.push(item.day);
                data.push(item.averageSale);
                averageItemPurchasedData.push(item.averageItemsPurchased);
                averagePricePurchasedData.push(item.averageItemPrice);
              })
              var stateCopy = Object.assign({},this.state);
              stateCopy.payment.data['labels'] = labels;
              stateCopy.payment.data.datasets[0]['data'] = data;

              stateCopy.averageItemPurchased.data['labels'] = labels;
              stateCopy.averageItemPurchased.data.datasets[0]['data'] = averageItemPurchasedData;

              stateCopy.averagePricePurchased.data['labels'] = labels;
              stateCopy.averagePricePurchased.data.datasets[0]['data'] = averagePricePurchasedData;
              this.setState({stateCopy})
        }).catch((e)=>{
          console.log('error',e)
        })

     /* Get Feature API */
     service.getFeatures().then((result)=>{
        let dataDuration = result.data.duration;
        let dataLoudness = result.data.loudness;
        let dataTempo = result.data.tempo;
        this.setState({
          tracksDurationData:['duration',dataDuration.min - 5,dataDuration.min,dataDuration.avg,dataDuration.avg + 5],
          tracksTempoData:['tempo',dataTempo.min - 5 ,dataTempo.min,dataTempo.avg,dataTempo.avg + 5],
          tracksLoudnessData:['loudness',dataLoudness.min - 5,dataLoudness.min,dataLoudness.avg,dataLoudness.avg + 5 ]
        });

      }).catch((e)=>{
        console.log('error',e)
      })

      /* Get Spider API */
     service.getMusicBaseline().then((result)=>{
        let labels = [];
        let afternoonValues = [];
        let morningValues = [];
        let generalValues = [];
        let afterNoonData = result.data.afternoon;
        let morningData = result.data.morning;
        let generalData = result.data.general;
        for (var key in afterNoonData) {
          if (afterNoonData.hasOwnProperty(key)) {
              labels.push(key)
              afternoonValues.push(afterNoonData[key].avg);
          }
         }

         for (var key in morningData) {
          if (morningData.hasOwnProperty(key)) {
            morningValues.push(morningData[key].avg);
          }
         }

         for (var key in generalData) {
           if (generalData.hasOwnProperty(key)) {
               generalValues.push(afterNoonData[key].avg);
           }
          }

      var stateCopy = Object.assign({},this.state);
      stateCopy.baselineMorning.data['labels'] = labels;
      stateCopy.baselineMorning.data.datasets[0]['data'] = morningValues;
      stateCopy.baselineAfternoon.data['labels'] = labels;
      stateCopy.baselineAfternoon.data.datasets[0]['data'] = afternoonValues;
      stateCopy.baselineGeneral.data['labels'] = labels;
      stateCopy.baselineGeneral.data.datasets[0]['data'] = generalValues;
      this.setState({stateCopy})
      }).catch((e)=>{
        console.log('error',e)
      })




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
    if(this.state.averageItemPurchased.data.datasets[0]['data'].length > 0){
      return (
        <section className="container-fluid wd">
        <div className="inner_section">
          <RecentTracks/>

        <div className="clearfix"><h3>Correlations of Sales and Music Feature (hourly) <span>:</span></h3></div>
        <div className="empty_d clearfix">
          <Bar ref= "chart" data={this.state.coorelations.data} width={600} height={600} options={this.state.coreationOption}/>
        </div>

        <div className="clearfix"><h3>Average Price Per Unit and Music Feature Correlations (hourly) <span>:</span></h3></div>
        <div className="empty_d clearfix">
          <Bar ref= "chart1" data={this.state.priceCoorelations.data} width={600} height={600} options={this.state.coreationOption}/>
        </div>

        <div className="clearfix"><h3>Music Baseline Analysis (General) <span>:</span></h3></div>

          <MusicBaselineGeneral general={this.state.baselineGeneral.data}/>

        <div className="clearfix"><h3>Music Baseline Analysis (General) <span>:</span></h3></div>
        <div className="empty_d clearfix">
          <div className="col-sm-4">
            {this.state.tracksDurationData.length > 0?<Chart
                              chartType="CandlestickChart"
                              data={[["DAY","val1","val2","val3","val4"],this.state.tracksDurationData]}
                              options={{legend: 'none',
                                  bar: { groupWidth: '100%' },
                                  candlestick: {
                                    fallingColor: { strokeWidth: 0, fill: '#FE826A' },
                                    risingColor: { strokeWidth: 0, fill: '#FE826A' }
                                  }}}
                              width="100%"
                              height="600px"
                            />:''}

          </div>
          <div className="col-sm-4">
          {this.state.tracksLoudnessData.length > 0?<Chart
                              chartType="CandlestickChart"
                              data={[["DAY","val1","val2","val3","val4"],this.state.tracksLoudnessData]}
                              options={{legend: 'none',
                                  bar: { groupWidth: '100%' },
                                  candlestick: {
                                    fallingColor: { strokeWidth: 0, fill: '#FE826A' },
                                    risingColor: { strokeWidth: 0, fill: '#FE826A' }
                                  }}}
                              width="100%"
                              height="600px"
                            />:''}
          </div>
          <div className="col-sm-4">
          {this.state.tracksTempoData.length > 0?<Chart
                              chartType="CandlestickChart"
                              data={[["DAY","val1","val2","val3","val4"],this.state.tracksTempoData]}
                              options={{legend: 'none',
                                  bar: { groupWidth: '100%' },
                                  candlestick: {
                                    fallingColor: { strokeWidth: 0, fill: '#FE826A' },
                                    risingColor: { strokeWidth: 0, fill: '#FE826A' }
                                  }}}
                              width="100%"
                              height="600px"
                            />:''}
          </div>
        </div>

        <div className="clearfix"><h3>Music Baseline Analysis (General) <span>:</span></h3></div>
        <div className="empty_d clearfix">
          <div className="col-sm-6">
            <Radar data={this.state.baselineMorning.data} width={600} height={600} options={this.state.radarOptions}/>
          </div>
          <div className="col-sm-6">
            <Radar data={this.state.baselineAfternoon.data} width={600} height={600} options={this.state.radarOptions}/>
          </div>
        </div>

        <div className="clearfix"><h3>Music Baseline Analysis (General) <span>:</span></h3></div>
        <div className="empty_d clearfix">
          <div className="col-sm-4">
            <Line data={this.state.payment.data}  height={400} options={this.state.paymentOptions}/>
          </div>
          <div className="col-sm-4">
           <Line data={this.state.averageItemPurchased.data} height={400} options={this.state.options}/>
          </div>
          <div className="col-sm-4">
            <Line data={this.state.averagePricePurchased.data}  height={400} options={this.state.paymentOptions}/>
          </div>
        </div>
        </div>
      </section>
      );
    }else {
      return (
        <div style={style}>
          <img src={loading} alt="loading"/>
        </div>
      );
    }

      }


}
export default Charts;
