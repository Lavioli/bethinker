import React from 'react';
import { connect } from 'react-redux';


//working append
var Sticky = function (props) {
	var deleteThis = props.deleteSticky;
	console.log(props)

	return (
		<div className = "container">
			<div className="sticky_container" id={props.stickyId}>
				<div>
					<button type="button" onClick={props.deleteSticky}>Delete</button>
				</div>
				<div className="titles">{props.title}</div>
				<div className="content">{props.content}</div>
			</div>
		</div>	
	);
};

export default connect()(Sticky);