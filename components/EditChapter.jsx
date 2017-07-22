import React from 'react';
import moment from 'moment';
import axios from 'axios';

const serverName = "http://localhost:8888";

class EditChapter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.chapterId,
            title: '',
            content: '',
            course: ''
        }

        this.submitForm = this.submitForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        axios.get("http://localhost:8080/chapters/" + this.state.id)
            .then(response => {
                const content = response.data.content.replace(/<br \/>/g, "");
                console.log(content);
                this.setState({title: response.data.title, content: content, course: response.data.course.id});
            })
    }

    handleChange(event) {
        const target = event.target;
        const value = event.target.value;
        const name = target.name;

        this.setState({[name]: value});
    }

    submitForm() {
        let data = {
            id: this.state.id,
            title: this.state.title,
            content: this.state.content,
            courseId: this.state.course
        };

        axios.put("http://localhost:8080/chapters/" + this.state.id, data)
            .then(response => {
                console.log(response);
                window.location.href = serverName + "/mycourses/" + this.state.course;
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron">
                    <form encType='application/json'>
                        <div className="form-group row">
                            <label htmlFor="title" className="col-sm-2 col-form-label">Title:</label>
                            <div className="col-sm-8">
                                <input value={this.state.title} type="text" className="form-control" id="title" onChange={this.handleChange} name="title"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="content" className="col-sm-2 col-form-label">Content:</label>
                            <div className="col-sm-8">
                                <textarea value={this.state.content} className="form-control chapter-textarea" id="content" onChange={this.handleChange} name="content"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="offset-sm-2 col-sm-8 submit-form-button-wrapper">
                                <button type="button" className="btn btn-primary btn-block" onClick={this.submitForm}>OK</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default EditChapter;