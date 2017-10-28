import {BarChart, Bar, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
const React = require('react')
const ReactDOM = require('react-dom')

const data = [
      {name: 'Page A', pv: 2400, amt: 2400},
      {name: 'Page B', pv: 1398, amt: 2210},
      {name: 'Page C', pv: -9800, amt: 2290},
      {name: 'Page D', pv: 3908, amt: 2000},
      {name: 'Page E', pv: 4800, amt: 2181},
      {name: 'Page F', pv: -3800, amt: 2500},
      {name: 'Page G', pv: 4300, amt: 2100},
];
const SimpleBarChart = React.createClass({
  render () {
    return (
      <BarChart width={1000} height={300} data={data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="name" />
       <ReferenceLine y={0} stroke='#000'/>
       <Bar dataKey="pv" fill={this.props.color} />
      </BarChart>
    );
  }
});

export default SimpleBarChart;