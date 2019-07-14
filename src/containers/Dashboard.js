import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch, Link } from 'react-router-dom';

import { Container, Button, Typography, Toolbar, AppBar } from '@material-ui/core';
import routes from '../routes';


class Dashboard extends Component {
    render() {
        const { location } = this.props
        return (
            <>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" style={{ flexGrow: 1 }}>
                            Despesas
                        </Typography>
                        {location.pathname === '/despesas' ?
                            <Link to="/receitas">
                                <Button> Receitas </Button>
                            </Link>
                            :
                            <Link to="/despesas">
                                <Button> Despesas </Button>
                            </Link>
                        }
                    </Toolbar>
                </AppBar>
                <main>
                    <Container>
                        <Suspense>
                            <Switch>
                                {routes.map((route, idx) => {
                                    return route.component ? (
                                        <Route
                                            key={idx}
                                            path={route.path}
                                            exact={route.exact}
                                            name={route.name}
                                            render={props => (
                                                <route.component {...props} />
                                            )} />
                                    ) : (null);
                                })}
                                <Redirect to="/despesas" />
                            </Switch>
                        </Suspense>
                    </Container>
                </main>
            </>
        )
    }
}

export default Dashboard