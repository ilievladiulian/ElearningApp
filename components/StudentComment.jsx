import React from 'react';

class StudentComment extends React.Component {
	render() {
		return (
			<div>
				{this.props.commentsDescription != '' ? (
				<div className="panel panel-info">
         			<div className="panel-heading">
         				<b>{this.props.commentsAuthor}</b> commented on {this.props.commentsDate}
         			</div>
         			<div className="panel-body text-justify">
         				{this.props.commentsDescription}
         			</div>
         		</div>
         		) : (
         			<div></div>
         		)}
			</div>
		)
	}
}

export default StudentComment;