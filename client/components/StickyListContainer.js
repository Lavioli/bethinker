import React from 'react';
import ReactDOM from 'react-dom';
import {fetchStickies} from '../actions/actions'
import {connect} from 'react-redux';
import StickyList from './StickyList';

var StickyListContainer = React.createClass({
    
    // componentDidMount: function() {
    //     this.props.fetchSticky();
    // },
    componentWillMount: function() {
        this.props.fetchSticky();
    },

    render: function() {
        var stickyArray = this.props.stickies;
        return <StickyList stickyList={stickyArray} />
    }
});
    
var mapStateToProps = function(state) {
    return {
        isAuthenticated: state.isAuthenticated,
        stickies: state.stickies

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