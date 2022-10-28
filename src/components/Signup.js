import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../actions/userActions';
import { adminRegister } from "../actions/adminAction";
import {Button,TextField, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '../components/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '700px',
        "@media screen and (max-width: 991px)": {
            width: '80%',
        }
    },
    title: {
        color: 'white',
        fontSize: '40px',
        fontWeight: 700,
    },
  submitBtn: {
    width: '100%',
    height: '60px',
    backgroundColor: 'white !important',
    borderRadius: '50px',
    font: 'Mont',
    fontWeight: '800',
    fontSize: '20px',
    color: 'black',
    marginTop: '20px',
    marginBottom: '20px',
    '&:hover': {
        opacity: '0.7',
        backgroundColor: 'white',
    },
    },
    subBtn: {
        textTransform: "initial",
        color: "white"
    }
}));

const CssTextField = withStyles({
    root: {
        marginTop: '20px',
       width: '100%',
      '& label.Mui-focused': {
        color: 'white',
      },
      '& label': {
        color: 'white',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'white',
      },
      '& .MuiOutlinedInput-root': {
           borderRadius: '16px',
        '& input': {
            color: 'white',
          },
        '& fieldset': {
          borderColor: 'white',
          opacity: 0.8,
        },
        '&:hover fieldset': {
          opacity: 1,
          borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'white',
        },
      },
    },
  })(TextField);

export default function Signup(props) {
  const { setAuthType, isAdmin } = props;
  const classes = useStyles();
  const [values, setValues] = useState({});
  const userRegister = useSelector((state) => state.userRegister);
  const dispatch = useDispatch();

  const { loading, error } = userRegister;
  
  const [openAlert, setOpenAlert] = useState(null);

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(null);
  };

  useEffect(() => {
    if (!loading) {
      if(error) {
        setOpenAlert('Sign up failed!');
      }
    }
  }, [loading, error])

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  // const handleClickShowPassword = () => {
  //   setValues({ ...values, showPassword: !values.showPassword });
  // };

  // const handleMouseDownPassword = (event) => {
  //   event.preventDefault();
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!isAdmin) {
      const {ethereum} = window;
      if(!ethereum) {
        setOpenAlert("Make sure you have Metamask installed!");
      }
      const accounts = await ethereum.request({method: 'eth_requestAccounts'});
      if(accounts.length !== 0) {
        const account = accounts[0];
        const payload = {...values, address: account};
        dispatch(register(payload));
      } else {
        setOpenAlert("No authorized account found");
      }  
    }
    else {
      dispatch(adminRegister(values));
    }
  };

  return (
      <>
        <div className={classes.root}>
          <Snackbar open={openAlert ? true : false} onClose={handleCloseAlert} autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert onClose={handleCloseAlert} severity="error">
              {openAlert}
            </Alert>
          </Snackbar>
          <div className={classes.title}>
              {isAdmin ? "Admin Sign Up" : "Sign Up"}
          </div>
          <form onSubmit={handleSubmit}>
              <CssTextField id="outlined-basic" label="Name" variant="outlined" type='text' onChange={handleChange("username")} required/>
              <CssTextField id="outlined-basic" label="Email" variant="outlined" type='email' onChange={handleChange("email")} required/>
              <CssTextField id="outlined-basic" label="Password" variant="outlined" type='password' onChange={handleChange("password")} required/>
              <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submitBtn}
                  disabled={loading}
              >
                {loading ? (
                    <CircularProgress color="inherit" size={30} thickness={5}/>) :
                    "Sign Up"}                    
              </Button>
          </form>
          <div>
            <Button
                onClick={() => setAuthType("login")}
                className={classes.subBtn}
            >
                Already have an account?
            </Button>
          </div>
        </div>
      </>
    
  );
}

Signup.propTypes = {
  setAuthType: PropTypes.func
};
