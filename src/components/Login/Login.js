import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const collegeReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 5 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  // const [entercollegeName, setcollegeName] = useState("");
  // const [collegenameIsValid, setcollegenameIsValid] = useState();

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    val: "",
    isValid: null,
  });
  const [collegeState, dispatchCollege] = useReducer(collegeReducer, {
    val: "",
    isValid: null,
  });
  //OBJECT DISTRUCTURING ***use->validation check if user enter >password limit
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;
  const { isValid: collegenameIsValid } = collegeState;

  useEffect(() => {
    setFormIsValid(emailIsValid && passwordIsValid && collegenameIsValid);
  }, [emailIsValid, passwordIsValid, collegenameIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
    // setFormIsValid(
    //   emailState.isValid &&
    //     event.target.value.includes("@") &&
    //     passwordState.isValid,
    //   event.target.value.trim().length > 5
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
    // setFormIsValid(
    //   emailState.isValid &&
    //     event.target.value.trim().length > 6 &&
    //     event.target.value.trim().length > 5
    // );
  };
  const collegeChangeHandler = (event) => {
    dispatchCollege({ type: "USER_INPUT", val: event.target.value });
    // setFormIsValid(
    //   emailState.isValid &&
    //     event.target.value.trim().length > 6 &&
    //     event.target.value.trim().length > 5
    // );
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const ValidetecollegeNameChangeHandler = () => {
    dispatchCollege({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value, collegeState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        {/* //Changing */}
        <div
          className={`${classes.control} ${
            collegeState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="collegename">CollegeName</label>
          <input
            type="text"
            id="collegeName"
            value={collegeState.value}
            onChange={collegeChangeHandler}
            onBlur={ValidetecollegeNameChangeHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
