var React = require('react');
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import TextField from 'material-ui/TextField';


module.exports = React.createClass ({
  submitEditedSticky: function(e) {
    e.preventDefault();
    this.props.editSticky(this.props.sticky._id, this.refs.title.getValue(), this.refs.content.getValue());
    this.handleClose();

  },

  render: function() {
    var actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.props.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.submitEditedSticky}
      />,
    ];

    return (
      <div className="edit_sticky_modal">
        <div className="diaglog-box">
        <Dialog
          title="Title"
          actions={actions}
          modal={false}
          open={this.props.dialogOpen}
          contentStyle={{
            width: '100%',
            maxWidth: '23em'
          }}
          onRequestClose={this.props.handleClose}
        >
          <form onSubmit={this.submitEditedSticky}>
            <TextField
              hintText="Title"
              defaultValue={this.props.sticky.title}
              ref="title"
              style={{display: 'block'}}
            />
            <TextField
              hintText="Message Field"
              floatingLabelText="Content"
              defaultValue={this.props.sticky.content}
              multiLine={true}
              rows={3}
              ref="content"
             />
          </form>
        </Dialog>
        </div>
      </div>
    );
  }
});