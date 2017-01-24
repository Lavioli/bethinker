import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import actions from '../actions/actions';
import App from './App'

import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/svg-icons/navigation/menu';

var Header = function(props) {
    var styles ={
        iconcolor: {
            color:'white'
        }
    }
    if (!props.currentUser) {
        return <span className="navBar">
        <AppBar
        showMenuIconButton={false} 
        title="Bethinker">
            <IconMenu
                iconButtonElement={
                    <IconButton>
                        <Menu style={styles.iconcolor} />
                    </IconButton>
                }
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
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
        title="Bethinker"
        >
            <IconMenu
                    iconButtonElement={
                        <IconButton>
                            <Menu style={styles.iconcolor} />
                        </IconButton>
                    }
                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                >   
                <Link to="/">
                    <MenuItem primaryText="Home"/>
                </Link>
                <Link to="/logout">
                    <MenuItem primaryText="Logout"/>
                </Link>

            </IconMenu>
        </AppBar>
        </span>
    }
}

export default Header;
