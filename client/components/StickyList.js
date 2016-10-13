import React from "react";
import Sticky from "./Sticky";

module.exports = React.createClass({
	render: function(props) {
		console.log("this is props", this.props.stickyList);
		var stickyList = this.props.stickyList.map(function(sticky, index){
			
			
		return(
			<Sticky name= {sticky.name} content= {sticky.content} />
			)
		});
		return (
			<div className = "sticky_list">
				{stickyList}
			</div>
		);
	}
});


