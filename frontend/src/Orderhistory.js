import React, { useEffect } from 'react';
import './Orderhistory.css'
import { useDispatch, useSelector } from 'react-redux';
import { myOrdersList } from './redux/actions/orderActions';
import Errormsg from './Errormsg'
import Loadingmsg from './Loadingmsg'

export default function Orderhistory(props) {
  const myOrders = useSelector((state) => state.MyOrders);
  const { loading, error, orders } = myOrders;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(myOrdersList());
  }, [dispatch]);
  return (
    <div className="orderhistory">
      <h1>Order History</h1>
      {loading ? (
        <Loadingmsg/>
      ) : error ? (
        <Errormsg variant="danger">{error}</Errormsg>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : 'No'}
                </td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => {
                      history.push(`/order/${order._id}`);
                    }}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}