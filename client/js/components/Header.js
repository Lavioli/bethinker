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
    handleOpen: function(e) {
        e.preventDefault();
        this.setState({open: true});
    },

    handleClose: function(e) {
        e.preventDefault();
        this.setState({open: false});
    },
    handleOpenCloseToggle: function(e) {
        e.preventDefault();
        this.setState({open: !this.state.open})
    },
    render: function () {
        if (!this.props.currentUser) {
            return <span className="navBar">
                        <AppBar
                        showMenuIconButton={false} 
                        title={
                            <Link 
                              to="/"
                              id="header-link"
                            >
                              <span id="bethinker-heading">Bethinker</span>
                            </Link>
                        }
                        >
                            <IconMenu
                                iconButtonElement={
                                    <IconButton
                                        id="icon-button"
                                        onClick={this.handleOpenCloseToggle}
                                    >
                                        <Menu 
                                            onBlur={this.handleClose}
                                        />
                                    </IconButton>
                                }
                                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                                targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
                                open={this.state.open}
                                onClick={this.handleOpenCloseToggle}
                                onItemTouchTap={this.handleOpenCloseToggle}
                            >   
                                <Link to="/login">
                                    <MenuItem primaryText="Login"/>
                                </Link>
                                <Link to="/register">
                                    <MenuItem primaryText="Register"/>
                                </Link>
                            </IconMenu>
                        </AppBar>
                    </span>
        }
        else {
            return <span className="navBar">
                        <AppBar
                        showMenuIconButton={false} 
                        title={
                            <Link 
                              to="/"
                              id="header-link"
                            >
                              <span id="bethinker-heading">Bethinker</span>
                            </Link>
                        }
                        >
                            <IconMenu
                                iconButtonElement={
                                    <IconButton
                                        id="icon-button"
                                        onClick={this.handleOpenCloseToggle}
                                    >
                                        <Menu 
                                            onBlur={this.handleClose}
                                        />
                                    </IconButton>
                                }
                                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                                targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
                                open={this.state.open}
                                onClick={this.handleOpenCloseToggle}
                                onItemTouchTap={this.handleOpenCloseToggle}
                            >   
                                <Link to="/">
                                    <MenuItem primaryText="Home"/>
                                </Link>
                                <Link to="/stickies">
                                    <MenuItem primaryText="My Stickies"/>
                                </Link>
                                <Link to="/logout">
                                    <MenuItem primaryText="Logout"/>
                                </Link>
                            </IconMenu>
                        </AppBar>
                    </span>
        }
    }
});