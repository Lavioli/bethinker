var React = require('react');
var connect = require('react-redux').connect;
var registerRequest = require('../../actions/actions').registerRequest;
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

var Register = React.createClass({

    onLinkClick: function (e) {
        e.preventDefault();
        this.props.onRegisterSubmit(this.refs.usernameText.getValue(), this.refs.passwordText.getValue());
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
                <Card
                    style={styles.cardStyle}
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


function mapDispatchToProps (dispatch) {
    return {
        onRegisterSubmit: function(username, password) {
            dispatch(registerRequest(username, password));
        }
    };
}

module.exports = connect(null,mapDispatchToProps)(Register);