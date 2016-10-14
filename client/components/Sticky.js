import React from 'react';

module.exports = function (props) {
	return (
		<div className = "container">
			<div className="sticky_container">
				<div className="title">{props.name}</div>
				<div className="content">{props.content}</div>
			</div>
		</div>	
	);
};