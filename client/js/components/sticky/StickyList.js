import React from 'react';
import ReactDOM from 'react-dom';
import { fetchStickies } from '../../actions/actions'
import { deleteSticky } from '../../actions/actions'
import { editSticky } from '../../actions/actions'
import { connect } from 'react-redux';
import NewSticky from './NewSticky';
import Sticky from './Sticky';

//google material UI theme provider 
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
                    <Sticky sticky={sticky}
                    key={index}
                    />
                )
        });
        return (
            <MuiThemeProvider>
            	<div>
    	        	<div id="new-sticky-wrapper">
    	        		<NewSticky />
    	        	</div>
    	            <div className="sticky_list">
    	            	{ stickyList }
    	            </div>
    	        </div>
            </MuiThemeProvider>
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
