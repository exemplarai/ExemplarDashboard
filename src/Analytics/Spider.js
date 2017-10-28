import {Radar, RadarChart, PolarGrid, Legend,
         PolarAngleAxis, PolarRadiusAxis} from 'recharts';
const React = require('react')
const ReactDOM = require('react-dom')

const data = [
    { subject: 'Math', A: 120, B: 110, fullMark: 150 },
    { subject: 'Chinese', A: 98, B: 130, fullMark: 150 },
    { subject: 'English', A: 86, B: 130, fullMark: 150 },
    { subject: 'Geography', A: 99, B: 100, fullMark: 150 },
    { subject: 'Physics', A: 85, B: 90, fullMark: 150 },
    { subject: 'History', A: 65, B: 85, fullMark: 150 },
];

const Spider = React.createClass({
	render () {
  	return (
    	<RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis/>
          <Radar name="Mike" dataKey="A" stroke="#8884d8" fill={this.props.color} fillOpacity={0.6}/>
        </RadarChart>
    );
  }
});

export default Spider;