import React from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

import LeftMenu from './LeftMenu.jsx';

const serverName = "http://localhost:8888";
const cookie = new Cookies();

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            cookieIsSet: false
        }

        this.setStateHandler = this.setStateHandlers.bind(this);
    }

    componentWillMount() {
        if (cookie.get('student') != null || cookie.get('professor') != null) {
            this.setState({cookieIsSet: true});
        }
    }

    setStateHandlers() {
        if (cookie.get('student')) {
            console.log(cookie.get('student').id);
            axios({
                method: 'post',
                url: 'http://localhost:8080/users/disconnect',
                data: {
                    userId: cookie.get('student').id,
                    userType: 1
                }
            })
                .then((res) => {
                    console.log(res);
                    cookie.remove('student', {path: '/'});
                    window.location.href = serverName + '/home';
                })
        }
        if (cookie.get('professor')) {
            cookie.remove('professor', {path: '/'});
            window.location.href = serverName + '/home';
        }
    }

    handleState() {
        if (cookie.get('student') != null || cookie.get('professor') != null) {
            window.location.href = serverName + '/mycourses';
        } else {
            window.location.href = serverName + '/login';
        }
    }

    render() {
        return (
            <div>
                <LeftMenu cookie={cookie} />
                <navbar className="navbar navbar-default navbar-fixed-top">
                    <div className="container">
                        <div className="navbar-collapse collapse">
                            <ul className="nav navbar-nav">
                                <li><a href={serverName + "/home"}>Home</a></li>
                                <li><a href="#" onClick={this.handleState}>MyCourses</a></li>
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                <li><a href={serverName + "/register"}>Register</a></li>
                                <li><a href={serverName + "/login"}>Login</a></li>
                                <li><a href='#' onClick={this.setStateHandlers}>Disconnect</a></li>
                            </ul>
                        </div>
                    </div>
                </navbar>
                {this.props.children}
            </div>
        )
    }
}

export default App;