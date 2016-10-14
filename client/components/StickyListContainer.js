// import React from 'react';
// import ReactDOM from 'react-dom';
// import {fetchStickies} from '../actions/actions'
// import {connect} from 'react-redux';
// import StickyList from './StickyList';
// import NewSticky from './NewSticky';

// var StickyListContainer = React.createClass({

//     render: function() {
//         var stickyArray = this.props.stickies;
//         return (
//             <div>
//                 <NewSticky />
//                 <StickyList stickyList={stickyArray} />
//             </div>
//         )
            
//     },

// //React life cycle 
//     /*
//         1. componentDidMount- state: takes in most updated stickies from server
//         2. componentWillReceiveProps-fetches in newProps, has fetchSticky as a prop
//         3. componentWillUpdate - nextProps has the stickies 
//                                 nextState is null
//         4. componentDidUpdate - prev props has stickies
//                                 prevState is null
//         5. componentWillReceiveProps
//         6. componentWillUpdate - nextProps has the stickies 
//                                 nextState is null
//         7. renders  <StickyList/>
//         8. componentDidUpdate - prev props has stickies
//                                 prevState is null
//     */

    
//         after it takes in title and content
//         1. componentWillReceiveProps-sticky array is still old
//         2. componentWillUpdate- nextProps - sticky array is still old
//         3. <StickyList> array is still old
//         4. componentDidUpdate - stickies array still old in prevProps
//         5. objectId received 
//         6. componentWillReceiveProps-has new sticky array
//         7. componentWillUpdate - has new sticky array
//         8. <Sticky List> has new stikcy array
//         9. componentDidUpdate- prevProps has OLD array


    


//     componentWillMount: function() {
//         this.props.fetchSticky();
//     },
//     componentDidMount: function() {
//         console.log('componentDidMount');
//         this.props.fetchSticky();
//     },
//     //components
//     componentWillReceiveProps: function (newProps) {
//         console.log('componentWillReceiveProps', newProps);
//     }, 
//    shouldComponentUpdate: function (newProps, newState) {
//        return true;
//   }, 
//     componentWillUpdate: function (nextProps, nextState) {
//         console.log('componentWillUpdate', 'nextProps', nextProps, 'nextState', nextState);
//     }, 
//     componentDidUpdate: function (prevProps, prevState) {
//         console.log('componentDidUpdate', 'prevProps', prevProps, 'prevState', prevState);
//     }, 
//     componentWillUnmount: function () {
//         console.log('componentWillUnmount');
//     }, 
// });
    
// var mapStateToProps = function(state) {
//     return {
//         isAuthenticated: state.isAuthenticated,
//         stickies: state.stickies

//     };
// };

// var mapDispatchToProps = function(dispatch) {
//     return{
//         fetchSticky: function() {
//             dispatch(fetchStickies());
//         }
//     };
// };

// module.exports = connect(mapStateToProps, mapDispatchToProps)(StickyListContainer);