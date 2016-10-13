import React from 'react';
import ReactDOM from 'react-dom';
import { fetchStickies } from '../actions/actions'
import { connect } from 'react-redux';
// import StickyList from './StickyList';
import NewSticky from './NewSticky';
import Sticky from './Sticky';



var StickyList = React.createClass({
    componentWillMount: function() {
        this.props.fetchSticky();
    },
    componentDidMount: function() {
        console.log('componentDidMount');
        this.props.fetchSticky();
    },
    //components
    componentWillReceiveProps: function(newProps) {
        console.log('componentWillReceiveProps', newProps);
    },
    shouldComponentUpdate: function(newProps, newState) {
        return true;
    },
    componentWillUpdate: function(nextProps, nextState) {
        console.log('componentWillUpdate', 'nextProps', nextProps, 'nextState', nextState);
    },
    componentDidUpdate: function(prevProps, prevState) {
        console.log('componentDidUpdate', 'prevProps', prevProps, 'prevState', prevState);
    },
    componentWillUnmount: function() {
        console.log('componentWillUnmount');
    },

    render: function(props) {
        console.log("this is props", this.props.stickies);

            var stickyList = this.props.stickies.map(function(sticky, index) {
            	console.log('THIS IS STICKY', sticky)

                return ( < div >

                    < Sticky title = { sticky.title }
                    content = { sticky.content }
                    /> < /div >
                )
            });
            return ( < div >
                < div > < NewSticky / > < /div> < div className = "sticky_list" > { stickyList } < /div> < /div>
            );
        }
});

var mapStateToProps = function(state) {
    return {
        isAuthenticated: state.isAuthenticated,
        stickies: state.stickies

    };
};

var mapDispatchToProps = function(dispatch) {
    return {
        fetchSticky: function() {
            dispatch(fetchStickies());
        }
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(StickyList);
