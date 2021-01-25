import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PaymentHandler } from '../actions/signActions'
import CheckoutWizard from '../Components/CheckoutWizard'
import LoadingBox from '../Components/LoadingBox'
import MessageBox from '../Components/MessageBox'


const ShippingScreen = (props) => {
    const [paymentMethod, setPaymentMethod] = useState('Paypal')
    const dispatch = useDispatch()
    console.log(paymentMethod)
    const { signIn, shipping } = useSelector(state => state)

    const { loading, userInfo, error } = signIn
    const { shippingAddress } = shipping
    console.log(shippingAddress)
    console.log(shippingAddress.length)
    if(shippingAddress.length>=0){
        props.history.push('/shipping');

    }
    if (!(userInfo !== undefined ? userInfo.length : 0)) {
            props.history.push('/signin');
    }
        
    useEffect(() => {

    }, [userInfo, props.history])
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(PaymentHandler({paymentMethod}))
        props.history.push('/placeOrder')
    }
    return (
        <>
            <CheckoutWizard step1 step2 step3 />

            <div className='form'>

                <form onSubmit={submitHandler}>
                    <div className=''>
                        <h1>Payment Method</h1>
                        {loading && <LoadingBox></LoadingBox>}
                        {error && <MessageBox variant="danger">{error}</MessageBox>}
                    </div>
                    <div className='paypal'>
                        <input type='radio' checked id='paypal' value='Paypal' onChange={e => setPaymentMethod(e.target.value)} name='payment' />
                        <label htmlFor='paypal'>Paypal</label>

                    </div>
                    <div className='paypal'>
                        <input type='radio' id='stripe' value='Stripe' onChange={e => setPaymentMethod(e.target.value)} name='payment' />
                        <label htmlFor='stripe'>Stripe</label>

                    </div>
                    <div >
                        <button onClick={
                            ()=>{}
                        }
                        type='submit' className='primary fw'>Continue</button>
                    </div>
                </form>
            </div>



        </>
    )
}

export default ShippingScreen
