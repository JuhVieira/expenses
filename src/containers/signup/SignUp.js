import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom';

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

import { isLoading } from '../../redux/actions/rootActions';
import { signUp } from '../../providers/firebaseProvider';
import { errorLoginMessage } from '../../messages';
import Notification from '../../components/notifications/Notification';

import './SignUp.scss';

class SignInScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showPassword: false,
            user: {
                name: '',
                email: '',
                password: ''
            }
        }
    }

    handleChange(key, value) {
        this.setState(({ user }) => ({
            user: {
                ...user, ...{ [key]: value }
            }
        }))
    }

    async getSignUp(e) {
        e.preventDefault()
        const { user } = this.state
        try {
            await signUp(user)
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
                        <Typography variant="h5" id="paperTitle" className="header">
                            Cadastrar
                        </Typography>
                        <form className="form" onSubmit={(e) => this.getSignUp(e)}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="name">Nome</InputLabel>
                                <Input
                                    id="name"
                                    value={user.name}
                                    required
                                    onChange={(e) => this.handleChange('name', e.target.value)}
                                />
                            </FormControl>
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
                                <InputLabel htmlFor="adornment-password">Senha</InputLabel>
                                <Input
                                    id="adornment-password"
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
                            <Typography variant="subtitle1" className="has-register">
                                Já possui cadastro? 
                                <Link to="/login">
                                    Faça Login
                                </Link>
                            </Typography>
                            <div className="button">
                                <Button variant="contained" color="primary" type="submit" style={{ marginLeft: "auto", marginTop: 25 }}>
                                    Cadastrar
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