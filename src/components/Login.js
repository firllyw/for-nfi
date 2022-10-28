import React, { useState, useEffect } from "react";
import { Button, TextField, withStyles, FormControlLabel, Checkbox } from "@material-ui/core";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../actions/userActions';
import { adminSignin } from "../actions/adminAction";
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
    subWrap: {
        display: 'flex',
        justifyContent: 'space-between',
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

const CustomCheckbox = withStyles({
    root: {
      color: 'white',
      '&$checked': {
        color: 'white',
      },
      '& .MuiSvgIcon-root': {
        width: '30px !important',
        border: 'none',
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);
  
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

export default function Login(props) {
  const { setAuthType, isAdmin } = props;
  const classes = useStyles();
  const [values, setValues] = useState({});
  const [isRemember, setIsRemember] = useState(false);
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { loading, error } = userSignin;
  const [openAlert, setOpenAlert] = useState(false);

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  useEffect(() => {
    if (!loading) {
      if(error) {
        setOpenAlert(true);
      }
    }
  }, [loading, error])

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleChangeChecked = (event) => {
    setIsRemember(!isRemember);
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(isAdmin) {
      dispatch(adminSignin(values), isRemember);
    }
    else {
      dispatch(signin(values), isRemember);
    }
  };

  return (
      <>
        <div className={classes.root}>
          <Snackbar open={openAlert} onClose={handleCloseAlert} autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert onClose={handleCloseAlert} severity="error">
              Invalid email or password
            </Alert>
          </Snackbar>
          <div className={classes.title}>
            {isAdmin ? "Admin Log In" : "Log In"}
          </div>
          <form onSubmit={handleSubmit}>
              <CssTextField id="outlined-basic" label="Username" variant="outlined" type='text' onChange={handleChange("username")} required/>
              <CssTextField id="outlined-basic" label="Password" variant="outlined" type='password' onChange={handleChange("password")} required />            
              <div className={classes.subWrap}>
                  <FormControlLabel
                      control={<CustomCheckbox checked={isRemember} onChange={handleChangeChecked} name="remember" />}
                      label="Remember me"
                  />
                  <Button
                      onClick={() => console.log("Forgot Password")}
                      className={classes.subBtn}
                  >
                      Forgot Password?
                  </Button>
              </div>
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
                    "Log In"}
              </Button>
          </form>        
          <div>
            <Button
                onClick={() => setAuthType("signup")}
                className={classes.subBtn}
            >
                Don't have an account?
            </Button>
          </div>
        </div>
      </>
    
  );
}

Login.propTypes = {
  setAuthType: PropTypes.func
};
