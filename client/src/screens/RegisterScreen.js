import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RegisterHandler } from '../actions/signActions'
import LoadingBox from '../Components/LoadingBox'
import MessageBox from '../Components/MessageBox'


const RegisterScreen = (props) => {
    const [userData, setuserData] = useState({ name: '', email: '', password: '', cpassword: '' })
    const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';
    const dispatch = useDispatch()
    const { signIn} = useSelector(state => state)
    
    const { loading, userInfo, error } = signIn
    console.log(userInfo)
    
    useEffect(() => {
        if (userInfo !== undefined ? userInfo.length : 0) {
            props.history.push(redirect);
        }
    }, [userInfo, props.history,redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if (userData.password !== userData.cpassword) {
            alert('Password don"t match')
        } else {
            dispatch(RegisterHandler(userData))

        }
    }
    return (
        <div className='form'>

            <form onSubmit={submitHandler}>
                <div className=''>
                    <h1>Create new Account</h1>
                    {loading && <LoadingBox></LoadingBox>}
                    {error && <MessageBox variant="danger">{error}</MessageBox>}
                </div>
                <div className='emailInput'>
                    <label htmlFor="name">Name</label>

                    <input type='text' id='name' placeholder='Enter your name' value={userData.name} onChange={e => setuserData({ ...userData, name: e.target.value })} />
                </div>
                <div className='emailInput'>
                    <label htmlFor="email">Email address</label>

                    <input type='email' id='email' placeholder='Enter your  email' value={userData.email} onChange={e => setuserData({ ...userData, email: e.target.value })} />
                </div>
                <div className='passwordInput'>
                    <label htmlFor="password">Password</label>

                    <input type='text' id='password' placeholder='Enter your password' value={userData.password} onChange={e => setuserData({ ...userData, password: e.target.value })} />
                </div>
                <div className='passwordInput'>
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type='text' id='cpassword' placeholder='Enter your confirm password' value={userData.cpassword} onChange={e => setuserData({ ...userData, cpassword: e.target.value })} />
                </div>
                <div className='form-btn'>
                    <button type='submit' className='primary fw' > Signin </button>
                </div>

                <div className='new'>
                    <span> Already have an account ?</span> <span><Link to='/sigin'> Sign-in </Link></span>

                </div>
            </form>
        </div>
    )
}

export default RegisterScreen
