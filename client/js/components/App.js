var React = require('react');
var connect = require('react-redux').connect;
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

var Header = require('./Header');

var App = function (props) {
    return (
        <MuiThemeProvider>
            <div className="App">
                <nav>
                    <ul>
                        <Header currentUser={props.currentUser} />
                    </ul>
                </nav>
                {props.children}
            </div>
        </MuiThemeProvider>
    );
};

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    };
}

module.exports = connect(mapStateToProps)(App);
