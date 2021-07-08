import React, { lazy, Suspense } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import * as ROUTES from './constants/routes';
const Dashboard = lazy(() => import ('./components/dashboard'));
const Login = lazy(() => import ('./components/Login'));
const SignUp = lazy(() => import ('./components/Signup'));
const Profile = lazy(() => import ('./components/profile'));
const NotFound = lazy(() => import ('./components/not-found'));

export default function App() {
    return (
        <Router>
            <Suspense fallback={<p>Loading...</p>}>
                <Switch>
                    <Route path={ROUTES.LOGIN} component={Login} />
                    <Route path={ROUTES.SIGN_UP} component={SignUp} />
                    <Route path={ROUTES.PROFILE} component={Profile} />
                    <Route path={ROUTES.DASHBOARD} component={Dashboard} exact />
                    <Route path={ROUTES.NOT_FOUND} component={NotFound} />
                </Switch>
            </Suspense>
        </Router>
    );
}
