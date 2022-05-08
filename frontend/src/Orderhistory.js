import React, { useEffect } from 'react';
import './Orderhistory.css'
import { useDispatch, useSelector } from 'react-redux';
import { myOrdersList } from './redux/actions/orderActions';
import Errormsg from './Errormsg'
import Loadingmsg from './Loadingmsg'
import { Link, useHistory } from 'react-router-dom';
import _, { isEmpty } from 'lodash';
import { CgEnter } from 'react-icons/cg';
import { Button } from '@material-ui/core';
import emptybag from './images/emptybag.png'

export default function Orderhistory() {
  const myOrders = useSelector((state) => state.MyOrders);
  const history = useHistory()
  const { loading, error, orders } = myOrders;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(myOrdersList());
  }, [dispatch]);
  return (
    <div className="orderhistory">
      
      {loading ? (
        <Loadingmsg/>
      ) : error ? (
        <Errormsg variant="danger">{error}</Errormsg>
      ) : (
        (!_.isEmpty(orders)) ? (
        <>
        <h3>Order History</h3>
        <table className="resp_table">
          <thead className="resp_table_thead">
            <tr className="resp_table_tr">
              <th className="resp_table_th">ORDER ID</th>
              <th className="resp_table_th">DATE</th>
              <th className="resp_table_th">TOTAL</th>
              <th className="resp_table_th">PAID</th>
              <th className="resp_table_th">DELIVERED</th>
              <th className="resp_table_th">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="resp_table_tbody">
            {orders.map((order) => (
              <tr className="resp_table_tr" key={order._id}>
                <td className="resp_table_td">{order._id}</td>
                <td className="resp_table_td">{order.createdAt.substring(0, 10)}</td>
                <td className="resp_table_td">{order.totalPrice.toFixed(2)}</td>
                <td className="resp_table_td">{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                <td className="resp_table_td">
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : 'No'}
                </td>
                <td className="resp_table_td">
                  <button
                    type="button"
                    className="small pinkButton"
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
        </>
        ):
        (
          <div className="cart__products">
            <div className="cart__quotes">
                
                <img src={emptybag} width="100%" alt="emptycartItems"/>
                <p>No orders yet...</p>
                <p>Go find the product you like</p>
                <Link to='/' className='link'>
                <Button variant="outlined">
                Go back to Shopping.
                </Button>
                </Link>
            </div>
        </div>
        )
      )}
    </div>
  );
}