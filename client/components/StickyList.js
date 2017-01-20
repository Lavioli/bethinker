import React from 'react';
import ReactDOM from 'react-dom';
import { fetchStickies } from '../actions/actions'
import { deleteSticky } from '../actions/actions'
import { editSticky } from '../actions/actions'
import { connect } from 'react-redux';
import NewSticky from './NewSticky';
import Sticky from './Sticky';

var clickToDisplay = false;

var StickyList = React.createClass({
    componentDidMount: function() {
        this.props.fetchStickies(this.props.currentUser);
    },
    render: function(props) {
        //bind allows us to bind the function to this(StickyList) component specifically, so child(Sticky) can easily grab this prop
        var deleteSticky = this.props.deleteSticky.bind(this);
        var editSticky = this.props.editSticky.bind(this);

         var stickyList = this.props.stickies.map(function(sticky, index) {
                return (
	                    <Sticky title={sticky.title}
	                    content={sticky.content}
	                    key={index}
	                    stickyId={sticky._id}
	                    />
                        )
        });
        return (
        	<div>
	        	<div>
	        		<NewSticky />
	        	</div>
	            <div className="sticky_list">
	            	{ stickyList }
	            </div>
	        </div>
        );
    },

});

var mapStateToProps = function(state) {
    return {
        currentUser: state.currentUser,
        stickies: state.stickies
    };
};

var mapDispatchToProps = function(dispatch) {
    return {
        fetchStickies: function(currentUser) {
            dispatch(fetchStickies(currentUser));
        },

        deleteSticky: function(stickyId) {
            dispatch(deleteSticky(stickyId));
        },

        editSticky: function(stickyId, title, content) {
            dispatch(editSticky(stickyId, title, content));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StickyList);
