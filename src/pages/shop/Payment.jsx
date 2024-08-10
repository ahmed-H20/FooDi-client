import React from 'react'
import {loadStripe} from '@stripe/stripe-js';
import {
    PaymentElement,
    Elements,
    useStripe,
    useElements,
  } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import useCart from '../../hooks/useCart';
const Payment = () => {
  const stripePromise = loadStripe(process.env.STRIPEkEY);
  const [cart] = useCart();
  const getTotalPrice = cart.reduce((sum, item) => sum + item.price,0)
  const totalPrice = parseFloat(getTotalPrice).toFixed(2)
  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 py-28'>
    <Elements stripe={stripePromise} >
      <CheckoutForm price={totalPrice} cart={cart}/>
    </Elements>
    </div>
  )
}

export default Payment
