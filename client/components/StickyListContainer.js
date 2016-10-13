import React from 'react';
import ReactDOM from 'react-dom';
import {fetchStickies} from '../actions/actions'
import {connect} from 'react-redux';

var StickyListContainer = React.createClass({
    
    
    renderFetchStickiesButton: function (props) {
        var style = { display: "none" }
        if(!this.props.isAuthenticated) {
            return (
                <input type="submit" onClick={this.onClicker} value="My Stickies" style={style}></input>
            )
        } else {
            return (
                <input type="submit" onClick={this.onClicker} value="My Stickies"></input>
            )
        }
    },
    
    onClicker: function (event) {
        event.preventDefault();
        this.props.fetchSticky();
    },
    
    render: function() {
        return (
            <div>
                {this.renderFetchStickiesButton()}
            </div>
        );
    }
});
    
var mapStateToProps = function(state) {
    return {
        isAuthenticated: state.isAuthenticated
    };
};

var mapDispatchToProps = function(dispatch) {
    return{
        fetchSticky: function() {
            dispatch(fetchStickies());
        }
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(StickyListContainer);