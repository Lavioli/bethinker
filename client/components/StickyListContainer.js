import React from 'react';
import ReactDOM from 'react-dom';
import {fetchStickies} from '../actions/actions'
import {connect} from 'react-redux';
import StickyList from './StickyList';
import NewSticky from './NewSticky';

var StickyListContainer = React.createClass({

    render: function() {
        var stickyArray = this.props.stickies;
        return <StickyList stickyList={stickyArray} />
    },

//React life cycle 
    componentWillMount: function() {
        this.props.fetchGetStickies(this.props.currentUser);
    },
    componentDidMount: function() {
        console.log('componentDidMount');
    },
    componentWillReceiveProps: function (newProps) {
        console.log('componentWillReceiveProps');
    }, 
   // shouldComponentUpdate: function (newProps, newState) {
      //  console.log('shouldComponentUpdate');
  // }, 
    componentWillUpdate: function (nextProps, nextState) {
        console.log('componentWillUpdate');
    }, 
    componentDidUpdate: function (prevProps, prevState) {
        console.log('componentDidUpdate');
    }, 
    componentWillUnmount: function () {
        console.log('componentWillUnmount');
    }, 
});
    
var mapStateToProps = function(state) {
    return {
        currentUser: state.currentUser,
        stickies: state.stickies
    };
};

var mapDispatchToProps = function(dispatch) {
    return{
        fetchGetStickies: function(currentUser) {
            dispatch(fetchStickies(currentUser));
        }
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(StickyListContainer);