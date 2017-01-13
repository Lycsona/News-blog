import UserStore from '../../stores/Store';
import Action from '../../actions/Actions';
import Service from '../../services/UserService';
import {LOGIN_USER} from '../../constants/Constants';
var {List, Map} = require('immutable');

var ProfilePage = React.createClass({

    propTypes: {
        user: React.PropTypes.instanceOf(Map).isRequired,
    },

    getInitialState() {
        return {
            name: null
        }
    },

    /**
     * Fetch plans on mount
     */
    componentWillMount() {
        console.log(UserStore.getModel());
        Service.getUser(this.props.params.id);
        console.log(UserStore.getModel());
    },


    // // Listen for changes
    // componentWillReceiveProps() {
    //     UserStore.addChangeListener(this._onChange);
    // }
    //
    // // Unbind change listener
    // componentWillUnmount() {
    //     UserStore.removeChangeListener(this._onChange);
    // }
    //
    // // Update view state when change event is received
    // _onChange() {
    //     this.setState({
    //         users: UserStore.getUsers()
    //     })
    // }

    render()
    {

        return (
            <div>
                <h1 className="profile-text-align">Your profile. Welcome! </h1>
                <div className="user-profile">
                    <h1> {this.state.name} </h1>
                </div>
            </div>
        );
    }
});

module.exports = ProfilePage;
