import React from 'react';
import moment from 'moment';
import axios from 'axios';

const serverName = "http://localhost:8888";

class EditCourse extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			id: this.props.match.params.id,
			title: 'aaaaaa',
			description: 'bbbbbb',
			startDate: '',
			endDate: '',
			maxNumberOfDays: 30
		}

		axios.get('http://localhost:8080/courses/' + this.state.id)
		.then((response) => {
			var format = 'YYYY-MM-DD';
			var startDate = moment(response.data.startDate).format(format);
			var endDate = moment(response.data.endDate).format(format);

			this.setState({title: response.data.title, description: response.data.description, startDate, endDate, maxNumberOfDays: response.data.maxNumberOfDays});
		})

		this.handleChange = this.handleChange.bind(this);
		this.setStateHandler = this.setStateHandler.bind(this);
	}

	componentWillMount() {
		var format = 'YYYY-MM-DD';
		var date = moment('2010-01-01').format(format);
		this.setState({startDate: date, endDate: date});
	}

	handleChange(event) {
      	const target = event.target;
      	const value = event.target.value;
      	const name = target.name;

      	this.setState({[name]: value}, function() {
	   		
      	});
   	}

   	setStateHandler() {
   		var data = {
   			id: this.state.id,
   			title: this.state.title,
   			description: this.state.description,
   			startDate: this.state.startDate,
   			endDate: this.state.endDate,
   			maxNumberOfDays: this.state.maxNumberOfDays
   		}

   		axios({
   			method: 'put',
   			url: 'http://localhost:8080/courses/update_course',
   			data: data
   		})
   		.then((response) => {
   			console.log(response.data);
   			window.location.href = serverName + '/mycourses';
   		})
   		.catch((error) => {
   			console.log(error);
   		})
   	}

	render() {
		return (
			<div className="container">
				<div className="jumbotron">
					<form encType='application/json'>
            			<div className="form-group row">
	  						<label htmlFor="title" className="col-sm-2 col-form-label">Title:</label>
	  						<div className="col-sm-5">
	  							<input value={this.state.title} type="text" className="form-control" id="title" onChange={this.handleChange} name="title"/>
	  						</div>
  						</div>
  						<div className="form-group row">
	  						<label htmlFor="desc" className="col-sm-2 col-form-label">Description:</label>
	  						<div className="col-sm-8">
	  							<textarea value={this.state.description} className="form-control course-textarea" id="desc" onChange={this.handleChange} name="description"/>
	  						</div>
  						</div>
  						<div className="form-group row">
	  						<label htmlFor="stDt" className="col-sm-2 col-form-label">Start date:</label>
	  						<div className="col-sm-5">
	  							<input value={this.state.startDate} type="date" className="form-control" id="stDt" onChange={this.handleChange} name="startDate"/>
	  						</div>
  						</div>
  						<div className="form-group row">
	  						<label htmlFor="endDt" className="col-sm-2 col-form-label">End date:</label>
	  						<div className="col-sm-5">
	  							<input value={this.state.endDate} type="date" className="form-control" id="endDt" onChange={this.handleChange} name="endDate"/>
	  						</div>
  						</div>
  						<div className="form-group row">
	  						<label htmlFor="maxD" className="col-sm-2 col-form-label">Maximum period:</label>
	  						<div className="col-sm-5">
	  							<input value={this.state.maxNumberOfDays} type="number" className="form-control" id="maxD" onChange={this.handleChange} name="maxNumberOfDays"/>
	  						</div>
  						</div>
  						<div className="form-group row">
      						<div className="offset-sm-2 col-sm-7">
        						<button type="button" className="btn btn-primary btn-block" onClick={this.setStateHandler}>OK</button>
      						</div>
    					</div>
  					</form>
				</div>
			</div>
		)
	}
}

export default EditCourse;