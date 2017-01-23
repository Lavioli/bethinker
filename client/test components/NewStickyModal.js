import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import TextField from 'material-ui/TextField';


export default class NewStickyModal extends Component {
    constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.submitNewSticky = this.submitNewSticky.bind(this);
  }

  handleOpen() {
    this.setState({open: true});
  };

  handleClose() {
    this.setState({open: false});
  };
  submitNewSticky(e) {
    e.preventDefault();
    (this.refs.contentText.value.length !== 0) ? this.props.onAddSubmit(this.refs.titleText.value, this.refs.contentText.value) : "";
    this.handleClose();

  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.submitEditedSticky}
      />,
    ];

    return (
      <div className="new-sticky-modal">
        <IconButton tooltip="New Sticky"
      tooltipPosition="bottom-right" onTouchTap={this.handleOpen}>
          <ModeEdit />
        </IconButton>
        <div className="diaglog-box">
        <Dialog
          title="Create New Title"
          actions={actions}
          modal={false}
          open={this.state.open}
          contentStyle={{
            width: '100%',
            maxWidth: '23em'
          }}
          onRequestClose={this.handleClose}
        >
          <form onSubmit={this.submitNewSticky}>
            <TextField
              hintText="Title"
              defaultValue={this.props.sticky.title}
              ref="title"
              style={{display: 'block'}}
            />
            <TextField
              hintText="Message Field"
              floatingLabelText="Create New Content"
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
}