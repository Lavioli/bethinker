var React = require('react');
var loginRequest = require('../../actions/actions').loginRequest;
var connect = require('react-redux').connect;

import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

var Login = React.createClass({
    onSubmit: function (e) {
        e.preventDefault();
        this.props.onAddSubmit(this.refs.usernameText.getValue(), this.refs.passwordText.getValue());
        e.target.reset();
    },
    
    render: function() {
        var styles = {
            cardContainerStyle: {
                display: 'inline-block',
                width: '25em',
                marginTop: '5em'
            },
            textColor: {
                color: 'white',
                margin: '40px 0px'
            },
            containerheight: {
                height: '125px'
            }

        }
        return (
            <div className="Login">
                <Card 
                    style={styles.cardContainerStyle} 
                    className="login-page"
                >
                    <CardHeader
                        title="Login"
                        className="card_header"
                    />
                    <form onSubmit={this.onSubmit}>
                        <TextField 
                            floatingLabelText="Username" 
                            id="username" 
                            ref="usernameText" 
                            required= {true}
                        />
                        <TextField 
                            floatingLabelText="Password" 
                            name="password" 
                            type="password"
                            ref="passwordText" 
                            required= {true}
                        />
                        <CardActions style={styles.containerheight}>
                            <FlatButton 
                                label="Submit"
                                type="submit"
                                backgroundColor="#00BCD4"
                                hoverColor="#00ACC1" 
                                onSubmit={this.onSubmit}
                                style={styles.textColor}
                            />
                        </CardActions>
                   </form>
                </Card>
            </div>
        );
    }
});


function mapDispatchToProps (dispatch) {
    return {
        onAddSubmit: function(username, password) {
            dispatch(loginRequest(username, password));
        }
    };
}

module.exports = connect(null,mapDispatchToProps)(Login);
