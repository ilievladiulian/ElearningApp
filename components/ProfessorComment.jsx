import React from 'react';

class ProfessorComment extends React.Component {
	render() {
		return (
			<div>
				{this.props.commentsDescription != '' ? (
				<div className="panel panel-success">
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

export default ProfessorComment;