import React from 'react'

const CheckoutWizard = (props) => {
    
    return (
        <div className='checkout-steps'>
            <div className={props.step1?'active':'off'}>SignIn</div>
            <div className={props.step2?'active':'off'}>Shipping</div>
            <div className={props.step3?'active':'off'}>Payment</div>
            <div className={props.step4?'active':'off'}>PlaceOrder</div>  
        </div>
    )
}

export default CheckoutWizard
