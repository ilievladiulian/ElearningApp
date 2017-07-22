/**
 * Created by Vlad on 22/07/2017.
 */

import React from 'react';
import axios from 'axios';

class LeftMenu extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            cookieIsSet: false
        }
    }

    componentWillMount() {
        if (this.props.cookie.get('student') != null || this.props.cookie.get('professor') != null) {
            this.setState({cookieIsSet: true});
        }
    }



    render() {
        return (
            <div>
                {this.state.cookieIsSet === true ? (
                    <div className="container col-sm-2 affix">
                        <div className="jumbotron">

                        </div>
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        )
    }

}

export default LeftMenu;
