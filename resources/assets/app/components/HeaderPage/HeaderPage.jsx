import './Header.scss';
import {Link} from 'react-router';
import Auth from '../../services/UserService';

export default class HeaderPage extends React.Component {

    logout = (e) => {
        e.preventDefault();

        Auth.logout()
    };

    _handleMenu() {
        var {user} = this.props;
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="/">Home</a>
                            <a className="navbar-brand" href="/profile/">Profile</a>
                        </div>
                        <ul className="nav navbar-nav active navbar-right">
                            <li><Link to="/settings" onlyActiveOnIndex={true}>Settings</Link></li>
                            <li><Link to="/register" onlyActiveOnIndex={true}>Registration</Link></li>
                            <li><Link to="/login" onlyActiveOnIndex={true}>Login</Link></li>
                            <li><Link to="/logout" onlyActiveOnIndex={true} onClick={this.logout}>Logout</Link></li>
                        </ul>
                    </div>
                </nav>
                { this.props.children }
            </div>
        );
    }
}