import React from 'react';
import ReactDOM from 'react-dom';
import {fetchStickies} from '../actions/actions'
import {connect} from 'react-redux';

var StickyListContainer = React.createClass({
    
    renderFetchStickiesButton: function () {
        if(!isAuthenticated) {
            return (
                <input type="submit" onClick={this.onClicker} value="My Stickies"></input>
            )
        } else {
            return (
                <input type="submit" onClick={this.onClicker} value="My Stickies" style="display: none;"></input>
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
    
// let mapStateToProps = function(state) {
//     return{cheeses: state.cheeses};
// };

var mapDispatchToProps = function(dispatch) {
    return{
        fetchSticky: function() {
            dispatch(fetchStickies());
        }
    };
};

module.exports = connect(null, mapDispatchToProps)(StickyListContainer);