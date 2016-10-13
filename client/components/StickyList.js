import React from 'react';
import ReactDOM from 'react-dom';
import {fetchStickies} from '../actions/actions'
import {connect} from 'react-redux';

var StickyList = React.createClass({
    
    onClicker: function (event) {
        event.preventDefault();
        this.props.fetchSticky();
    },
    
    render: function() {
        return (
            <div>
                <input type="submit" onClick={this.onClicker} value="Submit"></input>
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
            dispatch(login('admin','password'));
        }
    };
};

module.exports = connect(null, mapDispatchToProps)(StickyList);