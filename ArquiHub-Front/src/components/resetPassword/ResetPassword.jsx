import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { resetPass } from "../../redux/slices/auth/loginActions";
import { getUser } from "../../redux/slices/user/userActions";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate;
  const { id, token } = useParams();
  const [errors, setErrors] = useState({initial: ""})
  const [input, setInput] = useState({
    password:"",
    confirmPassword:"",
  })
  const {user} = useSelector(state => state.login)
  let conditionPassword

  if(user){
   conditionPassword = errors.password || user.errPassword
   /* user.success && alert("An email has been sent to " + email + " " + "follow the instructions from there to reset your password") */
  }
  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch]);

  const email = useSelector((state) => state.user.user.email);
 

  const validate = (value = undefined) => {
    let err = {}
    if(value === "password" || errors.password || value === undefined){
        if(!input.password.trim()) err.password = "*Password is required"
        else if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(input.password)) err.password="* Password must contain at least 8 characters, one uppercase, one lowercase and one number"
      }
      /* ----- confirmPassword validate ----- */
      if(value === "confirmPassword" || errors.confirmPassword || value === undefined){
        if(input.confirmPassword !== input.password) err.confirmPassword= "* The password confirmation does not match"
        if(!input.confirmPassword.trim()) err.confirmPassword = "* Confirm password is required"
      }
    return err
  }

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleBlur = (e) => {
    handleInputChange(e)
    setErrors(validate(e.target.name));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate());
    const error = validate();
    if (Object.keys(error).length === 0) {
      dispatch(resetPass(id, token, email, input.password, input.confirmPassword));
/*       navigate("/home"); */
    }
  };

  return (
    <div className="mx-4 md:mx-8 lg:mx-16 xl:mx-32 2xl:mx-64">
      <form
        onSubmit={handleSubmit}
        className="w-full mx-auto flex flex-col gap-3 mt-8 lg:bg-gray-100
        lg:w-3/4 rounded-xl lg:shadow-md lg:p-4 lg:py-8 lg:gap-4
        xl:w-1/2">
        <p className="">Reset password for <span className="font-semibold text-gray-700">{email}</span></p>
        <div>
          <label
            for="password"
            className="block mb-2 text-base font-medium text-gray-900"
          >
            Password{" "}
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className={`bg-gray-100 border-2 border-gray-100 border-b-gray-200 text-gray-900 text-base outline-none focus:outline-none block w-full px-2 pt-2.5 pb-1 focus:border-b-gray-500 ${errors.password && "border-2 focus:border-danger focus:border-b-danger border-danger border-b-danger"}`}
            value={input.password}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
          {conditionPassword && <span className="text-danger text-sm">{conditionPassword}</span>}
        </div>
        <div>
          <label for="password2" className="block mb-2 text-base font-medium text-gray-900">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="••••••••"
            className={`bg-gray-100 border-2 border-gray-100 border-b-gray-200 text-gray-900 text-base outline-none focus:outline-none block w-full px-2 pt-2.5 pb-1 focus:border-b-gray-500 ${errors.confirmPassword && "border-2 focus:border-danger focus:border-b-danger border-danger border-b-danger"}`}
            onChange={handleInputChange}
            value={input.confirmPassword}
            onBlur={handleBlur}
          />
          {errors.confirmPassword && <span className="text-danger text-sm">{errors.confirmPassword}</span>}
        </div>
        <div
          onClick={handleSubmit}
          className={`w-full bg-gray-800 lg:hover:bg-gray-600 transition-all duration-200 ease-in text-center cursor-pointer lg:w-3/4 mx-auto xl:w-1/2`}
        >
          <button className="text-gray-50 text-lg p-1 lg:text-xl lg:p-1.5" type="submit">
            Reset password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
