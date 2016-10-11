import React from 'react';
import ReactDOM from 'react-dom';
import {fetchStickies} from '../actions/actions'
import {connect} from 'react-redux';

let StickyList = React.createClass({
    
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

let mapDispatchToProps = function(dispatch) {
    return{
        fetchSticky: function() {
            dispatch(fetchStickies());
        }
    };
};

module.exports = connect(null, mapDispatchToProps)(StickyList);