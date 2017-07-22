import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import moment from 'moment';

const serverName = "http://localhost:8888";
const cookie = new Cookies();

class MyCourses extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			courses: []
		};

		this.setStateHandler = this.setStateHandler.bind(this);
		this.editCourse = this.editCourse.bind(this);
		this.deleteCourse = this.deleteCourse.bind(this);
	}

	componentDidMount() {
		if (cookie.get('student') != null) {
			axios.get('http://localhost:8080/participants/list_courses/' + cookie.get('student').id)
			.then(res => {
				const courses = res.data.map(obj => obj);
				for (var i = 0; i < courses.length; i++) {
					var format = 'YYYY/MM/DD';
					courses[i].startDate = moment(courses[i].startDate).format(format);
					courses[i].endDate = moment(courses[i].endDate).format(format);
				}
				this.setState({courses});
			});
		} else {
			if (cookie.get('professor') != null) {
				axios.get('http://localhost:8080/teachers/list_courses/' + cookie.get('professor').id)
				.then(res => {
					const courses = res.data.map(obj => obj);
					for (var i = 0; i < courses.length; i++) {
						var format = 'YYYY/MM/DD';
						courses[i].startDate = moment(courses[i].startDate).format(format);
						courses[i].endDate = moment(courses[i].endDate).format(format);
					}
					this.setState({courses});
				});
			} else {
				window.location.href = serverName + '/login';
			}
		}
	}

	setStateHandler(id) {
		window.location.href = window.location.href + "/" + id;
	}

	editCourse(id) {
		console.log("edit " + id);

		window.location.href = window.location.href + "/edit/" + id;
	}

	deleteCourse(id) {
		console.log("delete " + id);

		axios.delete('http://localhost:8080/courses/', {
			params: {courseId: id}
		})
		.then(res => {
			this.setState({courses: res.data});
		})
	}

   render() {
      return (
         	<div>
	         	<div className="container">
	         		<div className="jumbotron">
		            	{this.state.courses.map((course, i) => 
		            		<div role="button" key={course.id} className="panel panel-success">
		            			<div className="panel-heading">
		            				<h3 className="pull-left" onClick = {() => this.setStateHandler(course.id)}>{course.title}</h3>
		            				{cookie.get('professor') != null ? (
		            				<div className="pull-right btn-toolbar">
		            					<button type="button" className="btn btn-success button-group" onClick = {() => this.editCourse(course.id)}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
		            					<button type="button" className="btn btn-success button-group" onClick = {() => this.deleteCourse(course.id)}><i className="fa fa-trash-o" aria-hidden="true"></i></button>
		            				</div>
		            				) : (
		            					<div></div>
		            				)}
		            				<div className="clear"></div>
		            			</div>
		            			<div className="panel-body">
		            				<div className="text-info">Starts from {course.startDate} and ends at {course.endDate}<br/>
		            				Maximum number of days until the exam: {course.maxNumberOfDays}<br/>
		            				</div><p>{course.description}</p></div>
		            		</div>
		            	)}
			        </div>
	      		</div>
        	</div>
      	)
   	}
}

export default MyCourses;