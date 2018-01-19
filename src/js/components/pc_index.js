import React from 'react';
import { BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PCNewsContainer from './pc_newscontainer';
export default class pcIndex extends React.Component{
	render(){
		return(
			<div>
				<PCHeader/>
				<PCNewsContainer/>
				<PCFooter/>
			</div>
		);
	};
}