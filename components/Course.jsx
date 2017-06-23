import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

const serverName = "http://localhost:8888";
const cookie = new Cookies();

class Course extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			chaptersTitle: [],
			chaptersId: [],
			content: '',
			title: '',
			id: '',
			commentsDescription: [],
			commentsDate: [],
			commentsAuthor: [],
			commentsTypes: []
		};

		this.setStateHandler = this.setStateHandler.bind(this);
	}

	componentWillMount() {
		if (cookie.get('student') != null) {
			axios.get('http://localhost:8080/chapters/list_chapters.json?course=' + this.props.match.params.id)
			.then(res => {
				const content = res.data[0].content;
				const title = res.data[0].title;
				const id = res.data[0].id;
				const chaptersTitle = res.data.map(obj => obj.title);
				const chaptersId = res.data.map(obj => obj.id);
				this.setState({chaptersTitle}, function() {
					console.log(this.state.chaptersTitle);
				});
				this.setState({chaptersId}, function() {
					console.log(this.state.chaptersId);
				});
				this.setState({content});
				this.setState({title});
				axios.get('http://localhost:8080/comments/list_comments/?chapter=' + id)
				.then(res => {
					var commentsDescription = res.data.map(obj => obj.comments.description);
					var commentsDate = res.data.map(obj => obj.comments.created);
					var authors = res.data.map(obj => obj.username);
					var types = res.data.map(obj => obj.type);
					var dates = [];
					for (var i = 0; i < commentsDate.length; i++) {
						var date = new Date(commentsDate[i]).toISOString().slice(0, 10);
						dates.push(date);
					}
					this.setState({commentsDescription, commentsDate: dates, commentsAuthor: authors, commentsTypes: types});
				});
			});
			
		} else {
			window.location.href = serverName + '/login';
		}
	}

	setStateHandler(id) {
      	if (cookie.get('student') != null) {
      		axios.get('http://localhost:8080/chapters/' + id)
      		.then(res => {
      			const content = res.data.content;
      			const title = res.data.title;
      			const id = res.data.id;
				this.setState({content});
				this.setState({title});
      		});
      		axios.get('http://localhost:8080/comments/list_comments/?chapter=' + id)
			.then(res => {
				var commentsDescription = res.data.map(obj => obj.comments.description);
				var commentsDate = res.data.map(obj => obj.comments.created);
				var authors = res.data.map(obj => obj.username);
				var types = res.data.map(obj => obj.type);
				var dates = [];
				for (var i = 0; i < commentsDate.length; i++) {
					var date = new Date(commentsDate[i]).toISOString().slice(0, 10);
					dates.push(date);
				}
				this.setState({commentsDescription, commentsDate: dates, commentsAuthor: authors, commentsTypes: types});
			});
      	} else {
      		window.location.href = serverName + '/login';
      	}
   	};

   	render() {
   		
      	return (
         	<div>
	         	<div className="container">
	         		<div className="jumbotron">
	         			<div className="panel panel-success">
	         			<div className="panel-heading">
	         			<navbar className="navbar navbar-default navbar-static-top">
	         				<div className="container">
	         					<div className="navbar-collapse collapse">
				                    <div className="btn-toolbar">
				                     	{this.state.chaptersTitle.map((chapter, i) => 
				                        	<button type="button" className="btn btn-success" key={i} onClick={() => this.setStateHandler(this.state.chaptersId[i])}>{chapter}</button>
				                        )}
				                    </div>
				                </div>
	         				</div>
	         			</navbar>
	         			</div>
	         			</div>
	         			<Chapter content = {this.state.content} title = {this.state.title} />
			        </div>
			        {this.state.commentsAuthor.map((author, i) =>
			        	<Comments key={i} commentsDescription = {this.state.commentsDescription[i]} commentsDate = {this.state.commentsDate[i]} commentsAuthor = {author} commentsAuthorType = {this.state.commentsTypes[i]} />
			        )}
	      		</div>
        	</div>
      	)
      	
   	}
}

class Chapter extends React.Component {

	render() {
		return (
         	<div>
	         	<div className="container">
	         		<div className="panel panel-success">
	         			<div className="panel-heading text-center"><h3>{this.props.title}</h3></div>
	         			<div className="panel-body text-justify">{this.props.content}</div>
	         		</div>
	      		</div>
        	</div>
      	)
    }
}

class Comments extends React.Component {
	
	render() {

		return (
			<div>
				{this.props.commentsAuthorType == 'student' ? (
					<StudentComment commentsDescription = {this.props.commentsDescription} commentsDate = {this.props.commentsDate} commentsAuthor = {this.props.commentsAuthor} />
				) : (
					<ProfessorComment commentsDescription = {this.props.commentsDescription} commentsDate = {this.props.commentsDate} commentsAuthor = {this.props.commentsAuthor} />
				)}
			</div>
		)

	}
}

class StudentComment extends React.Component {
	render() {
		return (
			<div>
				<div className="panel panel-info">
         			<div className="panel-heading">
         				<b>{this.props.commentsAuthor}</b> commented on {this.props.commentsDate}
         			</div>
         			<div className="panel-body text-justify">
         				{this.props.commentsDescription}
         			</div>
         		</div>
			</div>
		)
	}
}

class ProfessorComment extends React.Component {
	render() {
		return (
			<div>
				<div className="panel panel-danger">
         			<div className="panel-heading">
         				<b>{this.props.commentsAuthor}</b> commented on {this.props.commentsDate}
         			</div>
         			<div className="panel-body text-justify">
         				{this.props.commentsDescription}
         			</div>
         		</div>
			</div>
		)
	}
}

export default Course;