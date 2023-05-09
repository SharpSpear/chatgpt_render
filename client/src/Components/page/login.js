import React, { useState, useContext } from "react";
import { useHistory} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import Axios from "axios";
import {
    Avatar,
    Button,
    CssBaseline,
    FormControlLabel,
    Checkbox,
    Link,
    Grid,
    Typography,
    Container
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { useToasts } from 'react-toast-notifications';
import {login} from "../../actions/register";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Login() {
    
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();
    const { addToast } = useToasts()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        try {
            const loginUser = { email, password };
            const loginRes = await Axios.post(
                "http://localhost:5000/users/login",
                loginUser
            );
            //   setUserData({
            //     token: loginRes.data.token,
            //     user: loginRes.data.user,
            //   });
            dispatch(login(true));
            localStorage.setItem("auth-token", loginRes.data.token);
            const success = "Welcome, " + loginRes.data.user.displayName;
            addToast( success, {
                appearance: 'info',
                autoDismiss: true,
            })
            history.push("/");
        } catch (err) {
            addToast(err.response.data.msg, {
                appearance: 'error',
                autoDismiss: true,
            })
            // err.response.data.msg && setError(err.response.data.msg);
        }
    };

    const backToHome = () => {
        history.push("/");
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <ValidatorForm className={classes.form} noValidate onSubmit={submit}>
                    <TextValidator
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => setEmail(e.target.value)}
                        value = {email}
                        validators={['required', 'isEmail']}
                        errorMessages={['this field is required', 'email is not valid']}
                    />
                    <TextValidator
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                        value = {password}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Grid container spacing={0}>
                        <Grid item xs={4}>
                            <Button
                            color="primary"     
                            variant="contained"
                            className={classes.submit}
                            onClick={backToHome}
                            >
                                Back
                            </Button>
                        </Grid> 
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}>
                            <Button
                                type="submit"            
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                        </Grid>  
                    </Grid>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/register" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </ValidatorForm>
            </div>
        </Container>
    );
}
