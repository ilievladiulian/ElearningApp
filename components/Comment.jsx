import React from 'react';
import Cookies from 'universal-cookie';

const serverName = "http://localhost:8888"

class Disconnect extends React.Component {
   	componentWillMount() {
   		const cookie = new Cookies();
      	cookie.remove('student', { path: '/'});
      	window.location.href = serverName + '/home';
   	}

   	render() {
      	return (
         	<div>
         	</div>
      	)
   	}
}

export default Disconnect;