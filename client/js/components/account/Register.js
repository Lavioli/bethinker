import React from 'react';
import ReactDOM from 'react-dom';
import { registerRequest } from '../../actions/actions';
import { connect } from 'react-redux';
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
                color: 'white'
            }
        }
        return (
            <div className="Register">
                <Card
                    style={styles.cardStyle}
                >
                    <CardHeader
                      title="Register for an account"
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
                        <CardActions>
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

export default connect(null,mapDispatchToProps)(Register);
