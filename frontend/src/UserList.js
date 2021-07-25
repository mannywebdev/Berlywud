import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, listUsers } from './redux/actions/userActions';
import Errormsg from './Errormsg'
import Loadingmsg from './Loadingmsg'
import { useHistory } from 'react-router-dom';

export default function UserList() {
  const userList = useSelector((state) => state.UserList);
  const { loading, error, users } = userList;
  const userDelete = useSelector((state) => state.UserDelete);
  const {loading: loadingDelete,error: errorDelete,success: successDelete,} = userDelete;
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch,successDelete]);
  const deleteHandler = (user) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(user._id));
    }
  };
  return (
    <div className="orderlist">
      <h1>Users</h1>
      {loadingDelete && <Loadingmsg/>}
      {errorDelete && <Errormsg variant="danger">{errorDelete}</Errormsg>}
      {successDelete && (
        <Errormsg variant="success">User Deleted Successfully</Errormsg>
      )}
      {loading ? (
        <Loadingmsg/>
      ) : error ? (
        <Errormsg variant="danger">{error}</Errormsg>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>IS ADMIN</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                <td>
                  <button type="button" className="small" onClick={() => history.push(`/user/${user._id}/edit`)}>Edit</button>
                  <button type="button" className="small" onClick={() => deleteHandler(user)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}