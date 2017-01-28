var React = require('react');
var connect = require('react-redux').connect;
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import Delete from 'material-ui/svg-icons/action/delete';

var deleteSticky = require('../../actions/actions').deleteSticky;
var editSticky = require('../../actions/actions').editSticky;
var EditStickyModal = require('./EditStickyModal');
var formatSticky = require('../utils/FormatSticky');

var Sticky = React.createClass({
	getInitialState: function() {
		return {
			highlight: false,
			open: false
		};
	},
	
	changeState: function() {
		this.setState({
			highlight: !this.state.highlight
		});
	},
	
	onClickDelete: function(e) {
		e.preventDefault();
		this.props.deleteSticky(this.props.sticky._id);
	},
	
	handleOpen: function() {
    	this.setState({open: true});
	},

	handleClose: function() {
    	this.setState({open: false});
	},
	formatStickyDynamicHtml: function(text) {
		return {
			__html: text
		};
	},
	
	render: function() {
		// format sticky to be compatible with dynamic html 
		var formattedTitle = formatSticky(this.props.sticky.title);
		var formattedContent = formatSticky(this.props.sticky.content);
		return (
			<div className="edit_sticky_container" onSubmit={this.onEditSticky}>
				<Paper zDepth={3} className="sticky_container">
					<div id="sticky_container">
						<div id="sticky_buttons">
							<IconButton 
					          tooltip="edit"
					          tooltipPosition="bottom-right" 
					          onTouchTap={this.handleOpen}
					        >
				         		<ModeEdit />
				         		<EditStickyModal 
				         			editSticky={this.props.editSticky.bind(this)} 
				         			sticky={this.props.sticky}
				         			dialogOpen={this.state.open}
				         			handleClose={this.handleClose}
				         		/>
				       		</IconButton>
	       					<IconButton 
	       			          tooltip="delete"
	       			          tooltipPosition="bottom-right" 
	       			          onTouchTap={this.onClickDelete}
	       			        >
	       		         		<Delete />
	       		       		</IconButton>
       		       		</div>
						<div 
							className="title" 
							rows="2" 
							cols="49" 
							onFocus="" 
							key="0"
							dangerouslySetInnerHTML={this.formatStickyDynamicHtml(formattedTitle)}
						>
						</div>
						<div 
							className="content"
							rows="5" cols="47" 
							onClick="" 
							key="1" 
							dangerouslySetInnerHTML={this.formatStickyDynamicHtml(formattedContent)}
						>
						</div>
					</div>
				</Paper>
			</div>
		);
	}
});

var mapStateToProps = function(state) {
    return {
        currentUser: state.currentUser,
        stickies: state.stickies

    };
};

var mapDispatchToProps = function(dispatch) {
    return {
        deleteSticky: function(stickyId) {
            dispatch(deleteSticky(stickyId));
        },

        editSticky: function(stickyId, title, content) {
            dispatch(editSticky(stickyId, title, content));
        }
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Sticky);