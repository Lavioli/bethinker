import React from "react";
import Sticky from "./Sticky";

module.exports = React.createClass({
	render: function(props) {
		console.log("this is props", this.props.stickyList)
		var stickyList = this.props.stickyList.map(function(sticky, index){
			return(
				<div className="sticky_list">
					<div className="titles">{sticky.name}</div> 
					<div className="content">{sticky.content}</div>
				</div>
				);
		});
		return (
				<Sticky sticky={stickyList}/>
		);
	}
});

