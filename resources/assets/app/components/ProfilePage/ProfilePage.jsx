import UserCollectionStore from '../../stores/LoginStore';
import Action from '../../actions/Actions';
import Login from '../../components/LoginPage';
import { LOGIN_USER } from '../../constants/LoginConstants';

export default class ProfilePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = Action.getUser(props.params.id);
        console.log(props.params);
        console.log(this.state);
    }


    shouldComponentUpdate(nextProps, nextState) {

     console.log(nextProps);
     console.log(nextState);
    }

    componentWillMount() {

    }

    render() {

        return (
            <div>
                <h1 className="profile-text-align">Your profile. Welcome! </h1>

            </div>
        );
    }
}