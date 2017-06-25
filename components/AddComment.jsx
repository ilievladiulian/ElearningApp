import React from 'react';
import axios from 'axios';
import moment from 'moment';

import Comments from './Comments.jsx';

class AddComment extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: '',
			comment: [{
				description: '',
				date: '',
				author: '',
				authorType: ''
			}]
		};

		this.setStateHandler = this.setStateHandler.bind(this);
    	this.handleChange = this.handleChange.bind(this);
	}

	setStateHandler() {
		var professorId = -1;
		var studentId = -1;
		var description = this.state.value;
		var chapter = {
			id: this.props.chapterId
		}
		var created = new Date();

		if (this.props.authorType == 'student') {
			studentId = this.props.authorId;
		} else {
			professorId = this.props.authorId;
		}

		axios({
			method: 'post',
			url: 'http://localhost:8080/comments/add_comment',
			data: {
				professorId: professorId,
				studentId: studentId,
				chapter: chapter,
				description: description,
				created: created
			}
		})
		.then(res => {
			var format = 'YYYY/MM/DD HH:mm:ss';
			var date = moment(res.data.comments.created).format(format);
			var com = {
				author: res.data.username,
				authorType: res.data.type,
				description: res.data.comments.description,
				date: date
			}
			var coms = this.state.comment;
			coms.push(com);
			this.setState({value: ''});
			this.setState({comment: coms});
		})
	}

	handleChange(event) {
      	const value = event.target.value;

      	this.setState({value});
   	}

	render() {
		return (
			<div>
				{this.state.comment.map((comment, i) =>
					<Comments key={i} commentsDescription = {comment.description} commentsDate = {comment.date} commentsAuthor = {comment.author} commentsAuthorType = {comment.authorType} />
				)}
				{this.props.authorType == 'student' ? (
					<div className="panel panel-info">
						<div className="panel-heading"></div>
						<div className="panel-body">
							<div className="form-group">
								<textarea value={this.state.value} className="form-control" onChange={this.handleChange} placeholder="Comment..."/>
							</div>
							<button type="button" className="btn btn-block btn-info" onClick={this.setStateHandler}>Reply</button>
						</div>
					</div>
				) : (
					<div className="panel panel-succes">
						<div className="panel-heading"></div>
						<div className="panel-body">
							<div className="form-group">
								<textarea value={this.state.value} className="form-control" onChange={this.handleChange} placeholder="Comment..."/>
							</div>
							<button type="button" className="btn btn-block btn-info" onClick={this.setStateHandler}>Reply</button>
						</div>
					</div>
				)}
			</div>
		)
	}
}

export default AddComment;