import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/slices/auth/loginActions";
import { showSigIn, showSignUp } from "../../redux/slices/header/headerSlice";
import { validate } from "./validate";

export const useSignUp = (err) => {
  const { modalSignIn, modalSignUp } = useSelector((state) => state.header);
  const [input, setInput] = useState({
    name: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({ initial: "" });
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.login);
  let token = false;

  const toggleSignIn = (e) => {
    e.preventDefault();
    dispatch(showSignUp(!modalSignUp));
    dispatch(showSigIn(!modalSignIn));
  };

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const hanldeBlur = (e) => {
    handleInputChange(e);
    setErrors(validate(input, e.target.name, errors));
  };

  const handleInputSubmit = (e) => {
    const { name, lastName, userName, email, password, confirmPassword } =
      input;
    e.preventDefault();
    setErrors(validate(input));
    const error = validate(input);
    if (Object.keys(error).length === 0) {
      e.preventDefault();
      dispatch(registerUser(name, lastName, userName, email, password, confirmPassword));
    }
  }

  if (user) {
    token = user.token;
  }
  if (token) window.location.reload();

  return {
    input,
    errors,
    handleInputChange,
    hanldeBlur,
    toggleSignIn,
    handleInputSubmit,
  };
};
