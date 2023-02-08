import React, { useEffect, useState } from 'react'
import { db } from './firebase';
import Order from './Order';
import "./orders.css"
import { useStateValue } from './StateProvider'
function Orders() {
    const [{ basket, user }, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        if (user) {
            //onSnapshot puts everything it into an array snapshot.docs
            db.collection('users').doc(user?.uid).collection('orders').orderBy('created', 'desc').onSnapshot(snapshot => {
                // console.log(snapshot.docs[0].data())
                setOrders(snapshot.docs.map(order => ({
                    id: order.id,
                    data: order.data()
                })))
            })
        }
        else {
            alert('sign in')
        }
    }, [user])

    if (orders != []) {
        console.log(orders[0]?.data.basket)
        return (
            <div className='orders'>
                <h1>Your Orders</h1>
                <div className='ordersContainer'>

                    {orders?.map((order, i) => (
                        <div key={i} ><Order order={order} /></div>
                    ))}
                </div>
            </div>
        )
    }
    else {
        return (<h1>Nothing</h1>)
    }
}

export default Orders