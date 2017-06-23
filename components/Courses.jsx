import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

const serverName = "http://localhost:8888";
const cookie = new Cookies();

class Courses extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			courses: []
		};

		this.setStateHandler = this.setStateHandler.bind(this);
	}

	componentDidMount() {
		if (cookie.get('student') != null || cookie.get('professor') != null) {
			axios.get('http://localhost:8080/courses/list_courses.json')
				.then(res => {
					const courses = res.data.map(obj => obj);
					for (var i = 0; i < courses.length; i++) {
						var date = new Date(courses[i].startDate);
						var day = date.getDate();
						var month = date.getMonth() + 1;
						var year = date.getFullYear();
						courses[i].startDate = day + '/' + month + '/' + year;
						date = new Date(courses[i].endDate);
						day = date.getDate();
						month = date.getMonth() + 1;
						year = date.getFullYear();
						courses[i].endDate = day + '/' + month + '/' + year;
					}
					this.setState({courses});
				});
		} else {
			window.location.href = serverName + '/login';
		}
	}

	setStateHandler(id) {
		window.location.href = window.location.href + "/" + id;
	}

   render() {
      return (
         	<div>
	         	<div className="container">
	         		<div className="jumbotron">
		            	{this.state.courses.map((course, i) => 
		            		<div role="button" key={course.id} className="panel panel-success" onClick = {() => this.setStateHandler(course.id)}>
		            			<div className="panel-heading">
		            				<h3>{course.title}</h3>
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

export default Courses;