var React = require('react');
var connect = require('react-redux').connect;
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {orange500} from 'material-ui/styles/colors';
import FloatingActionButton from 'material-ui/FloatingActionButton'


var postSticky = require('../../actions/actions').postSticky;

var NewSticky = React.createClass({
    onSubmitAddSticky: function(e) {
        e.preventDefault();
        (this.refs.contentText.getValue().length !== 0) ? this.props.onAddSubmit(this.refs.titleText.getValue(), this.refs.contentText.getValue()) : "";
        e.target.reset(); // clears form values
    },
    
    render: function() {
        var styles = {
            textBoxStyle: {
                width: '40em'
            },
            textBoxUnderlineStyle: {
                borderColor: orange500,
                display: 'block',
                width: '90%'
            },
            cardStyle: {
                display: 'inline-block',
                width: '50em',
                marginTop: '5em'
            }
        }
        return (
            <Card
                style={styles.cardStyle}
            >
                <CardHeader
                  title="Add Sticky"
                  className="card_header"
                  style={styles.cardHeaderStyle}
                />
                <form onSubmit={this.onSubmitAddSticky}>
                    <TextField
                      hintText="Title"
                      ref="titleText"
                      underlineFocusStyle={styles.textBoxUnderlineStyle}
                      style={styles.textBoxStyle}
                    />
                    <TextField
                      hintText="Add a sticky"
                      ref="contentText"
                      underlineFocusStyle={styles.textBoxUnderlineStyle}
                      multiLine={true}
                      rows={2}
                      required={true}
                      style={styles.textBoxStyle}
                    />
                    <CardActions>
                      <RaisedButton 
                        label="Submit"
                        className="sticky_add_submit"
                        type="submit" 
                        onSubmit={this.onSubmitAddSticky}
                        primary={true}
                      />
                    </CardActions>
                </form>
            </Card>

        );
    }
});

function mapDispatchToProps (dispatch) {
    return {
        onAddSubmit: function(title, content) {
            dispatch(postSticky(title, content));
        }
    };
}

module.exports = connect(null, mapDispatchToProps)(NewSticky);
