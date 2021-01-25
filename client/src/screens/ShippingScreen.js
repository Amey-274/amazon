import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ShippingAddressHandler } from '../actions/signActions'
import CheckoutWizard from '../Components/CheckoutWizard'
import LoadingBox from '../Components/LoadingBox'
import MessageBox from '../Components/MessageBox'


const ShippingScreen = (props) => {

    const dispatch = useDispatch()
    const { signIn, shipping } = useSelector(state => state)

    const { loading, userInfo, error } = signIn
    const { shippingAddress } = shipping

    const [userData, setuserData] = useState({
        fullname: shippingAddress.fullname,
        Address: shippingAddress.Address,
        city: shippingAddress.city,
        PostalCode: shippingAddress.PostalCode,
        country: shippingAddress.country
    })
    console.log(userData)
    useEffect(() => {
        if (!(userInfo !== undefined ? userInfo.length : 0)) {
            props.history.push('/signin');
        }
    }, [userInfo, props.history])
    const submitHandler = (e) => {
        e.preventDefault()
        console.log('shippingScreen')
        dispatch(ShippingAddressHandler(userData))
        props.history.push('/payment')
    }
    return (
        <>
            <CheckoutWizard step1 step2 />

            <div className='form'>

                <form onSubmit={submitHandler}>
                    <div className=''>
                        <h1>Shipping Address</h1>
                        {loading && <LoadingBox></LoadingBox>}
                        {error && <MessageBox variant="danger">{error}</MessageBox>}
                    </div>
                    <div className='emailInput'>
                        <label htmlFor="fullname">Full Name</label>

                        <input type='text' id='fullname' placeholder='Enter your Fullname' value={userData.fullname} onChange={e => setuserData({ ...userData, fullname: e.target.value })} />
                    </div>
                    <div className='emailInput'>
                        <label htmlFor="Address">Address</label>

                        <input type='text' id='Address' placeholder='Enter your  Address' value={userData.Address} onChange={e => setuserData({ ...userData, Address: e.target.value })} />
                    </div>
                    <div className='passwordInput'>
                        <label htmlFor="city">City</label>

                        <input type='text' id='city' placeholder='Enter your city' value={userData.city} onChange={e => setuserData({ ...userData, city: e.target.value })} />
                    </div>
                    <div className='passwordInput'>
                        <label htmlFor="postalCode">PostalCode</label>
                        <input type='text' id='postalCode' placeholder='Enter your Postal Code' value={userData.PostalCode} onChange={e => setuserData({ ...userData, PostalCode: e.target.value })} />
                    </div>
                    <div className='passwordInput'>
                        <label htmlFor="country">Country</label>
                        <input type='text' id='country' placeholder='Enter your Country' value={userData.country} onChange={e => setuserData({ ...userData, country: e.target.value })} />
                    </div>
                    <div className='form-btn'>
                        <button type='submit'
                            onClick={
                                () => {}
                            }
                            className='primary fw' > Continue </button>
                    </div>


                </form>
            </div>



        </>
    )
}

export default ShippingScreen
