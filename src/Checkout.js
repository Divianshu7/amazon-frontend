import React, { forwardRef } from 'react';
import "./Checkout.css"
import FlipMove from 'react-flip-move';
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider'
import Subtotal from "./Subtotal"
function Checkout() {
    const [{ basket }, dispatch] = useStateValue();

    console.log(CheckoutProduct)
    return (
        <div className="checkout">
            <div className='checkoutLeft'>
                <div>
                    <h2 className='checkoutTitle'>
                        Your Shopping Basket
                    </h2>

                    {basket.map((item, i) => (
                        <div className="cp" key={i}>
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
            <div className='checkoutRight'>
                <Subtotal />
            </div>
        </div>
    )
}

export default Checkout