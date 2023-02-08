import React from 'react'
import "./product.css"
import { useStateValue } from './StateProvider'

function Product({ id, title, image, price, rating }) {
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
    return (

        <div className='product'>
            <div className='productInfo'>
                <p>{title}</p>
                <p className='productPrice'>
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className='productRating'>
                    {Array(rating).fill().map((_, i) => (
                        <p key={i}>⭐</p>
                    ))}

                </div>
            </div>
            <img src={image} />
            <button onClick={addToBasket}>Add to Basket</button>
        </div>
    )
}

export default Product