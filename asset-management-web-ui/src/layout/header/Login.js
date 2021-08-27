import 'react-toastify/dist/ReactToastify.css';

import React, {useState} from 'react';

import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import {makeStyles} from '@material-ui/core/styles';
import {toast} from 'react-toastify';
import {useHistory} from "react-router-dom";

function Copyright() {

    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Rookie Team 4
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

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

export default function SignIn() {
    const classes = useStyles();
    const [values, setValues] = useState({
        username: null,
        password: null
    });
    let history = useHistory();
    const handleOnChange = evt => {
        const name = evt.target.name;
        setValues({
            ...values,
            [name]: evt.target.value
        })
    }


    const rootAPI = process.env.REACT_APP_SERVER_URL;
    const [showLoginSuccess, setShowLoginSuccess] = useState(false);
    const handleSubmit = evt => {
        evt.preventDefault();
        console.log('Values: ', values)
        axios({
                method: "POST",
                url:  rootAPI+"/authenticate",
                data: {
                    username: values.username,
                    password: values.password,
                },
            }
        )
            .then((response) => {
                console.log(response);
                localStorage.clear();
                setShowLoginSuccess(true);
                localStorage.setItem("jwttoken", "Bearer " + response.data.jwttoken);
                localStorage.setItem("username", values.username);
                localStorage.setItem("password", values.password);
                window.location.href = "/home";
                toast.success("Logging success");
            }).catch((error) => {
            console.log(error);
            toast.error("Wrong password or username");
        });
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5" className={"text-center text-danger"}>
                    Welcome to Online Asset Management System
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        variant="filled"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="User Name"
                        name="username"
                        autoComplete="email"
                        autoFocus
                        onChange={handleOnChange}
                    />
                    <TextField
                        variant="filled"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleOnChange}
                    />
                    <>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                        >
                            Login
                        </Button>
                    </>
                </form>
            </div>
            <Box mt={8}>
                <Copyright/>
            </Box>
        </Container>
    );
}