import React from 'react';

class Chapter extends React.Component {

    render() {
        return (
            <div>
                <div className="container">
                    <div className="panel panel-success">
                        <div className="panel-heading text-center"><h3>{this.props.title}</h3></div>
                        <div className="panel-body text-justify" dangerouslySetInnerHTML={{__html: this.props.content}}></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Chapter;