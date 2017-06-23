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
			commentsAuthorType: []
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
					const commentsDescription = res.data.map(obj => obj.description);
					this.setState({commentsDescription});
					const commentsDate = res.data.map(obj => obj.created);
					this.setState({commentsDate}, function() {
						var dates = [];
						for (var i = 0; i < this.state.commentsDate.length; i++) {
							var date = new Date(this.state.commentsDate[i]).toISOString().slice(0, 10);
							dates.push(date);
						}
						this.setState({commentsDate: dates});
						var commentsAuthorStudent = res.data.map(obj => obj.studentId);
						var commentsAuthorProfessor = res.data.map(obj => obj.professorId);
						var commentsAuthor = [];
						var commentsAuthorType = [];
						for (var i = 0; i < commentsAuthorStudent.length; i++) {
							if (commentsAuthorStudent[i] == -1) {
								commentsAuthor.push(commentsAuthorProfessor[i]);
								commentsAuthorType.push('professor');
							} else {
								commentsAuthor.push(commentsAuthorStudent[i]);
								commentsAuthorType.push('student');
							}
						}
						var commentsAuthorNames = [];
						var commentsTypes = [];
						for (var i = 0; i < commentsAuthorType.length; i++) {
							if (commentsAuthorType[i] == 'student') {
								axios.get('http://localhost:8080/students/' + commentsAuthor[i])
								.then(res => {
									commentsAuthorNames.push(res.data);
									commentsTypes.push('student');
									this.setState({commentsAuthor: commentsAuthorNames});
									this.setState({commentsAuthorType: commentsTypes});
								});
							} else {
								axios.get('http://localhost:8080/professors/' + commentsAuthor[i])
								.then(res => {
									commentsAuthorNames.push(res.data);
									commentsTypes.push('professor');
									this.setState({commentsAuthor: commentsAuthorNames});
									this.setState({commentsAuthorType: commentsTypes});
								});
							}
						}
					});
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
				const commentsDescription = res.data.map(obj => obj.description);
				this.setState({commentsDescription});
				const commentsDate = res.data.map(obj => obj.created);
				this.setState({commentsDate}, function() {
					var dates = [];
					for (var i = 0; i < this.state.commentsDate.length; i++) {
						var date = new Date(this.state.commentsDate[i]).toISOString().slice(0, 10);
						dates.push(date);
					}
					this.setState({commentsDate: dates});
					var commentsAuthorStudent = res.data.map(obj => obj.studentId);
					var commentsAuthorProfessor = res.data.map(obj => obj.professorId);
					var commentsAuthor = [];
					var commentsAuthorType = [];
					for (var i = 0; i < commentsAuthorStudent.length; i++) {
						if (commentsAuthorStudent[i] == -1) {
							commentsAuthor.push(commentsAuthorProfessor[i]);
							commentsAuthorType.push('professor');
						} else {
							commentsAuthor.push(commentsAuthorStudent[i]);
							commentsAuthorType.push('student');
						}
					}
					var commentsAuthorNames = [];
					var commentsTypes = [];
					for (var i = 0; i < commentsAuthorType.length; i++) {
						if (commentsAuthorType[i] == 'student') {
							axios.get('http://localhost:8080/students/' + commentsAuthor[i])
							.then(res => {
								commentsAuthorNames.push(res.data);
								commentsTypes.push('student');
								this.setState({commentsAuthor: commentsAuthorNames});
								this.setState({commentsAuthorType: commentsTypes});
							});
						} else {
							axios.get('http://localhost:8080/professors/' + commentsAuthor[i])
							.then(res => {
								commentsAuthorNames.push(res.data);
								commentsTypes.push('professor');
								this.setState({commentsAuthor: commentsAuthorNames});
								this.setState({commentsAuthorType: commentsTypes});
							});
						}
					}
				});
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
			        <Comments commentsDescription = {this.state.commentsDescription} commentsDate = {this.state.commentsDate} commentsAuthor = {this.state.commentsAuthor} commentsAuthorType = {this.state.commentsAuthorType} />
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

				{this.props.commentsAuthorType.map((type, i) =>
					<div key={i}>
						{type == 'student' ? (
							<StudentComment commentsDescription = {this.props.commentsDescription[i]} commentsDate = {this.props.commentsDate[i]} commentsAuthor = {this.props.commentsAuthor[i]} />
						) : (
							<ProfessorComment commentsDescription = {this.props.commentsDescription[i]} commentsDate = {this.props.commentsDate[i]} commentsAuthor = {this.props.commentsAuthor[i]} />
						)}
					</div>
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