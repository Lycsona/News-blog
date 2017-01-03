import {Router, Route} from 'react-router';

import HeaderPage from './components/HeaderPage';
import RegisterPage from './components/RegistrerPage';
import LoginPage from './components/LoginPage';
import LogoutPage from './components/LogoutPage';
import NotFoundPage from './components/NotFoundPage';

class Root extends React.Component {

    render() {
        return (
            <Router history={this.props.history}>
                <Route path='/' component={HeaderPage}>
                <Route path='/register' component={RegisterPage}/>
                <Route path='/login' component={LoginPage}/>
                <Route path='/logout' component={LogoutPage}/>
                <Route path='*' component={NotFoundPage}/>
                </Route>
            </Router>
        );
    }
}

export default Root;