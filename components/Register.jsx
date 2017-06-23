import React from 'react';
import axios from 'axios';
import { instanceOf } from 'prop-types';
import Cookies from 'universal-cookie';

const serverName = "http://localhost:8888";

class Register extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
			email: '',
			name: '',
			type: ''
		};

    	this.handleChange = this.handleChange.bind(this);
    	this.updateState = this.updateState.bind(this);
    	this.setStateHandler = this.setStateHandler.bind(this);
	}

	handleChange(event) {
      	const target = event.target;
      	const value = event.target.value;
      	const name = target.name;

      	this.setState({[name]: value}, function() {
	   		
      	});
   	}

   	updateState(value) {
   		this.setState({type: value}, function() {

   		});
   	}

   	setStateHandler() {
   		if (this.state.type == 'student') {
   			axios({
	   			method: 'post',
	   			url: 'http://localhost:8080/students/register',
	   			data: {
	   				username: this.state.username,
	   				password: this.state.password,
	   				email: this.state.email
	   			}
	   		})
	   		.then(res => {
	   			if (res.data) {
	   				window.location.href = serverName + '/login';
	   			} else {
	   				window.location.href = window.location.href;
	   			}
	   		});
   		} else {
   			if (this.state.type == 'professor') {
   				axios({
		   			method: 'post',
		   			url: 'http://localhost:8080/professors/register',
		   			data: {
		   				username: this.state.username,
		   				password: this.state.password,
		   				email: this.state.email
		   			}
		   		})
		   		.then(res => {
		   			if (res.data) {
		   				window.location.href = serverName + '/login';
		   			} else {
		   				window.location.href = window.location.href;
		   			}
		   		});
   			}
   		}
   	}

   	render() {
      	return (
         	<div>
	            <div className="container">
	            	<div className="jumbotron">
	            		<form encType='application/json'>
	            			<div className="form-group row">
		  						<label htmlFor="user" className="col-sm-2 col-form-label">Name:</label>
		  						<div className="col-sm-5">
		  							<input type="text" className="form-control" id="user" onChange={this.handleChange} name="name"/>
		  						</div>
	  						</div>
	  						<div className="form-group row">
		  						<label htmlFor="usr" className="col-sm-2 col-form-label">Username:</label>
		  						<div className="col-sm-5">
		  							<input type="text" className="form-control" id="usr" onChange={this.handleChange} name="username"/>
		  						</div>
	  						</div>
	  						<div className="form-group row">
		  						<label htmlFor="pwd" className="col-sm-2 col-form-label">Password:</label>
		  						<div className="col-sm-5">
		  							<input type="password" className="form-control" id="pwd" onChange={this.handleChange} name="password"/>
		  						</div>
	  						</div>
	  						<div className="form-group row">
		  						<label htmlFor="email" className="col-sm-2 col-form-label">Email:</label>
		  						<div className="col-sm-5">
		  							<input type="email" className="form-control" id="email" onChange={this.handleChange} name="email"/>
		  						</div>
	  						</div>
	  						<div className="form-group row">
	  							<div className="col-sm-10">
        							<div className="form-check">
          								<label className="form-check-label">
            							<input className="form-check-input" type="radio" name="type" id="gridRadios1" value="student" onClick={() => this.updateState('student')}/>
            							Student
          								</label>
        							</div>
        							<div className="form-check">
          								<label className="form-check-label">
            							<input className="form-check-input" type="radio" name="type" id="gridRadios2" value="professor" onClick={() => this.updateState('professor')}/>
            							Professor
          								</label>
        							</div>
        						</div>
	  						</div>
	  						<div className="form-group row">
	      						<div className="offset-sm-2 col-sm-10">
	        						<button type="button" className="btn btn-primary" onClick={this.setStateHandler}>Register</button>
	      						</div>
	    					</div>
						</form>
	            	</div>
	            </div>
         	</div>
      	)
   	}
}

export default Register;