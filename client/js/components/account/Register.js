var React = require('react');
var connect = require('react-redux').connect;
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

var registerRequest = require('../../actions/actions').registerRequest;
var registerError = require('../../actions/actions').registerError;

var Register = React.createClass({

    onLinkClick: function (e) {
        e.preventDefault();
        var username = this.refs.usernameText.getValue(),
            password = this.refs.passwordText.getValue(),
            reenteredPassword = this.refs.reenterPasswordText.getValue();
        if(username.length < 4) {
            this.props.submitRegisterError('Please enter a username longer than 3 characters.');
            return e.target.reset();
        }
        else if (password.length < 4) {
            this.props.submitRegisterError('Please enter a password longer than 3 characters.');
            return e.target.reset();
        }
        else if (password !== reenteredPassword) {
            this.props.submitRegisterError('Password does not match. Please re-enter your password.');
            return e.target.reset();
        }
        this.props.onRegisterSubmit(username, password);
        e.target.reset();
    },

    render: function() {
        var styles = {
            cardStyle: {
                display: 'inline-block',
                width: '25em',
                marginTop: '5em'
            },
            textColor: {
                color: 'white',
                margin: '40px 0px'
            },
            containerheight: {
                height: '135px'
            }
        };
        return (
            <div className="Register">
                <div>{this.props.registerError}</div>
                <Card
                    style={styles.cardStyle}
                    className="register-page"
                >
                    <CardHeader
                      title="Register for an account"
                      className="card_header"
                    />
                    <form 
                        onSubmit={this.onLinkClick}
                    >
                       <TextField
                          hintText="Type username here"
                          floatingLabelText="Username"
                          ref="usernameText"
                          required={true}
                        />
                       <TextField
                          hintText="Type password here"
                          floatingLabelText="Password"
                          ref="passwordText"
                          type="password"
                          required={true}
                        />
                       <TextField
                          hintText="Re-enter Password"
                          floatingLabelText="Re-enter Password"
                          ref="reenterPasswordText"
                          type="password"
                          required={true}
                        />
                        <CardActions style={styles.containerheight}>
                          <FlatButton 
                            type="submit" 
                            label="submit"
                            onSubmit={this.onLinkClick}
                            backgroundColor="#00BCD4"
                            hoverColor="#00ACC1"
                            style={styles.textColor}
                          />
                        </CardActions>
                    </form>
              </Card>
            </div>
        );
    }
});

var mapStateToProps = function(state) {
    return {
        currentUser: state.currentUser,
        stickies: state.stickies,
        registerError: state.registerError
    };
};

function mapDispatchToProps (dispatch) {
    return {
        onRegisterSubmit: function(username, password) {
            dispatch(registerRequest(username, password));
        },
        submitRegisterError: function(errorMsg) {
            dispatch(registerError(errorMsg));
        }
    };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Register);