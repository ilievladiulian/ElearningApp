import React from 'react';
import axios from 'axios';
import moment from 'moment';
import Cookies from 'universal-cookie';

import Chapter from './Chapter.jsx';
import Comments from './Comments.jsx';
import AddComment from './AddComment.jsx';

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
				this.setState({chaptersTitle});
				this.setState({chaptersId});
				this.setState({content});
				this.setState({title});
				this.setState({id});
				axios.get('http://localhost:8080/comments/list_comments/?chapter=' + id)
				.then(res => {
					var commentsDescription = res.data.map(obj => obj.comments.description);
					var commentsDate = res.data.map(obj => obj.comments.created);
					var authors = res.data.map(obj => obj.username);
					var types = res.data.map(obj => obj.type);
					var dates = [];
					for (var i = 0; i < commentsDate.length; i++) {
						var format = 'YYYY/MM/DD HH:mm:ss';
						var date = moment(commentsDate[i]).format(format);
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
				this.setState({id});
      		});
      		axios.get('http://localhost:8080/comments/list_comments/?chapter=' + id)
			.then(res => {
				var commentsDescription = res.data.map(obj => obj.comments.description);
				var commentsDate = res.data.map(obj => obj.comments.created);
				var authors = res.data.map(obj => obj.username);
				var types = res.data.map(obj => obj.type);
				var dates = [];
				for (var i = 0; i < commentsDate.length; i++) {
					var format = 'YYYY/MM/DD HH:mm:ss';
					var date = moment(commentsDate[i]).format(format);
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
		        	<AddComment authorId = {cookie.get('student') != null ? cookie.get('student').id : cookie.get('professor').id} authorType = {cookie.get('student') != null ? 'student' : 'professor'} chapterId = {this.state.id} />
	      		</div>
        	</div>
      	)
      	
   	}
}

export default Course;