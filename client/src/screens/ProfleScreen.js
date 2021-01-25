import React, {  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UpdateHandler } from '../actions/signActions'
import LoadingBox from '../Components/LoadingBox'
import MessageBox from '../Components/MessageBox'


const ProfileScreen = (props) => {
    // const redirect = props.location.search
    // ? props.location.search.split('=')[1]
    // : '/';
    
    const dispatch = useDispatch()
    const { signIn} = useSelector(state => state)
    
    const { loading, userInfo, error } = signIn
    // if (!(userInfo==={}?[]:true)) {
    //     props.history.push(redirect);
    // }  
    console.log(userInfo)
    console.log(!(userInfo===[]?{}:[]))  
    const [userData, setuserData] = useState({ name: '', email: '', password: '', cpassword: '' })
    // useEffect(() => {
    //     if (!(userInfo)) {
    //         props.history.push(redirect);
    //     }
    //     console.log()
    //     console.log(userInfo)
    // }, [userInfo, props.history,redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if (userData.password !== userData.cpassword) {
            alert('Password don"t match')
        } else {
            dispatch(UpdateHandler(userData))

        }
    }
    return (
        <div className='form'>

            <form onSubmit={submitHandler}>
                <div className=''>
                    <h1>Profile Update</h1>
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
                    <button type='submit' className='primary fw' > Update </button>
                </div>

            
            </form>
        </div>
    )
}

export default ProfileScreen
