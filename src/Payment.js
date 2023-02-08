import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react'
import CurrencyFormat from 'react-currency-format';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import "./Payment.css"
import { getBasketTotal } from './reducer';
import { useStateValue } from './StateProvider'
import axios from "./axios"
import { db } from "./firebase"
function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const stripe = useStripe();
    const elements = useElements();
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false);
    const [clientSecret, setClientSecret] = useState(true);
    const history = useNavigate();
    const handleChange = event => {
        console.log(event)
        setDisabled(event.empty)
        setError(event.error ? event.error.message : "")
        console.log(error)
    }
    useEffect(() => {
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                url: `/payment/create?total=${getBasketTotal(basket) * 100}`
            });
            console.log(response)
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret();

    }, [basket])
    console.log("client secret is >>", clientSecret)
    // console.log('user is > ', user.uid)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setProcessing(true)
        console.log("after tapping submit", elements.getElement(CardElement))
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            //paymentIntent = payment confirmation
            // console.log(data.paymentIntent)
            db.collection('users').doc(user?.uid).collection('orders').doc(paymentIntent.id).set({ basket: basket, amount: paymentIntent.amount, created: paymentIntent.created })
            setSucceeded(true)
            setError(null)
            setProcessing(false)
            dispatch({
                type: 'EMPTY_BASKET'
            })
            history("/orders", { replace: true })
        })
    }
    return (
        <div className='pay'>
            <div className='pageTitle'>
                <h1 className='title'><Link to={"/checkout"} style={{ color: 'black' }} >Checkout({basket.length} items)</Link></h1>

            </div>
            <div className='payment'>
                <div className='paymentContainer'>
                    <div className='first'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='second'>
                        <p>{user?.email}</p>
                        <p>123 React Lane</p>
                        <p>Los Angeles, CA</p>
                    </div>
                </div>
                <hr />
                <div className='paymentContainer'>
                    <div className='first'>
                        <h3>Review items and delivery</h3>

                    </div>
                    <div className='second'>
                        {basket.map((item, i) => (
                            <div key={i} className='cp'>
                                <CheckoutProduct
                                    id={item.id}
                                    title={item.title}
                                    image={item.image}
                                    price={item.price}
                                    rating={item.rating}

                                />
                            </div>
                        ))}
                    </div>
                </div>
                <hr />
                <div className='paymentContainer'>
                    <div className='first'>
                        <h3>Payment Method</h3>
                    </div>
                    <div className='second'>
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className='price'>
                                <CurrencyFormat
                                    value={getBasketTotal(basket)}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={'$'}
                                    renderText={value =>
                                        <div>
                                            <h3>Order Total: {value}</h3>
                                        </div>} />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>
                                        {processing ? <p>processing</p> : <p>Buy Now</p>}
                                    </span>
                                </button>

                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment