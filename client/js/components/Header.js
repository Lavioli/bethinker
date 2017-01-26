var React = require('react'); 
var Link = require('react-router').Link;

import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/svg-icons/navigation/menu';

module.exports = React.createClass({
    getInitialState: function() {
        return {
            open: false
        }
    },
    handleOpen: function() {
        this.setState({open: true});
    },

    handleClose: function() {
        this.setState({open: false});
    },
    render: function () {
        if (!this.props.currentUser) {
            return <span className="navBar">
            <AppBar
            showMenuIconButton={false} 
            title="Bethinker">
                <IconMenu
                    iconButtonElement={
                        <IconButton
                            id="icon-button"
                        >
                            <Menu/>
                        </IconButton>
                    }
                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                    targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
                    open={this.state.open}
                    onTouchTap={this.handleOpen}
                >   
                    <Link to="/login">
                        <MenuItem 
                            primaryText="Login"
                            onTouchTap={this.handleClose}
                        />
                    </Link>
                    <Link to="/register">
                        <MenuItem 
                            primaryText="Register"
                            onTouchTap={this.handleClose}
                        />
                    </Link>
                </IconMenu>
            </AppBar>
            </span>
        }
        else {
            return <span className="navBar">
            <AppBar 
            showMenuIconButton={false}
            title="Bethinker"
            >
                <IconMenu
                        iconButtonElement={
                            <IconButton  
                                id="icon-button"
                            >
                                <Menu/>
                            </IconButton>
                        }
                        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                        targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
                        open={this.state.open}
                        onTouchTap={this.handleOpen}
                    >   
                    <Link to="/">
                        <MenuItem 
                            primaryText="Home"
                            onTouchTap={this.handleClose}
                        />
                    </Link>
                    <Link to="/stickies">
                        <MenuItem 
                            primaryText="My Stickies"
                            onTouchTap={this.handleClose}
                        />
                    </Link>
                    <Link to="/logout">
                        <MenuItem 
                            primaryText="Logout"
                            onTouchTap={this.handleClose}
                        />
                    </Link>

                </IconMenu>
            </AppBar>
            </span>
        }
    }
});