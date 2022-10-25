import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { forgotPass } from '../../redux/slices/auth/loginActions'

 function ForgotPassword (){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [error, setError] = useState({initial: ""})
    const {user} = useSelector(state => state.login)
    let conditionEmail
    if(user){
     conditionEmail = error.email || user.errEmail
     /* user.success && alert("An email has been sent to " + email + " " + "follow the instructions from there to reset your password") */
    }
    const validate = () => {
      let err = {}
      const regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/
      if(!regexEmail.test(email.trim())) err.email = "Invalid email address format"
      if(!email.trim()) err.email = "Email is required"
      return err
    }

    const handleEmailChange=(e)=>{
        setEmail(e.target.value)
    }

    const handleBlur = (e) => {
      handleEmailChange(e)
      setError(validate());
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        setError(validate())
        const err = validate()
        if(Object.keys(err).length === 0){
          setEmail(email)
          dispatch(forgotPass(email))
/*           navigate("/home")  */
        }
    }
  return (
    <div className='mx-4 md:mx-8 lg:mx-16 xl:mx-32 2xl:mx-64'>
      <form onSubmit={handleSubmit} className="w-full mx-auto flex flex-col gap-3 mt-8 lg:bg-gray-100
      lg:w-3/4 rounded-xl lg:shadow-md lg:p-4 lg:py-8 lg:gap-4
      xl:w-1/2
      ">
        <div className='xl:text-lg flex flex-col gap-4'>
          <div className='text-center'>
            <span className='font-semibold'> Forgot your password?</span>
            <span>, insert Your Email to reset</span>
          </div>
          <div>
            <input type="text"
              className={`bg-gray-100 border-2 border-gray-100 border-b-gray-200 text-gray-900 text-base outline-none focus:outline-none block w-full px-2 pt-2.5 pb-1 focus:border-b-gray-500 ${error.email && "border-2 focus:border-danger focus:border-b-danger border-danger border-b-danger"}`}
              placeholder="name@example.com"
              value={email} name='email' onBlur={handleBlur} onChange={handleEmailChange}
            />
            {conditionEmail && <span className="text-danger text-sm">{conditionEmail}</span>}
          </div>
        </div>
        <div onClick={handleSubmit} className={`w-full bg-gray-800 lg:hover:bg-gray-600 transition-all duration-200 ease-in text-center cursor-pointer lg:w-3/4 mx-auto xl:w-1/2`}>
          <button className='text-gray-50 p-1 text-lg lg:text-xl $' type='submit'>Send</button>
        </div>
      </form>
      <div className='text-sm mt-2 w-full mx-auto lg:w-3/4 xl:w-1/2 xl:text-base'>
        <span className=''>Do you want to go home?</span> <span className='text-blue-500 cursor-pointer hover:underline'><NavLink to="/home"> Click here</NavLink></span>
      </div>
    </div>
  )
}


export default ForgotPassword