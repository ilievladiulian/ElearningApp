import React from 'react';

import StudentComment from './StudentComment.jsx';
import ProfessorComment from './ProfessorComment.jsx';

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

export default Comments;