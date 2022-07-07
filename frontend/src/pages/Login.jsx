import {useState, useEffect} from 'react'
import {FaSignInAlt} from 'react-icons/fa'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {login, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    // destructure data from formData
    const {email, password} = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // get state from the current state 
    const {user, isLoading, isError, isSuccess, message} = useSelector(state => state.auth)

    useEffect(() => {
        // if there is an error, output an error message 
        if (isError) {
          toast.error(message)
        }
    
        // Redirect when logged in
        if (isSuccess) {
          toast.success("Successfully logged in")
          navigate('/')
    
        }
    
        // reset the state 
        dispatch(reset())
    
      }, [isError, isSuccess, user, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email, password
        }

        dispatch(login(userData))
    }

    // if loading, then show spinner 
    if(isLoading) {
        <Spinner/> 
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt/> Login
                </h1>
                <p>Please login to get support</p>
            </section>

            <section className="form">
                <form onSubmit = {onSubmit}>

                    <div className="form-group">
                        <input type="email" className="form-control" 
                        id='email' name='email' value={email} onChange={onChange}
                        placeholder='Enter your email'
                        required/>
                    </div>

                    <div className="form-group">
                        <input type="password" className="form-control" 
                        id='password' name='password' value={password} onChange={onChange}
                        placeholder='Enter password'
                        required/>
                    </div>

                    <div className="form-group">
                        <button className="btn btn-block">
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login
