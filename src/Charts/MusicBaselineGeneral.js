import React, { Component } from 'react';
import {Radar} from 'react-chartjs-2';
import DatePicker from 'material-ui/DatePicker';
import moment from 'moment';

class MusicBaselineGeneral extends Component {

  constructor(props){
    super(props)
    const minDate = new Date();
    const maxDate = new Date();

    this.state = {
      minDate: minDate,
      maxDate: maxDate,
      autoOk: true
    };

    this.getBaseline = this.getBaseline.bind(this);
  }

  handleChangeMinDate = (event, date) => {
    let maxDate;
    if(date > this.state.maxDate){
      maxDate = date;
    }else{
      maxDate = this.state.maxDate
    }
      this.setState({
        minDate: date,
        maxDate:maxDate,
      });
      this.getBaseline();
    };

    handleChangeMaxDate = (event, date) => {
      this.setState({
        maxDate: date,
      });
      this.getBaseline();
    };

    getBaseline = () =>{
        let from_date = moment(this.state.minDate).format('YYYY-MM-DD');
        let to_date = moment(this.state.maxDate).format('YYYY-MM-DD');
        this.props.onDateFilter(from_date,to_date)
    }

  render() {

      return (
        <div className="empty_d clearfix">
          <div className="col-lg-1"></div>
          <div className="col-lg-6">
            <Radar data={this.props.general} width={600} height={600} options={this.props.options}/>
          </div>
          <div className="col-lg-5 d_to">
<div className="float-right">
              <DatePicker
                          onChange={this.handleChangeMinDate}
                          autoOk={this.state.autoOk}
                          defaultDate={this.state.minDate}
                          name="from_date"
                          className="div_to d12"
                        />
              <span className="div_to">To</span>
              <DatePicker
                onChange={this.handleChangeMaxDate}
                autoOk={this.state.autoOk}
                value={this.state.maxDate}
                minDate={this.state.minDate}
                name="to_date"
                className="div_to d12"
              />
    <div id="tooltip"></div>
</div>
          </div>
      </div>
      );

      }
}
export default MusicBaselineGeneral;
