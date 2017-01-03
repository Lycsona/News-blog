import Auth from '../../services/AuthService'
import {FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import './register.scss';

const CSRF_TOKEN = window.CSRF_TOKEN || '';

export default class RegisterPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            password: '',
            email: '',
            password_confirmation: ''
        };
    }

    register = (e) => {
        e.preventDefault();

        if (this.state.password == this.state.password_confirmation) {
            Auth.register(this.state.name, this.state.password, this.state.email, CSRF_TOKEN)
                .catch(function (err) {
                    alert('There is an error register in');
                    console.log('Error register in', err);
                });
        } else {
            alert('Passwords do not match.');
        }
    };

    render() {

        return (
            <div className="row">
                <div className="col-lg-4 col-centered">
                    <h1 className="text-align">Registration</h1>
                    <form>
                        <FormGroup>
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

                            <ControlLabel>Confirm Password</ControlLabel>
                            <FormControl
                                type="password"
                                name="password_confirmation"
                                ref="password_confirmation"
                                placeholder="Confirm Password"
                                onChange={(e) => this.setState({password_confirmation: e.target.value})}
                                defaultValue={this.state.password_confirmation}
                            />
                        </FormGroup>

                        <div className="center-align">
                            <Button bsStyle="primary" bsSize="large" active type="button" onClick={this.register}>
                                Submit
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
