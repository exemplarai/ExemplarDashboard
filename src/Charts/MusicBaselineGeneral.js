import React, { Component } from 'react';
import {Radar} from 'react-chartjs-2';

class MusicBaselineGeneral extends Component {

  render() {
    const options = {
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
};
      return (
        <div className="empty_d clearfix">
          <div className="col-sm-6">
            <Radar data={this.props.general} width={600} height={600} options={options}/>
          </div>
          <div className="col-sm-6">
          </div>
      </div>
      );

      }
}
export default MusicBaselineGeneral;
