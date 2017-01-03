import Auth from '../../services/AuthService';
import {FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import './login.scss';

const CSRF_TOKEN = window.CSRF_TOKEN || '';

export default class LoginPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            password: '',
            email: ''
        };
    }

    login = (e) => {
        e.preventDefault();

        Auth.login(this.state.name, this.state.password, this.state.email, CSRF_TOKEN)
    };

    render() {

        return (
            <div className="row">
                <div className="col-lg-4 col-centered">
                    <h1 className="text-align">Login</h1>
                    <form>
                        <FormGroup controlId="formControlsText">
                            <ControlLabel>Username</ControlLabel>
                            <FormControl
                                type="text"
                                name="name"
                                placeholder="Username"
                                onChange={(e) => this.setState({name: e.target.value})}
                                ref="name"
                            />

                            <ControlLabel>Email</ControlLabel>
                            <FormControl
                                type="text"
                                name="email"
                                placeholder="Email"
                                onChange={(e) => this.setState({email: e.target.value})}
                                defaultValue={this.state.email}
                            />

                            <ControlLabel>Password</ControlLabel>
                            <FormControl
                                type="password"
                                name="password"
                                ref="password"
                                placeholder="Password"
                                onChange={(e) => this.setState({password: e.target.value})}
                                defaultValue={this.state.password}
                            />
                        </FormGroup>
                        <div className="center-align">
                            <Button bsStyle="primary" bsSize="large" active type="button"
                                    onClick={this.login}>
                                Submit
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
