import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux'
import { Redirect, Route, Switch, Link } from 'react-router-dom';

import { Container, Typography, Toolbar, AppBar, IconButton } from '@material-ui/core';
import LogoutIcon from '@material-ui/icons/ExitToApp';


import { isLoading } from '../../redux/actions/rootActions';
import { logOut } from '../../providers/firebaseProvider';
import routes from '../../routes';

import './Dashboard.scss'

class Dashboard extends Component {
    render() {
        const { location, auth, profile } = this.props
        if (!auth.uid) return <Redirect to="/login" />
        return (
            <>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" style={{ flexGrow: 1 }}>
                            Bem-Vindo {profile.name}
                        </Typography>
                        <Link to="/despesas" className={location.pathname === '/despesas' ? "link-toolbar active" : 'link-toolbar'}>
                            Despesas
                        </Link>
                        <Link to="/receitas" className={location.pathname === '/receitas' ? "link-toolbar active" : 'link-toolbar'}>
                            Receitas
                        </Link>
                        <IconButton color="inherit" size="small"
                            className="icon-toolbar"
                            onClick={() => logOut()} aria-label="Logout">
                            <LogoutIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <main>
                    <Container>
                        <Suspense>
                            <Switch>
                                {routes.map((route, id) => (
                                    <Route
                                        key={id}
                                        path={route.path}
                                        exact={route.exact}
                                        name={route.name}
                                        render={props => (
                                            <route.component {...props} />
                                        )} />
                                ))}
                                <Redirect to="/despesas" />
                            </Switch>
                        </Suspense>
                    </Container>
                </main>
            </>
        )
    }
}



const mapStateToProps = (state) => {
    return {
        is_loading: state.root.is_loading,
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch) => ({
    isLoading: (value) => dispatch(isLoading(value)),
})


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
