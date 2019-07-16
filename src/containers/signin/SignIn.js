import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';

import {
    Container,
    CssBaseline,
    Grid,
    Paper,
    Typography,
    Button,
    FormControl,
    InputLabel,
    Input,
    InputAdornment,
} from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import Notification from '../../components/notifications/Notification';

import { isLoading } from '../../redux/actions/rootActions';
import { signIn } from '../../providers/firebaseProvider'
import { errorLoginMessage } from '../../messages';

import './SignIn.scss'


class SignInScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
            user: {
                email: '',
                password: ''
            }
        }
    }

    handleChange(key, value) {
        this.setState(({ user }) => ({
            user: { ...user, ...{ [key]: value } }
        }))
    }

    async getSignIn(e) {
        e.preventDefault()
        const { user } = this.state
        try {
            await signIn(user)
        } catch (e) {
            const { title, message } = errorLoginMessage(e.code)
            Notification('error', title, message)
        }
    }

    render() {
        const { showPassword, user } = this.state
        const { auth } = this.props
        if (auth.uid) return <Redirect to="/" />
        return (
            <Container >
                <CssBaseline />
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    className="signin"
                >
                    <Paper
                        className="paper">
                        <Typography variant="h5" id="tableTitle" className="header">
                            Login
                        </Typography>
                        <form className="form" onSubmit={(e) => this.getSignIn(e)}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Input
                                    id="email"
                                    value={user.email}
                                    required
                                    onChange={(e) => this.handleChange('email', e.target.value)}
                                />
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={user.password}
                                    autoComplete="password"
                                    required
                                    onChange={(e) => this.handleChange('password', e.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton aria-label="Toggle password visibility" onClick={() => this.setState((state) => ({ ...state, showPassword: !showPassword }))}>
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <Typography variant="subtitle2" className="no-register">
                                    Não possui cadastro?
                                <Link to="/cadastrar">
                                    Cadastre-se agora.
                                </Link>
                            </Typography>
                            <div className="button">
                                <Button variant="contained" color="primary" type="submit" style={{ marginLeft: "auto", marginTop: 25 }}>
                                    Entrar
                                </Button>
                            </div>
                        </form>
                    </Paper>

                </Grid>
            </Container>
        )
    }
}


const mapStateToProps = (state) => ({
    is_loading: state.root.is_loading,
    auth: state.firebase.auth
})



export default connect(mapStateToProps, { isLoading })(SignInScreen)