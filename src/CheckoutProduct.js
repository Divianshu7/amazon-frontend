import React from 'react'
import "./CheckoutProduct.css"
import { useStateValue } from './StateProvider';

function CheckoutProduct({ id, title, image, price, rating, hideButton }) {
    const [state, dispatch] = useStateValue();
    const addToBasket = () => {
        //dispatch item to datalayer
        dispatch({

            type: "ADD_TO_BASKET",
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating,
            },
        });

    };
    const remove = () => {
        dispatch({
            type: "REMOVE_FROM_BASKET",
            item: {
                id: id
            }
        })
    }

    return (
        <div className='checkoutProduct'>
            <img className='checkoutProductImage' src={image}></img>
            <div className='checkoutProductInfo'>
                <p className='checkoutProductTitle'>{title}</p>
                <p className='checkoutProductPrice'>
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className='checkoutProductRating'>
                    {Array(rating).fill().map((_, i) => (
                        <p key={i}>⭐</p>
                    ))}
                </div>
                {!hideButton && (
                    <div className='buttons'>
                        <button onClick={remove} className='removeButton'>-</button>
                        {/* <p>hey</p> */}
                        <button onClick={addToBasket} >+</button>
                    </div>
                )}

            </div>
        </div>
    );
}

export default CheckoutProduct