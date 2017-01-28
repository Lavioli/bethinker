var React = require('react');
var connect = require('react-redux').connect;
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

var NewSticky = require('./NewSticky');
var Sticky = require('./Sticky');
var fetchStickies = require('../../actions/actions').fetchStickies;
var deleteSticky = require('../../actions/actions').deleteSticky;
var editSticky = require('../../actions/actions').editSticky;

// var clickToDisplay = false;

var StickyList = React.createClass({
    componentDidMount: function() {
        this.props.fetchStickies(this.props.currentUser);
    },
    
    render: function(props) {
        //bind allows us to bind the function to this(StickyList) component specifically, so child(Sticky) can easily grab this prop
        // var deleteSticky = this.props.deleteSticky.bind(this);
        // var editSticky = this.props.editSticky.bind(this);
        var stickyList = this.props.stickies.map(
            function(sticky, index) {
                return (
                    <Sticky sticky={sticky}
                    key={index}
                    />
                );
            }
        );
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
    }

});

var mapStateToProps = function(state) {
    return {
        currentUser: state.currentUser,
        stickies: state.stickies
    };
};

import 'babel-polyfill';

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

module.exports = connect(mapStateToProps, mapDispatchToProps)(StickyList);