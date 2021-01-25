import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { siginHandler } from '../actions/signActions'
import LoadingBox from '../Components/LoadingBox'
import MessageBox from '../Components/MessageBox'


const RegisterScreen = (props) => {
    const [userData, setuserData] = useState({ email: '', password: '' })
    const redirect = props.history.location.search ? props.history.location.search.split('=')[1] : '/'


    const dispatch = useDispatch()
    const { signIn } = useSelector(state => state)
    const { loading, userInfo, error } = signIn
    console.log(userInfo)
    useEffect(() => {
        if (userInfo !== undefined ? userInfo.length : 0) {
            props.history.push(redirect)
        }


    }, [redirect, userInfo, props.history])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(siginHandler(userData))
    }
    return (
        <div className='form'>

            <form onSubmit={submitHandler}>
                <div className=''>
                    <h1>Sign In</h1>
                    {loading && <LoadingBox></LoadingBox>}
                    {error && <MessageBox variant="danger">{error}</MessageBox>}
                </div>

                <div className='emailInput'>
                    <label htmlFor="email">Email address</label>

                    <input type='email' id='email' placeholder='Enter your  email' value={userData.email} onChange={e => setuserData({ ...userData, email: e.target.value })} />
                </div>
                <div className='passwordInput'>
                    <label htmlFor="password">Password</label>

                    <input type='text' id='password' placeholder='Enter your password' value={userData.password} onChange={e => setuserData({ ...userData, password: e.target.value })} />
                </div>
                <div className='form-btn'>
                    <button type='submit' className='primary fw' > Signin </button>
                </div>

                <div className='new'>
                    <span> New Customer ?</span> <span><Link to='/Register'> Create New Account </Link></span>

                </div>
            </form>
        </div>
    )
}

export default RegisterScreen
