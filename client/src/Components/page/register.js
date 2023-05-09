import React, { useState, useContext, useEffect} from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import {
	Avatar,
	Button,
	CssBaseline,
	Link,
	Grid,
	Typography,
	Container
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { useToasts } from 'react-toast-notifications';

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
		width: '100%', 
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function Register() {
	
	const history = useHistory();
	const classes = useStyles();
	const { addToast } = useToasts()

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordCheck, setPasswordCheck] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');

	useEffect(() => {
		ValidatorForm.addValidationRule('isPasswordMatch', (value) => {      
			if (value !== password) {
				return false;
			}
			return true;
		});
		return () => {
			ValidatorForm.removeValidationRule('isPasswordMatch');
		}
	}, [password])

	const submit = async (e) => {
		e.preventDefault();

		try {
			const newUser = { email, password, firstName, lastName };
			const respond = await Axios.post("https://maksimkholin-chatgpt-deploy.onrender.com/users/register", newUser);
			addToast("Register successfully!", {
				appearance: 'info',
				autoDismiss: true,
			})
			history.push("/login");
		} catch (err) {
			addToast(err.response.data.msg, {
				appearance: 'error',
				autoDismiss: true,
			})
			// err.response.data.msg && setError(err.response.data.msg);
		}
	}

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
					Sign up
				</Typography>
				<ValidatorForm className={classes.form} noValidate onSubmit={submit}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextValidator
								autoComplete="fname"
								name="firstName"
								variant="outlined"
								required
								fullWidth
								id="firstName"
								label="First Name"
								onChange={(e) => setFirstName(e.target.value)}
								autoFocus
								value={firstName}
								validators={['required']}
								errorMessages={['this field is required']}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextValidator
								variant="outlined"
								required
								fullWidth
								id="lastName"
								label="Last Name"
								name="lastName"
								onChange={(e) => setLastName(e.target.value)}
								autoComplete="lname"
								value={lastName}
								validators={['required']}
								errorMessages={['this field is required']}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextValidator
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								type="email"
								autoComplete="email"
								onChange={(e) => setEmail(e.target.value)}
								value = {email}
								validators={['required', 'isEmail']}
								errorMessages={['this field is required', 'email is not valid']}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextValidator
								variant="outlined"
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
						</Grid>
						<Grid item xs={12}>
							<TextValidator
								variant="outlined"
								required
								fullWidth
								name="confirm"
								label="Password Confirm"
								type="password"
								id="confirm"
								autoComplete="current-confirm"
								onChange={(e) => setPasswordCheck(e.target.value)}
								value = {passwordCheck}
								validators={['isPasswordMatch', 'required']}
								errorMessages={['password mismatch', 'this field is required']}
							/>
						</Grid>
					</Grid>
					<Grid container spacing={2}>
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
								Sign Up
							</Button>
						</Grid>  
					</Grid>					
					<Grid container justify="flex-end">
						<Grid item>
							<Link href="/login" variant="body2">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</ValidatorForm>
			</div>
		</Container>
	);
}
