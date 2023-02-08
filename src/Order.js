import React from 'react'
import "./Order.css"
import moment from "moment"
import CheckoutProduct from './CheckoutProduct'
import CurrencyFormat from 'react-currency-format'
function Order({ order }) {
    // console.log(order)
    return (
        <div className='order' >
            <h2>Order</h2>
            <p>{moment.unix(order.data.created).format("MMMM Do YYYY,h:mma")}</p>
            <p className='orderId'>
                <small>{order.id}</small>
            </p>
            {order.data.basket?.map((item, i) => (
                <div key={i}><CheckoutProduct
                    id={item.id}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}
                    title={item.title}
                    hideButton
                /></div>
            ))}
            <CurrencyFormat value={order.data.amount / 100} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <h3>Order Value:{value}</h3>} />
        </div>
    )
}

export default Order