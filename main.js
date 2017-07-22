import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, IndexRoute, Switch} from 'react-router-dom';

import App from './components/App.jsx';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Contact from './components/Contact.jsx';
import MyCourses from './components/MyCourses.jsx';
import Course from './components/Course.jsx';
import Register from './components/Register.jsx';
import EditCourse from './components/EditCourse.jsx';


ReactDOM.render((
    <BrowserRouter>
        <App>
            <Switch>
                <Route path="/home" component={Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/contact" component={Contact}/>
                <Route path="/register" component={Register}/>
                <Switch>
                    <Route exact path="/mycourses" component={MyCourses}/>
                    <Route path="/mycourses/edit/:id" component={EditCourse}/>
                    <Route path="/mycourses/:id" component={Course}/>
                </Switch>
            </Switch>
        </App>
    </BrowserRouter>
), document.getElementById('app'));